import { Scrollbars } from "react-custom-scrollbars";
import { useState } from "react";
import Icon from "./utils/Icon";
import MenuList from "./MenuList";
import DotMenu from "./MenuPopup";
import { Popover } from "@headlessui/react";
import VideoCallModal from "./call-items/VideoCallModal";
import VoiceCallModal from "./call-items/VoiceCallModal";
import ProfileUserListProvider from "./ProfileUserList";
import { useAppState } from "./utils/useAppState";
// import groupListData from "../components/groupList.json";

interface IMainContentProps {
    activeItem: any;
    setActiveItem: (item: any) => void;
    userId: number;
    close: () => void;
    open: boolean;
}

export const Userinfo = (props: IMainContentProps) => {
    const [{ groupList }, setAppState] = useAppState();
    const [infodotstatus, setInfodotstatus] = useState(false);
    const { HederMenuList } = MenuList();
    const ProfileUser = ProfileUserListProvider();
    const loggedInUserId = ProfileUser?.id;
    const [openVideoCallPopup, setopenVideoCallPopup] = useState(false);

    const [openVoiceCallPopup, setopenVoiceCallPopup] = useState(false);

    const handleGroupClick = (group: any) => {
        props.setActiveItem(group);
        setAppState({ activeTab: "group" });
        localStorage.setItem("activeTab", "group");
        props.close();
    };
    return (
        <div
            className={`self-stretch rounded-md md:rounded-tl-none md:rounded-tr-md md:rounded-br-md md:rounded-bl-none overflow-y-hidden bg-white dark:bg-bgc-dark transition-transform duration-300 ease-in-out ${
                props.open
                    ? "transform translate-x-full"
                    : "transform translate-x-0"
            } `}
        >
            <div className="flex flex-col gap-2 md:gap-5">
                <div className="relative">
                    <div className="w-full flex flex-row items-center justify-between absolute p-3">
                        <div className="p-2.5">
                            <Icon
                                icon="x"
                                onClick={props.close}
                                className="h-6 w-6 text-white cursor-pointer "
                            />
                        </div>
                        <div className="p-2.5">
                            <Popover className="relative">
                                <Popover.Button className="outline-none">
                                    <Icon
                                        onClick={() =>
                                            setInfodotstatus(!infodotstatus)
                                        }
                                        icon="dots-vertical"
                                        className="h-6 w-6 text-white cursor-pointer dark:text-icon"
                                    />
                                </Popover.Button>
                                <Popover.Panel className="absolute z-10 -ml-24 top-7 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                    {({ open }) => (
                                        <>
                                            <DotMenu menuList={HederMenuList} />
                                        </>
                                    )}
                                </Popover.Panel>
                            </Popover>
                        </div>
                    </div>
                    <div className="p-3">
                        <img
                            src={
                                import.meta.env
                                    .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                props.activeItem.coverImage
                            }
                            className="w-full h-[220px] rounded-tr-lg rounded-tl-lg"
                            alt=""
                        />
                    </div>
                    <div className="-mt-16 flex flex-col items-center justify-center">
                        <img
                            src={
                                import.meta.env
                                    .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                props.activeItem.profileImage
                            }
                            className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full top-6"
                            alt=""
                        />
                        <div className="flex flex-row items-center justify-center gap-1">
                            <span
                                className={`${
                                    props.activeItem.status === "online"
                                        ? "rounded-full w-2.5 h-2.5 bg-green"
                                        : ""
                                } ${
                                    props.activeItem.status === "away"
                                        ? "rounded-full w-2.5 h-2.5 bg-away"
                                        : ""
                                } ${
                                    props.activeItem.status === "offline"
                                        ? "rounded-full w-2.5 h-2.5 bg-offline"
                                        : ""
                                }`}
                            ></span>
                            <div className="py-[2.50px]">
                                {props.activeItem.name}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-3 md:gap-6 lg:gap-4 py-3 pt-0 md:p-3 md:pt-0 md:pb-5 border-b dark:border-border-dark">
                    <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <div className="w-11 h-11 flex flex-col items-center justify-center relative dark:bg-fgc-dark bg-fgc-dark/50 rounded-xl">
                            <Icon
                                icon="massage"
                                className="h-5 w-5 text-white dark:text-icon"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <h1 className="text-xs">Message</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <div className="w-11 h-11 flex flex-col items-center justify-center relative dark:bg-fgc-dark bg-fgc-dark/50 rounded-xl">
                            <Icon
                                icon="bookmark"
                                className="h-5 w-5 text-white dark:text-icon"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <h1 className="text-xs">saved</h1>
                        </div>
                    </div>

                    <div
                        onClick={() => setopenVoiceCallPopup(true)}
                        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                    >
                        <div className="w-11 h-11 flex flex-col items-center justify-center relative dark:bg-fgc-dark bg-fgc-dark/50 rounded-xl">
                            <Icon
                                icon="phone"
                                className="h-5 w-5 text-white dark:text-icon"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <h1 className="text-xs">Audio</h1>
                        </div>
                    </div>
                    <div
                        onClick={() => setopenVideoCallPopup(true)}
                        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                    >
                        <div className="w-11 h-11 flex flex-col items-center justify-center relative dark:bg-fgc-dark bg-fgc-dark/50 rounded-xl">
                            <Icon
                                icon="video-camera"
                                className="h-5 w-5 text-white dark:text-icon"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <h1 className="text-xs">Video</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <div className="w-11 h-11 flex flex-col items-center justify-center relative dark:bg-fgc-dark bg-fgc-dark/50 rounded-xl">
                            <Icon
                                icon="dots-horizontal"
                                className="h-5 w-5 text-white dark:text-icon"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <h1 className="text-xs">More</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-[calc(100vh-445px)] md:h-[calc(100vh-444px)] flex-row self-stretch w-full overflow-y-auto">
                <Scrollbars
                    className=""
                    autoHide
                    universal={true}
                    renderTrackVertical={(props) => (
                        <div {...props} className="track-vertical" />
                    )}
                    renderThumbVertical={(props) => (
                        <div {...props} className="thumb-vertical" />
                    )}
                >
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col py-1 px-3 md:p-3 gap-2 md:gap-5 pb-5 border-b border-border dark:border-border-dark">
                            <div className="flex flex-col gap-1 py-2 pb-0">
                                <p className="dark:text-text-dark text-black font-semibold dark:font-normal h-[17px]">
                                    STATUS:
                                </p>
                                <span className="dark:text-text-placeholder text-text-placeholder">
                                    {props.activeItem.lastMessage}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="h-[38px]">
                                    <p className="dark:text-text-placeholder">
                                        Name
                                    </p>
                                    <span className="dark:text-text-dark font-semibold dark:font-normal">
                                        {props.activeItem.name}
                                    </span>
                                </div>

                                <div className="h-[38px]">
                                    <p className="dark:text-text-placeholder">
                                        Email
                                    </p>
                                    <span className="dark:text-text-dark font-semibold dark:font-normal">
                                        {props.activeItem.email}
                                    </span>
                                </div>

                                <div className="h-[38px]">
                                    <p className="dark:text-text-placeholder">
                                        Location
                                    </p>
                                    <span className="dark:text-text-dark font-semibold dark:font-normal">
                                        California,USA
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 px-3 md:p-3 md:pt-0">
                            <div className="flex flex-col gap-1">
                                <p className="dark:text-text-placeholder">
                                    COMMON IN GROUP
                                </p>
                                <div className="flex flex-col gap-1">
                                    <div className="flex gap-2 pb-2 md:pb-0">
                                        <h6 className="text-disable">
                                            {groupList.map((group: any) => {
                                                // Check if the logged-in user is in the group
                                                const isLoggedInUserInGroup =
                                                    group.users.some(
                                                        (user: any) =>
                                                            user.userId ===
                                                            loggedInUserId
                                                    );

                                                // Check if the active item is in the group
                                                const isActiveItemInGroup =
                                                    group.users.some(
                                                        (user: any) =>
                                                            user.userId ===
                                                            props.activeItem._id
                                                    );
                                                if (
                                                    isLoggedInUserInGroup &&
                                                    isActiveItemInGroup
                                                ) {
                                                    return (
                                                        <div
                                                            key={
                                                                "GroupList_" +
                                                                group._id
                                                            }
                                                            className="flex gap-2 py-1 cursor-pointer"
                                                            onClick={() =>
                                                                handleGroupClick(
                                                                    group
                                                                )
                                                            }
                                                        >
                                                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-fgc-dark/50 dark:bg-fgc-dark">
                                                                <Icon
                                                                    icon="#"
                                                                    className="h-5 w-2.5 rounded-full text-white"
                                                                />
                                                            </div>
                                                            <div className="dark:text-icon text-black">
                                                                {group.name}
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                return null;
                                            })}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
            <VideoCallModal
                activeItem={props.activeItem}
                setActiveItem={props.setActiveItem}
                openCreate={openVideoCallPopup}
                setOpenCreate={setopenVideoCallPopup}
            />
            <VoiceCallModal
                activeItem={props.activeItem}
                setActiveItem={props.setActiveItem}
                openCreate={openVoiceCallPopup}
                setOpenCreate={setopenVoiceCallPopup}
            />
            {/** Right SideBar Profile End*/}
        </div>
    );
};
export default Userinfo;
