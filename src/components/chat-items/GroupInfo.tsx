import { Scrollbars } from "react-custom-scrollbars";
import { Fragment, useState } from "react";
import Icon from "../utils/Icon";
import MenuList from "../MenuList";
import DotMenu from "../MenuPopup";
import { Popover, Transition } from "@headlessui/react";
import ContectList from "./ContectList";
import { useAppState } from "../utils/useAppState";
import axios from "axios";
import { toast } from "react-toastify";

interface IMainContentProps {
    activeItem: any;
    setActiveItem: (item: any) => void;
    userId: number;
    close: () => void;
    open: boolean;
}

export const GroupInfo = (props: IMainContentProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ activeTab, userList, groupList }, setAppState] = useAppState();
    const [infodotstatus, setInfodotstatus] = useState(false);
    const { HederMenuList, GroupUserList } = MenuList();
    const numberOfMember = props.activeItem?.users?.length || 0;
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const theme = localStorage.getItem("theme") || "light";
    const token = localStorage.getItem("token");

    const groupUserIds = props.activeItem?.users?.map(
        (user: any) => user.userId
    );
    // const groupUser = props.activeItem?.users?.filter(
    //     (user: any) => user.userId
    // );
    const groupUsers = userList.filter((user: any) =>
        groupUserIds.includes(user._id)
    );
    const handleGroupClick = (item: any) => {
        const userData = userList.find((user: any) => user._id === item._id);
        props.setActiveItem(userData);
        setAppState({ activeTab: "personal" });
        localStorage.setItem("activeTab", "personal");
        props.close();
    };
    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    const handleRemoveFromGroup = async (userId: any) => {
        try {
            const groupId = props.activeItem?._id;
            await axios.delete(
                `http://localhost:5000/api/groups/${groupId}/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("user remove form group", {
                theme: theme === "dark" ? "dark" : "light",
            });
            const groupData = await axios.get(
                "http://localhost:5000/api/groups",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAppState({ groupList: groupData.data });
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    const handleUpdateUserRole = async (userId: any, newRole: string) => {
        try {
            const groupId = props.activeItem?._id;
            const updatedUsers = props.activeItem.users.map((user: any) => {
                if (user.userId === userId) {
                    return { ...user, role: newRole };
                }
                return user;
            });

            await axios.put(
                `http://localhost:5000/api/groups/${groupId}/users`,
                {
                    users: updatedUsers,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(`User role updated to ${newRole}`, {
                theme: theme === "dark" ? "dark" : "light",
            });

            const groupData = await axios.get(
                "http://localhost:5000/api/groups",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAppState({ groupList: groupData.data });
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const getGroupUserList = (userId: any) => {
        const user = props.activeItem?.users.find(
            (user: any) => user.userId === userId
        );
        const role = user ? user.role : undefined;
        if (role === "admin") {
            return GroupUserList.filter((item) => item.name !== "makeAdmin");
        } else if (role === "user") {
            return GroupUserList.filter((item) => item.name !== "dismissAdmin");
        }
        return GroupUserList.filter((item) => item.name === "remove");
    };

    return (
        <div
            className={`self-stretch rounded-md md:rounded-tl-none md:rounded-tr-md md:rounded-br-md md:rounded-bl-none overflow-y-hidden bg-white dark:bg-bgc-dark transition-transform duration-300 ease-in-out ${
                props.open
                    ? "transform translate-x-full"
                    : "transform translate-x-0"
            } `}
        >
            <div className="flex flex-col gap-5">
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
                            src={props.activeItem.coverImage}
                            className="w-full h-[220px] rounded-tr-lg rounded-tl-lg"
                            alt="userImage"
                        />
                    </div>
                    <div className="-mt-16 flex flex-col items-center justify-center py-2 md:py-5 pt-0">
                        <img
                            src={props.activeItem.groupImage}
                            className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full top-6"
                            alt="userImage"
                        />
                        <div className="flex flex-row items-center justify-center gap-1">
                            <div className="py-[2.50px]">
                                {props.activeItem.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex items-center w-full h-8 py-2 pb-0 md:py-2 px-5 justify-between border-t-[1px] border-border dark:border-border-dark">
                    <p className="flex items-center gap-1 text-text dark:text-text-dark font-semibold">
                        {numberOfMember}&nbsp;Members
                    </p>
                    <div
                        onClick={() => setOpenCreate(true)}
                        className="flex justify-center items-center gap-1 cursor-pointer"
                    >
                        <Icon
                            icon="plus"
                            className="h-4 w-4 rounded-full dark:text-icon text-text cursor-pointer "
                            onClick={toggleSearch}
                        />
                        <span>Add Member</span>
                    </div>
                </div>
            </div>
            <div className="relative h-[calc(100vh-401px)] md:h-[calc(100vh-411px)] flex-row self-stretch w-full overflow-y-auto py-1 md:py-1 pb-0">
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
                    {groupUsers.map((item: any, key: any) => (
                        <div
                            key={"activeItem-Group-List_" + item._id}
                            className="flex items-center justify-between cursor-pointer hover:dark:bg-bgc-bgSelect hover:bg-primary-tabbg border-b border-border dark:border-border-dark"
                        >
                            <div
                                className={`box-border w-full flex flex-row items-center justify-start py-1 px-4 gap-3 md:gap-5`}
                            >
                                <div
                                    className="flex flex-col items-center justify-center relative"
                                    onClick={() => handleGroupClick(item)}
                                >
                                    <img
                                        src={
                                            import.meta.env
                                                .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                            item.profileImage
                                        }
                                        className="w-[42px] h-[42px] rounded-full"
                                        alt="userImage"
                                    />

                                    {item.status && (
                                        <span
                                            className={`absolute my-0 mx-[!important] top-[30px] left-[30px] rounded-81xl w-3 h-3 rounded-full ${
                                                item.status === "online" &&
                                                "bg-online"
                                            } ${
                                                item.status === "away" &&
                                                "bg-away"
                                            } ${
                                                item.status === "offline" &&
                                                "bg-offline"
                                            }`}
                                        ></span>
                                    )}
                                </div>
                                <div
                                    className="flex-1 flex flex-col items-start justify-start"
                                    onClick={() => handleGroupClick(item)}
                                >
                                    <div className="self-stretch flex flex-row items-start justify-start gap-2.5">
                                        <div className="flex-1 relative">
                                            <h1 className="flex gap-2 dark:text-text-dark text-sm text-nowrap font-semibold">
                                                {item.name}
                                                {props.activeItem?.users.find(
                                                    (user: any) =>
                                                        user.userId ===
                                                            item._id &&
                                                        user.role === "admin"
                                                ) && (
                                                    <div className="flex items-center text-[10px] md:text-xs bg-green px-1 rounded">
                                                        Admin
                                                    </div>
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="self-stretch flex flex-row items-start justify-start gap-2.5 text-xs">
                                        <div className="flex-1 relative text-text/70 dark:text-text-textSecondary">
                                            {item.lastMessage}
                                        </div>
                                    </div>
                                </div>
                                <Popover>
                                    <>
                                        <Popover.Button className="outline-none">
                                            <div>
                                                <Icon
                                                    icon="dots-vertical"
                                                    className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover dark:text-icon"
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
                                            <Popover.Panel className="absolute z-10 -translate-x-36 md:-translate-x-36">
                                                {({ open }) => (
                                                    <div
                                                        className="flex flex-col justify-center w-[150px] rounded-md divide-y dark:divide-border-dark bg-white dark:bg-fgc-dark dark:shadow-white/10 shadow-lg dark:drop-shadow-sm focus:outline-none overflow-hidden"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby="menu-button"
                                                    >
                                                        {getGroupUserList(
                                                            item._id
                                                        ).map(
                                                            (
                                                                listItem,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        "sub-side-profileMenu_" +
                                                                        index
                                                                    }
                                                                    className="py-2 px-3 hover:dark:bg-bgc-bgSelect hover:bg-primary-tabbg"
                                                                    onClick={() => {
                                                                        if (
                                                                            listItem.name ===
                                                                            "remove"
                                                                        ) {
                                                                            handleRemoveFromGroup(
                                                                                item._id
                                                                            );
                                                                        } else if (
                                                                            listItem.name ===
                                                                            "makeAdmin"
                                                                        ) {
                                                                            handleUpdateUserRole(
                                                                                item._id,
                                                                                "admin"
                                                                            );
                                                                        } else if (
                                                                            listItem.name ===
                                                                            "dismissAdmin"
                                                                        ) {
                                                                            handleUpdateUserRole(
                                                                                item._id,
                                                                                "user"
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <h1>
                                                                        {
                                                                            listItem.title
                                                                        }
                                                                    </h1>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                </Popover>
                            </div>
                        </div>
                    ))}
                </Scrollbars>
            </div>
            <ContectList
                activeItem={props.activeItem}
                setActiveItem={props.setActiveItem}
                userId={props.userId}
                openCreate={openCreate}
                setOpenCreate={setOpenCreate}
            />
            {/** Right SideBar Profile End*/}
        </div>
    );
};
export default GroupInfo;
