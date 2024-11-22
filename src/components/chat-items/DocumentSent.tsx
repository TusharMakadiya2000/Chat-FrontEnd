import { IChat, IFile, userItemType } from "../utils/types";
import Icon from "../utils/Icon";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import MenuPopup from "../MenuPopup";
import MenuList from "../MenuList";

interface ImageSentProps {
    item: IChat;
    userId: any;
    activeItem: userItemType;
}

const checkAvailableSpace = (element: HTMLElement | null): boolean => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const bottomSpace = window.innerHeight - rect.bottom;
    const topSpace = rect.top;
    return bottomSpace < 300 && topSpace > bottomSpace;
};

const DocumentSent: React.FC<ImageSentProps> = ({
    item,
    userId,
    activeItem,
}) => {
    const { ChatReceiveMenuList } = MenuList();
    const [Contactdotstatus, setContactdotstatus] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (Contactdotstatus && buttonRef.current) {
            setOpenUpwards(checkAvailableSpace(buttonRef.current));
        }
    }, [Contactdotstatus]);

    return (
        <div
            className="self-stretch flex flex-row items-end justify-end px-3 md:px-5 py-2.5 pb-0 gap-3 md:gap-5"
            key={"user_" + userId}
        >
            <div className="flex flex-col items-end justify-end gap-2">
                <div className="flex flex-row items-end justify-end gap-2">
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
                                                openUpwards
                                                    ? "bottom-full mb-2"
                                                    : "top-full mt-2"
                                            }`}
                                        >
                                            {({ open }) => (
                                                <>
                                                    {/* {Contactdotstatus && ( */}
                                                    <MenuPopup
                                                        menuList={
                                                            ChatReceiveMenuList
                                                        }
                                                    />
                                                    {/* )} */}
                                                </>
                                            )}
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                    <div className="rounded-t-xl rounded-br-none rounded-bl-xl bg-blue flex flex-col items-end justify-end p-3 gap-2 box-border bg-primary max-w-full md:max-w-[450px]">
                        {item?.files?.map((fileItem: IFile) => (
                            <div
                                key={
                                    "document-send-id_" +
                                    fileItem.id +
                                    "document-send-name_" +
                                    fileItem.filename
                                }
                                className="rounded bg-blue flex flex-row items-center justify-center p-2 gap-3 border-[1px] border-primary-disabled"
                            >
                                <Icon
                                    icon="document"
                                    className="h-5 w-5 sm:h-6 sm:w-6 text-primaryActive"
                                />
                                <div className="w-[100px] sm:w-[158px] flex flex-col items-center justify-center gap-1">
                                    <div className="self-stretch relative text-primaryActive">
                                        {fileItem.filename}
                                    </div>
                                    <div className="self-stretch relative text-xs text-primary-disabled">
                                        {fileItem.size}
                                    </div>
                                </div>
                                <Icon
                                    icon="download"
                                    className="h-6 w-6 text-primaryActive"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-[5px] text-xs">
                    <Icon
                        className="relative w-3 h-3 overflow-hidden shrink-0"
                        icon="check"
                    />
                    <div className="relative">{item.createdAt}</div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end">
                <img
                    src="./images/oliver-ragfelt.png"
                    className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full"
                    alt="avatar-female"
                />
            </div>
        </div>
    );
};

export default DocumentSent;
