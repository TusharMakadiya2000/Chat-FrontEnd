import { userItemType } from "../utils/types";
import Icon from "../utils/Icon";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect, act } from "react";
import MenuList from "../MenuList";
import MenuPopup from "../MenuPopup";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppState } from "../utils/useAppState";
import io from "socket.io-client";
import ProfileUserListProvider from "../ProfileUserList";
const socket = io("http://192.168.1.10:5000");

interface TextSentProps {
    item: any;
    userId: any;
    activeItem: userItemType;
    onDelete: (id: string) => void;
    onReply: (
        message: string,
        createdAt: any,
        senderId: any,
        chatId: string
    ) => void;
    onUpdate: (itemId: string, message: string) => void;
}

const checkAvailableSpace = (element: HTMLElement | null): boolean => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const bottomSpace = window.innerHeight - rect.bottom;
    const topSpace = rect.top;
    return bottomSpace < 350 && topSpace > bottomSpace;
};

const TextSent: React.FC<TextSentProps> = ({
    item,
    userId,
    activeItem,
    onDelete,
    onReply,
    onUpdate,
}) => {
    const { ChatSendMenuList } = MenuList();
    const [Contactdotstatus, setContactdotstatus] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false);
    const [currentUserId, setcurrentUserId] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const token = localStorage.getItem("token");
    const ProfileUser = ProfileUserListProvider();
    const loggedInUserId = ProfileUser?.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ activeTab, userList }, setAppState] = useAppState();
    const user = userList.filter((id: any) => id._id === item.sender.userId);

    useEffect(() => {
        if (Contactdotstatus && buttonRef.current) {
            setOpenUpwards(checkAvailableSpace(buttonRef.current));
        }
        if (activeTab === "broadcast") {
            setcurrentUserId(item.originalIds);
        } else if (activeTab === "personal") {
            setcurrentUserId(item._id);
        } else if (activeTab === "group") {
            setcurrentUserId(item._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Contactdotstatus]);

    useEffect(() => {
        if (activeTab === "broadcast") {
            setcurrentUserId(item.originalIds);
        } else if (activeTab === "personal") {
            setcurrentUserId(item._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMenuItemClick = async (action: string) => {
        const theme = localStorage.getItem("theme") || "light";

        if (!currentUserId) {
            toast.error("Selected Chat Not in Database.");
            return;
        }
        if (action === "replay") {
            onReply(item.message, item.createdAt, item.sender.name, item._id);
        } else if (action === "copy") {
            try {
                await navigator.clipboard.writeText(item.message);
            } catch (err) {
                console.error("Failed to copy text", err);
            }
        } else if (action === "edit") {
            try {
                onUpdate(item._id, item.message);
            } catch (err) {
                console.error("Failed to Edit text", err);
            }
        }

        try {
            if (action === "delete") {
                if (Array.isArray(currentUserId)) {
                    for (const id of currentUserId) {
                        const response = await axios.delete(
                            `${import.meta.env.VITE_API_BASE_URL}/chats/${id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (response.status === 200) {
                            toast.success(`Chat deleted successfully!`, {
                                theme: theme === "dark" ? "dark" : "light",
                            });
                            onDelete(id);
                            socket.emit("messageDeleted", {
                                messageId: id,
                                senderId: loggedInUserId,
                                receiverId: item.receiver[0].userId,
                            });
                        }
                    }
                } else {
                    const response = await axios.delete(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/chats/${currentUserId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.status === 200) {
                        toast.success(`Chat deleted successfully!`, {
                            theme: theme === "dark" ? "dark" : "light",
                        });
                        onDelete(currentUserId);

                        socket.emit("messageDeleted", {
                            messageId: currentUserId,
                            senderId: loggedInUserId,
                            receiverId: item.receiver[0].userId,
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`Error:`, error);
            toast.error(`Error in deleting chat`, {
                theme: theme === "dark" ? "dark" : "light",
            });
        }
    };

    const isForwarded = item.isForwarded;
    const referencedMessageId = item.replyTo;

    const referencedMessage = referencedMessageId
        ? activeItem.chat.find((chat: any) => chat._id === referencedMessageId)
        : null;

    return (
        <>
            <div
                className="self-stretch flex flex-row items-end justify-end py-2.5 pb-0 px-3 md:px-5 gap-3 md:gap-5"
                key={item.id}
            >
                <div className="flex flex-col items-end justify-end gap-2">
                    <div className="flex flex-row items-end justify-end gap-2">
                        <div>
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            ref={buttonRef}
                                            className="inline-flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                                        >
                                            <div>
                                                <Icon
                                                    onClick={() =>
                                                        setContactdotstatus(
                                                            !Contactdotstatus
                                                        )
                                                    }
                                                    icon="dots-vertical"
                                                    className="h-6 w-6 relative cursor-pointer dark:text-icon"
                                                />
                                            </div>
                                        </Popover.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel
                                                className={`absolute z-10 w-40 bg-white dark:bg-bgc-dark rounded-md ${
                                                    openUpwards
                                                        ? "bottom-full mb-2"
                                                        : "top-full mt-2"
                                                }`}
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <MenuPopup
                                                            menuList={
                                                                ChatSendMenuList
                                                            }
                                                            onMenuItemClick={
                                                                handleMenuItemClick
                                                            }
                                                            chatItem={item}
                                                        />
                                                    </>
                                                )}
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </div>
                        <div className="rounded-t-xl rounded-br-none rounded-bl-xl bg-blue flex flex-col items-start px-2 py-2 justify-center box-border bg-primary-tabbg dark:bg-bgText max-w-[450px] break-all">
                            {referencedMessage && (
                                <div className="w-full rounded border-s-[3px] border-green flex flex-col gap-2.5 p-2 mb-2 bg-[#b5b2b252]">
                                    <Icon icon="reply" className="w-5 h-5" />
                                    <div className="font-semibold">
                                        {referencedMessage.message}
                                    </div>
                                    <div>
                                        {referencedMessage.sender.name},{" "}
                                        {new Date(
                                            referencedMessage.createdAt
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                            )}
                            {isForwarded && (
                                <div className="flex items-center gap-0.5 italic text-xs font-medium text-gray-500 mb-1">
                                    <Icon
                                        icon="forward-arrow-1"
                                        className="w-4 h-3"
                                    />
                                    Forwarded
                                </div>
                            )}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.message.replace(
                                        /\n/g,
                                        "<br />"
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px] text-xs">
                        <Icon
                            className="relative w-3 h-3 overflow-hidden shrink-0 text-green dark:text-green"
                            icon="double-check"
                        />
                        <div className="relative">
                            {new Date(item.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end">
                    <img
                        src={
                            import.meta.env
                                .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                            user[0].profileImage
                        }
                        className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full"
                        alt="avatar-female"
                    />
                </div>
            </div>
        </>
    );
};

export default TextSent;
