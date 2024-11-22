import React, { Fragment, useState } from "react";
import { userItemType } from "../utils/types";
import Icon from "../utils/Icon";
import MenuList from "../MenuList";
import MenuPopup from "../MenuPopup";
import { Popover, Transition } from "@headlessui/react";

export interface userItemProps {
    userItem: userItemType;
    activeItem?: userItemType;
    setActiveItem?: (item: userItemType) => void;
    userId: number;
    activeTab: string;
}

const ContactItem: React.FC<userItemProps> = ({
    userItem,
    activeItem,
    setActiveItem,
    userId,
    activeTab,
}) => {
    const [Contactdotstatus, setContactdotstatus] = useState(false);
    const { ContactMenuList } = MenuList();

    return (
        <>
            <div
                className="w-full sm:w-full md:w-[350px] lg:w-[350px] flex flex-row items-start justify-start cursor-pointer"
                onClick={() => setActiveItem && setActiveItem(userItem)}
            >
                {activeTab === "all" && (
                    <div
                        className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-5 hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect border-b border-border dark:border-border-dark ${
                            activeItem?._id === userItem._id &&
                            "bg-primary-tabbg dark:bg-bgc-bgSelect"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center relative">
                            <img
                                src={
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                    userItem.profileImage
                                }
                                className="w-[42px] h-[42px] rounded-full"
                                alt=""
                            />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-row items-center justify-start gap-2.5">
                                <div className="flex-1 relative">
                                    <h1 className="dark:text-text-dark text-sm font-semibold">
                                        {userItem.name}
                                    </h1>
                                </div>
                                <div>
                                    <Popover className="relative">
                                        <Popover.Button className=" outline-none">
                                            <Icon
                                                onClick={() =>
                                                    setContactdotstatus(
                                                        !Contactdotstatus
                                                    )
                                                }
                                                icon="dots-vertical"
                                                className="h-6 w-6 cursor-pointer dark:text-icon"
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
                                            <Popover.Panel className="absolute z-10 -ml-24 top-7 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                                {({ open }) => (
                                                    <>
                                                        <MenuPopup
                                                            menuList={
                                                                ContactMenuList
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* userItem.favorite === true && */}
                {activeTab === "favorites" && (
                    <div
                        className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-5 hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect border-b border-border dark:border-border-dark ${
                            activeItem?._id === userItem._id &&
                            "bg-primary-tabbg dark:bg-bgc-bgSelect"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center relative">
                            <img
                                src={
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                    userItem.profileImage
                                }
                                className="w-[42px] h-[42px] rounded-full"
                                alt="userImage"
                            />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-row items-center justify-start gap-2.5">
                                <div className="flex-1 relative">
                                    <h1 className="dark:text-text-dark text-sm font-semibold">
                                        {userItem.name}
                                    </h1>
                                </div>
                                <div>
                                    <Popover className="relative">
                                        <Popover.Button className=" outline-none">
                                            <Icon
                                                onClick={() =>
                                                    setContactdotstatus(
                                                        !Contactdotstatus
                                                    )
                                                }
                                                icon="dots-vertical"
                                                className="h-6 w-6 cursor-pointer dark:text-icon"
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
                                            <Popover.Panel className="absolute z-10 -ml-24 top-7 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                                {({ open }) => (
                                                    <>
                                                        <MenuPopup
                                                            menuList={
                                                                ContactMenuList
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* userItem.blocked === true && */}
                {activeTab === "blocked" && (
                    <div
                        className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-5 hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect border-b border-border dark:border-border-dark ${
                            activeItem?._id === userItem._id &&
                            "bg-primary-tabbg dark:bg-bgc-bgSelect"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center relative">
                            <img
                                src={
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                    userItem.profileImage
                                }
                                className="w-[42px] h-[42px] rounded-full"
                                alt="userImage"
                            />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-row items-center justify-start gap-2.5">
                                <div className="flex-1 relative">
                                    <h1 className="dark:text-text-dark text-sm font-semibold">
                                        {userItem.name}
                                    </h1>
                                </div>
                                <div>
                                    <Popover className="relative">
                                        <Popover.Button className=" outline-none">
                                            <Icon
                                                onClick={() =>
                                                    setContactdotstatus(
                                                        !Contactdotstatus
                                                    )
                                                }
                                                icon="dots-vertical"
                                                className="h-6 w-6 cursor-pointer dark:text-icon"
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
                                            <Popover.Panel className="absolute z-10 -ml-24 top-7 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                                {({ open }) => (
                                                    <>
                                                        <MenuPopup
                                                            menuList={
                                                                ContactMenuList
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ContactItem;
