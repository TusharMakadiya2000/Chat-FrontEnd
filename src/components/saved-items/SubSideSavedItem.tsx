import { Fragment, useState } from "react";
import Icon from "../utils/Icon";
import MenuList from "../MenuList";
import MenuPopup from "../MenuPopup";
import { Popover, Transition } from "@headlessui/react";
type SavedItem = {
    id: number;
    name: string;
    size: string;
    icon: string;
    image: string;
};

const SubSideSavedItem: React.FC<{ item: SavedItem }> = ({ item }) => {
    const [Contactdotstatus, setContactdotstatus] = useState(false);
    const { SavedMenuList } = MenuList();

    return (
        <>
            <div className="w-full sm:w-full md:w-[350px] lg:w-[350px] flex flex-row items-start justify-start cursor-pointer">
                <div
                    className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-5 hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect border-b border-border dark:border-border-dark `}
                >
                    <div className="h-[42px] w-[42px] flex flex-col items-center justify-center relative">
                        <Icon
                            icon={item.image}
                            className="h-[28px] w-[28px] cursor-pointer dark:text-icon-primary"
                        />
                    </div>
                    <div className="flex-1 flex flex-row items-start justify-start">
                        <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="flex-1 relative">
                                <h1 className="dark:text-text-dark text-sm font-semibold">
                                    {item.name}
                                </h1>
                            </div>
                            <div className="self-stretch flex flex-row items-center justify-start gap-2.5 text-xs ">
                                <div className="flex-1 relative dark:text-text-textSecondary text-xs">
                                    {item.size}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Popover className="relative">
                            <Popover.Button className=" outline-none">
                                <Icon
                                    onClick={() =>
                                        setContactdotstatus(!Contactdotstatus)
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
                                                menuList={SavedMenuList}
                                            />
                                        </>
                                    )}
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubSideSavedItem;
