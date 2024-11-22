import { IChat, IFile, userItemType } from "../utils/types";
import Icon from "../utils/Icon";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import MenuPopup from "../MenuPopup";
import MenuList from "../MenuList";
import userListData from "../userList.json";

interface ImageSentProps {
    item: IChat;
    userId: any;
    activeItem: userItemType;
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
        openUp: bottomSpace < 250 && topSpace > bottomSpace,
        openLeft: rightSpace < 150 && leftSpace > rightSpace,
    };
};

const DocumentReceived: React.FC<ImageSentProps> = ({
    item,
    userId,
    activeItem,
}) => {
    const { ChatReceiveMenuList } = MenuList();
    const [Contactdotstatus, setContactdotstatus] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (Contactdotstatus && buttonRef.current) {
            const { openUp, openLeft } = checkAvailableSpace(buttonRef.current);
            setOpenUp(openUp);
            setOpenLeft(openLeft);
        }
    }, [Contactdotstatus]);

    const sender = userListData.find((user) => user.id === item.sender._id);
    const senderImage = sender ? sender.image : "";

    return (
        <div className="self-stretch flex flex-row items-end justify-start px-3 md:px-5 py-2.5 pb-0 gap-3 md:gap-5">
            <img
                src={senderImage}
                className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full"
                alt="avatar-male"
            />
            <div className="flex flex-col items-start justify-end gap-2">
                <div className="flex flex-row items-end justify-end gap-2">
                    <div className="rounded-t-xl rounded-br-xl rounded-bl-none bg-blue flex flex-col items-end justify-end p-3 box-border bg-white dark:bg-bgc-dark w-full md:max-w-[450px] gap-y-2">
                        {item?.files?.map((fileItem: IFile) => (
                            <div
                                key={"document-files_" + fileItem.id}
                                className="rounded bg-white dark:bg-bgc-dark border-border dark:border-border-dark flex flex-row items-center justify-center p-2 gap-3 border-[1px]"
                            >
                                <Icon
                                    icon="document"
                                    className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-icon"
                                />
                                <div className="w-[100px] sm:w-[158px] flex flex-col items-center justify-center gap-1">
                                    <div className="self-stretch relative text-textSecondary dark:text-text-dark">
                                        {fileItem.filename}
                                    </div>
                                    <div className="self-stretch relative text-xs text-textSecondary dark:text-text-textSecondary">
                                        {fileItem.size}
                                    </div>
                                </div>
                                <Icon
                                    icon="download"
                                    className="h-6 w-6 text-black dark:text-icon"
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        ref={buttonRef}
                                        className="inline-flex items-center outline-none gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        <Icon
                                            onClick={() =>
                                                setContactdotstatus(
                                                    !Contactdotstatus
                                                )
                                            }
                                            icon="dots-vertical"
                                            className="h-6 w-6 relative cursor-pointer dark:text-icon"
                                        />
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
                    <div className="relative">{item.createdAt}</div>
                </div>
            </div>
        </div>
    );
};

export default DocumentReceived;
