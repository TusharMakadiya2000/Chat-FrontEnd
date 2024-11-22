import { userItemType } from "../utils/types";
import Icon from "../utils/Icon";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import MenuList from "../MenuList";
import MenuPopup from "../MenuPopup";
import { useAppState } from "../utils/useAppState";

interface TextReceivedProps {
    item: any;
    userId: any;
    activeItem: userItemType;
    onReply: (
        message: string,
        createdAt: any,
        senderId: any,
        chatId: string
    ) => void;
    markAsUnread: (itemId: string) => void;
}

const checkAvailableSpace = (
    element: HTMLElement | null
): { openUp: boolean; openLeft: boolean } => {
    if (!element) return { openUp: false, openLeft: false };
    const rect = element.getBoundingClientRect();
    const bottomSpace = window.innerHeight - rect.bottom;
    const topSpace = rect.top;
    const rightSpace = window.innerWidth - rect.right;
    const leftSpace = rect.left;
    return {
        openUp: bottomSpace < 300 && topSpace > bottomSpace,
        openLeft: rightSpace < 150 && leftSpace > rightSpace,
    };
};

const TextReceived: React.FC<TextReceivedProps> = ({
    item,
    userId,
    activeItem,
    onReply,
    markAsUnread,
}) => {
    const { ChatReceiveMenuList } = MenuList();
    const [Chatdotstatus, setChatdotstatus] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList }, setAppState] = useAppState();
    useEffect(() => {
        if (Chatdotstatus && buttonRef.current) {
            const { openUp, openLeft } = checkAvailableSpace(buttonRef.current);
            setOpenUp(openUp);
            setOpenLeft(openLeft);
        }
    }, [Chatdotstatus]);
    const sender = userList.find(
        (user: any) => user._id === item.sender.userId
    );
    const senderImage = sender ? sender.profileImage : "";
    const isForwarded = item.isForwarded;

    const handleMenuItemClick = async (action: string) => {
        if (action === "replay") {
            // Set the message for reply
            onReply(item.message, item.createdAt, item.sender.name, item._id); // Call onReply with message text
        } else if (action === "copy") {
            try {
                await navigator.clipboard.writeText(item.message);
            } catch (err) {
                console.error("Failed to copy text", err);
            }
        } else if (action === "markAsUnread") {
            try {
                markAsUnread(item._id);
            } catch (err) {
                console.error("Failed to Edit deliverType.", err);
            }
        }
    };

    const referencedMessageId = item.replyTo;
    const referencedMessage = referencedMessageId
        ? activeItem.chat.find((chat: any) => chat._id === referencedMessageId)
        : null;

    return (
        <>
            <div className="self-stretch flex flex-row items-end justify-start px-3 md:px-5 py-2.5 pb-0 gap-3 md:gap-5">
                <img
                    src={
                        import.meta.env
                            .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                        senderImage
                    }
                    className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full"
                    alt="avatar-male"
                />

                <div className="flex flex-col items-start justify-end gap-2">
                    <div className="flex flex-row items-end justify-start gap-2">
                        <div className="rounded-t-xl rounded-br-xl rounded-bl-none flex flex-col items-end justify-end px-2 py-2 bg-white dark:bg-bgHeader-dark max-w-[450px] break-all">
                            <div className="relative inline-block max-w-[430px]">
                                {referencedMessage && (
                                    <div className="w-full rounded border-s-[3px] border-green flex flex-col gap-2.5 p-2 mb-2 bg-[#b5b2b252]">
                                        <Icon
                                            icon="reply"
                                            className="w-5 h-5"
                                        />
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
                        <div>
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            ref={buttonRef}
                                            className="inline-flex items-center outline-none gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                                        >
                                            <div>
                                                <Icon
                                                    onClick={() =>
                                                        setChatdotstatus(
                                                            !Chatdotstatus
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
                                                    openUp
                                                        ? "bottom-full mb-2"
                                                        : "top-full mt-2"
                                                } ${
                                                    openLeft
                                                        ? "right-0 mr-2"
                                                        : "left-0 ml-2"
                                                }`}
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <MenuPopup
                                                            menuList={
                                                                ChatReceiveMenuList
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
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px] text-xs">
                        <div className="relative">{item.sender.name}</div>
                        <div className="relative">
                            {new Date(item.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextReceived;
