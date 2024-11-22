import { Scrollbars } from "react-custom-scrollbars";
import { Fragment, useEffect, useRef, useState } from "react";
import UserItem from "./userItem";
import { userItemType } from "../utils/types";
import Icon from "../utils/Icon";
import { Popover } from "@headlessui/react";
import MenuList from "../MenuList";
import { useAppState } from "../utils/useAppState";

export interface userItemProps {
    activeItem?: userItemType;
    setActiveItem?: (item: userItemType) => void;
    userId: number;
}
const Personal: React.FC<userItemProps> = ({
    activeItem,
    setActiveItem,
    userId,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList }, setAppState] = useAppState();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTab, setActiveTab] = useState<string>("personal");
    const [search, setSearch] = useState("");
    const [Contactdotstatus, setContactdotstatus] = useState(false);
    const { UserStatusMenuList } = MenuList();
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [archivedChecked, setArchivedChecked] = useState(() => {
        const savedArchivedChecked = localStorage.getItem("archivedChecked");
        return savedArchivedChecked ? JSON.parse(savedArchivedChecked) : false;
    });

    /* ------------------ Start: Set archived not change on load ------------------ */

    useEffect(() => {
        localStorage.setItem(
            "archivedChecked",
            JSON.stringify(archivedChecked)
        );
    }, [archivedChecked]);

    /* ------------------ End: Set archived not change on load ------------------ */

    /* ------------------ Start: Set Online, away, offline User List ------------------ */

    useEffect(() => {
        const savedStatus = localStorage.getItem("selectedStatus");
        if (savedStatus) {
            setSelectedStatus(savedStatus);
        }
    }, []);

    useEffect(() => {
        if (selectedStatus) {
            localStorage.setItem("selectedStatus", selectedStatus);
        }
    }, [selectedStatus]);

    /* ------------------ End: Set Online, away, offline User List ------------------ */

    /* ------------------ Start: User Chat contant fix page on Load  ------------------ */

    useEffect(() => {
        if (activeItem?._id && activeTab === "personal") {
            localStorage.setItem("activeItemId", activeItem._id.toString());
        }
    }, [activeTab, activeItem?._id]);

    useEffect(() => {
        const chatActiveTab = localStorage.getItem("activeTab");
        const activeUserId = localStorage.getItem("activeItemId");

        setAppState({ activeTab: chatActiveTab });

        if (activeUserId && setActiveItem && chatActiveTab === "personal") {
            const activeItemData = userList.find(
                (user: any) => user._id === activeUserId
            );
            if (activeItemData) {
                setActiveItem(activeItemData);
            }
        }
    }, [setActiveItem, setAppState, userList]);

    /* ------------------ End: User Chat contant fix page on Load  ------------------ */

    /* ------------------ Start: Set ActivItem Based on activItem   ------------------ */
    useEffect(() => {
        if (activeItem?._id) {
            const items = userList.filter(
                (item: any) => item._id === activeItem._id
            );
            if (items) {
                setActiveItem && setActiveItem({ ...items[0] });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList]);

    /* ------------------ End: Set ActivItem Based on activItem   ------------------ */

    /* ------------------ Start: Search User   ------------------ */

    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };

    /* ------------------ End: Search User   ------------------ */

    /* ------------------ Start: Filter User Data and set archived functionality ------------------ */

    const checkboxRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        if (checkboxRef.current) {
            checkboxRef.current.click();
        }
        setArchivedChecked(!archivedChecked);
    };

    const filteredUsers = userList.filter((item: any) => {
        if (selectedStatus === "online") {
            return item.status === "online";
        } else if (selectedStatus === "away") {
            return item.status === "away";
        } else if (selectedStatus === "offline") {
            return item.status === "offline";
        } else if (selectedStatus === "all") {
            return (
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                search === ""
            );
        } else {
            return (
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                search === ""
            );
        }
    });
    const finalFilteredUsers = archivedChecked
        ? filteredUsers.filter((user: any) => user.archive)
        : filteredUsers.filter((user: any) => !user.archive);
    /* ------------------ End: Filter User Data and set archived functionality ------------------ */
    return (
        <>
            <div className="self-stretch flex flex-row items-start justify-between py-2 md:py-3 px-5">
                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between h-9 px-2 py-2.5 border-[1px] dark:border-border-dark">
                    <input
                        id="search-input"
                        className="flex-1 relative overflow-auto outline-none dark:bg-bgc-dark dark:text-text-dark"
                        placeholder=" Search here..."
                        onChange={handleSearchChange}
                    />

                    <Icon
                        icon="search"
                        className="h-5 w-5 cursor-pointer dark:text-icon-primary"
                    />
                </div>
            </div>

            {/* first 5 online usercode */}
            <div className="self-stretch flex flex-col items-start justify-start py-2 md:py-3 pt-0 px-5 text-center gap-1">
                <p className="flex text-text/70 dark:text-text-textSecondary text-xs h-[15px]">
                    ONLINE USERS
                </p>
                <div className="self-stretch overflow-hidden flex flex-row items-center justify-around xl:gap-4">
                    {userList
                        .filter((item: any) => item.status === "online")
                        .slice(0, 5)
                        .map((item: any, key: number) => (
                            <div
                                onClick={() =>
                                    setActiveItem && setActiveItem(item)
                                }
                                className="flex flex-col items-center justify-center p-[2.5px] gap-1 cursor-pointer"
                                key={"online-users_" + item._id}
                            >
                                <div className="flex flex-col items-center justify-center relative">
                                    <img
                                        src={
                                            import.meta.env
                                                .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                            item.profileImage
                                        }
                                        className="w-[42px] h-[42px] rounded-full"
                                        alt="avatar-male"
                                    />
                                    <span className="absolute my-0 mx-[!important] top-7 left-[30px] rounded-full w-3 h-3 bg-green"></span>
                                </div>

                                <div
                                    className="self-stretch flex flex-col ml-0 items-center justify-center"
                                    key={item.id}
                                >
                                    <button
                                        onClick={() =>
                                            setActiveTab("Maincontent")
                                        }
                                    >
                                        <h1 className=" dark:text-text-dark truncate text-nowrap w-11">
                                            {item.name.split(" ")[0]}
                                        </h1>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {/* first 5 online usercode end*/}
            <div className="flex items-center w-full h-8 py-2 px-5 justify-between border-t-[1px] border-border dark:border-border-dark">
                <div className="flex items-center gap-1 text-text/70 dark:text-text-textSecondary text-xs">
                    {selectedStatus === "online" && "ONLINE"}
                    {selectedStatus === "away" && "AWAY"}
                    {selectedStatus === "offline" && "OFFLINE"}
                    {selectedStatus === "all" && "ALL USER"}
                    {!selectedStatus && "ALL USER"}
                    <Popover className="relative">
                        {({ open }) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            useEffect(() => {
                                if (Contactdotstatus !== open) {
                                    setContactdotstatus(open);
                                }
                            }, [open]);

                            return (
                                <>
                                    <Popover.Button
                                        className="outline-none"
                                        onClick={() =>
                                            setContactdotstatus(
                                                !Contactdotstatus
                                            )
                                        }
                                    >
                                        <Icon
                                            icon="chevron-down"
                                            className={`h-5 w-5 rounded-full text-black cursor-pointer dark:text-icon transition-transform duration-300 ease-in-out ${
                                                Contactdotstatus
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </Popover.Button>
                                    <Popover.Panel className="absolute z-10 top-6 w-[100px] bg-white dark:bg-fgc-dark rounded-md">
                                        {({ close }) => (
                                            <>
                                                {UserStatusMenuList.map(
                                                    (item, index) => (
                                                        <div
                                                            key={
                                                                "user-Status-MenuList_" +
                                                                index
                                                            }
                                                            className="relative cursor-pointer hover:dark:bg-bgc-bgSelect hover:bg-black/5"
                                                            onClick={() => {
                                                                setSelectedStatus(
                                                                    item.name
                                                                );
                                                                close();
                                                            }}
                                                        >
                                                            <div className="flex items-center px-3 gap-2 py-1.5">
                                                                <span
                                                                    className={`w-2 h-2 rounded-full  
                                                                        ${
                                                                            item.name ===
                                                                                "online" &&
                                                                            "dark:bg-green bg-green"
                                                                        } 
                                                                        ${
                                                                            item.name ===
                                                                                "away" &&
                                                                            "dark:bg-away bg-away"
                                                                        } 
                                                                        ${
                                                                            item.name ===
                                                                                "offline" &&
                                                                            "dark:bg-offline bg-offline"
                                                                        }`}
                                                                ></span>
                                                                <div>
                                                                    <h1 className="">
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </Popover.Panel>
                                </>
                            );
                        }}
                    </Popover>
                </div>
                <div
                    className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={handleDivClick}
                >
                    <input
                        id="select-input"
                        ref={checkboxRef}
                        type="checkbox"
                        checked={archivedChecked}
                        onChange={handleDivClick}
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                    />
                    <span className="absolute text-primary transition-opacity opacity-0 pointer-events-none -ml-[50px] peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                    <span className="text-text/70 dark:text-text-textSecondary text-xs">
                        Archived
                    </span>
                </div>
            </div>
            <div className="relative h-screen flex-row self-stretch w-full overflow-y-auto">
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
                    {/*User Item -Chat*/}
                    {finalFilteredUsers.map(
                        (item: userItemType, index: number) => (
                            <UserItem
                                key={"Filter-users-List_" + item._id}
                                userItem={item}
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                                userId={userId}
                            />
                        )
                    )}

                    {/*User Item -Chat*/}
                </Scrollbars>
            </div>
        </>
    );
};

export default Personal;
