import { IChat, IImage, userItemType } from "../utils/types";
import Icon from "../utils/Icon";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import MenuList from "../MenuList";
import MenuPopup from "../MenuPopup";
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
        openUp: bottomSpace < 270 && topSpace > bottomSpace,
        openLeft: rightSpace < 150 && leftSpace > rightSpace,
    };
};

const ImageReceived: React.FC<ImageSentProps> = ({
    item,
    userId,
    activeItem,
}) => {
    const [Chatdotstatus, setChatdotstatus] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const { ChatReceiveMenuList } = MenuList();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (Chatdotstatus && buttonRef.current) {
            const { openUp, openLeft } = checkAvailableSpace(buttonRef.current);
            setOpenUp(openUp);
            setOpenLeft(openLeft);
        }
    }, [Chatdotstatus]);

    const sender = userListData.find((user) => user.id === item.sender._id);
    const senderImage = sender ? sender.image : "";

    return (
        <>
            <div className="self-stretch flex flex-row items-end justify-start px-3 md:px-5 py-2.5 pb-0 gap-3 md:gap-5">
                <img
                    src={senderImage}
                    className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full"
                    alt="avater-male"
                />
                <div className="flex flex-col items-start justify-end gap-2">
                    <div className="flex flex-row items-end justify-end gap-2.5">
                        <div className="flex flex-row flex-wrap items-end justify-start gap-3 max-w-[465px]">
                            <div className="flex gap-3 relative box-border shrink-0 flex-wrap imagesent">
                                {item.images?.map((imageItem: IImage) => (
                                    <div
                                        key={"document-files_" + imageItem.id}
                                        className="flex justify-between w-[96px] h-[96px]"
                                    >
                                        <img
                                            src={imageItem.filename}
                                            alt=""
                                            className="rounded-md w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Popover className="relative">
                                <Popover.Button
                                    ref={buttonRef}
                                    className="inline-flex items-center outline-none gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                                >
                                    <div>
                                        <Icon
                                            onClick={() =>
                                                setChatdotstatus(!Chatdotstatus)
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
                                                />
                                            </>
                                        )}
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px] text-xs">
                        <div className="relative">{item.sender.name}</div>
                        <div className="relative">{item.createdAt}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageReceived;
