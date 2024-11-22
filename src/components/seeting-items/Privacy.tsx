import { useState } from "react";
import Icon from "../utils/Icon";
import MenuList from "../MenuList";
import MenuPopup from "../MenuPopup";
import { Popover, Switch } from "@headlessui/react";

const Privacy = () => {
    const { SettingProfilePhotoMenuList } = MenuList();

    const [laseSeenEnabled, setLaseSeenEnabled] = useState(true);
    const [enabled, setEnabled] = useState(true);
    const [profilePhotostatus, setProfilePhotostatus] = useState(false);
    const [profileStatus, setProfileStatus] = useState(false);
    const [profileGroupStatus, setProfileGroupStatus] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between px-5 pl-0 border-b dark:border-border-dark">
                <div className="flex flex-col gap-2 px-5">
                    <span>Profile Photo</span>
                </div>
                <div className="py-[9.2px]">
                    <Popover className="relative">
                        {({ open }) => {
                            // Sync profilePhotostatus state with popover open state
                            if (profilePhotostatus !== open) {
                                setProfilePhotostatus(open);
                            }

                            return (
                                <>
                                    <Popover.Button className="outline-none">
                                        <div
                                            onClick={() =>
                                                setProfilePhotostatus(
                                                    !profilePhotostatus
                                                )
                                            }
                                            className="flex items-center cursor-pointer rounded py-1 px-2 gap-2 border dark:border-border-dark shadow-lg shadow-white/5 drop-shadow-lg"
                                        >
                                            <span className="text-text-placeholder dark:text-text-textSecondary">
                                                Selected
                                            </span>
                                            <Icon
                                                icon="chevron-down"
                                                className={`h-5 w-5 rounded-full text-text cursor-pointer dark:text-icon transition-transform duration-300 ease-in-out ${
                                                    profilePhotostatus
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    </Popover.Button>
                                    <Popover.Panel className="absolute z-10 -ml-3 top-8 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                        <MenuPopup
                                            menuList={
                                                SettingProfilePhotoMenuList
                                            }
                                        />
                                    </Popover.Panel>
                                </>
                            );
                        }}
                    </Popover>
                </div>
            </div>
            <div className="flex items-center justify-between px-5 pl-0 border-b dark:border-border-dark">
                <div className="flex flex-col gap-2 px-5">
                    <span>Last seen</span>
                </div>
                <div className="py-3">
                    <Switch
                        checked={laseSeenEnabled}
                        onChange={setLaseSeenEnabled}
                        className={`${
                            laseSeenEnabled
                                ? "bg-gray-200 dark:bg-white/10"
                                : "bg-black/20 dark:bg-textSecondary-dark"
                        } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                        <span
                            aria-hidden="true"
                            className={`${
                                !laseSeenEnabled
                                    ? "translate-x-6"
                                    : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-fgc-dark rounded-full`}
                        />
                    </Switch>
                </div>
            </div>
            <div className="flex items-center justify-between px-5 pl-0 border-b dark:border-border-dark">
                <div className="flex flex-col gap-2 px-5">
                    <span>Status</span>
                </div>
                <div className="py-[9.2px]">
                    <Popover className="relative">
                        {({ open }) => {
                            if (profileStatus !== open) {
                                setProfileStatus(open);
                            }

                            return (
                                <>
                                    <Popover.Button className="outline-none">
                                        <div
                                            onClick={() =>
                                                setProfileStatus(!profileStatus)
                                            }
                                            className="flex items-center cursor-pointer rounded py-1 px-2 gap-2 border dark:border-border-dark shadow-lg shadow-white/5 drop-shadow-lg"
                                        >
                                            <span className="text-text-placeholder dark:text-text-textSecondary">
                                                Everyone
                                            </span>
                                            <Icon
                                                icon="chevron-down"
                                                className={`h-5 w-5 rounded-full text-text cursor-pointer dark:text-icon transition-transform duration-300 ease-in-out ${
                                                    profileStatus
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    </Popover.Button>
                                    <Popover.Panel className="absolute z-10 -ml-2 top-8 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                        <MenuPopup
                                            menuList={
                                                SettingProfilePhotoMenuList
                                            }
                                        />
                                    </Popover.Panel>
                                </>
                            );
                        }}
                    </Popover>
                </div>
            </div>
            <div className="flex items-center justify-between px-5 pl-0 border-b dark:border-border-dark">
                <div className="flex flex-col gap-2 px-5">
                    <span>Read receipts</span>
                </div>
                <div className="py-3">
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${
                            enabled
                                ? "bg-gray-200 dark:bg-white/10"
                                : "bg-black/20 dark:bg-textSecondary-dark"
                        } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                        <span
                            aria-hidden="true"
                            className={`${
                                !enabled ? "translate-x-6" : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-fgc-dark rounded-full`}
                        />
                    </Switch>
                </div>
            </div>
            <div className="flex items-center justify-between px-5 pl-0 ">
                <div className="flex flex-col gap-2 px-5">
                    <span>Groups</span>
                </div>
                <div className="py-[9.2px]">
                    <Popover className="relative">
                        {({ open }) => {
                            if (profileGroupStatus !== open) {
                                setProfileGroupStatus(open);
                            }

                            return (
                                <>
                                    <Popover.Button className="outline-none">
                                        <div
                                            onClick={() =>
                                                setProfileGroupStatus(
                                                    !profileGroupStatus
                                                )
                                            }
                                            className="flex items-center cursor-pointer rounded py-1 px-2 gap-2 border dark:border-border-dark shadow-lg shadow-white/5 drop-shadow-lg"
                                        >
                                            <span className="text-text-placeholder dark:text-text-textSecondary">
                                                Everyone
                                            </span>
                                            <Icon
                                                icon="chevron-down"
                                                className={`h-5 w-5 rounded-full text-text cursor-pointer dark:text-icon transition-transform duration-300 ease-in-out ${
                                                    profileGroupStatus
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    </Popover.Button>
                                    <Popover.Panel className="absolute z-10 -ml-2 top-8 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                        <MenuPopup
                                            menuList={
                                                SettingProfilePhotoMenuList
                                            }
                                        />
                                    </Popover.Panel>
                                </>
                            );
                        }}
                    </Popover>
                </div>
            </div>
        </>
    );
};
export default Privacy;
