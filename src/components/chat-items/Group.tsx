import { Scrollbars } from "react-custom-scrollbars";
import { useEffect, useRef, useState } from "react";
import GroupItem from "./groupItem";
import Icon from "../utils/Icon";
import { useAppState } from "../utils/useAppState";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface UserIdJwtPayload extends JwtPayload {
    userId: string;
    email: string;
    name: string;
}

export interface userItemType2 {
    name: string;
}

const Group = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ activeTab, groupList }, setAppState] = useAppState();
    const [search, setSearch] = useState("");
    const checkboxRef = useRef<HTMLInputElement>(null);
    const [archivedChecked, setArchivedChecked] = useState(() => {
        const savedArchivedChecked = localStorage.getItem("archivedChecked");
        return savedArchivedChecked ? JSON.parse(savedArchivedChecked) : false;
    });
    const token = localStorage.getItem("token");

    /* ------------------ Start: Set archived not change on load ------------------ */

    useEffect(() => {
        localStorage.setItem(
            "archivedChecked",
            JSON.stringify(archivedChecked)
        );
    }, [archivedChecked]);

    /* ------------------ End: Set archived not change on load ------------------ */

    /* ------------------ Start: Group Chat contant fix page on Load  ------------------ */

    useEffect(() => {
        if (props.activeItem?._id && activeTab === "group") {
            localStorage.setItem(
                "activeItemId",
                props.activeItem._id.toString()
            );
        }
    }, [activeTab, props.activeItem?._id]);

    useEffect(() => {
        const chatActiveTab = localStorage.getItem("activeTab");
        const activeGroupId = localStorage.getItem("activeItemId");
        setAppState({ activeTab: chatActiveTab });

        if (activeGroupId && props.setActiveItem && chatActiveTab === "group") {
            const activeItemData = groupList.find(
                (group: any) => group._id === activeGroupId
            );
            if (activeItemData) {
                props.setActiveItem(activeItemData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.setActiveItem, setAppState, groupList]);

    /* ------------------ End: Group Chat contant fix page on Load  ------------------ */

    /* ------------------ Start: Set ActivItem Based on activItem   ------------------ */

    useEffect(() => {
        if (props.activeItem?._id) {
            const items = groupList.filter(
                (item: any) => item._id === props.activeItem._id
            );
            if (items) {
                props.setActiveItem && props.setActiveItem({ ...items[0] });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupList]);

    /* ------------------ End: Set ActivItem Based on activItem   ------------------ */

    /* ------------------ Start: Search User   ------------------ */

    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };

    /* ------------------ End: Search User   ------------------ */

    /* ------------------ Start: Filter Group Data and set archived functionality ------------------ */

    let userInfo: any;
    if (token) {
        userInfo = jwtDecode<UserIdJwtPayload>(token);
    }

    const handleArchivedClick = () => {
        if (checkboxRef.current) {
            checkboxRef.current.click();
        }
        setArchivedChecked(!archivedChecked);
    };
    const filteredGroup = groupList.filter((item: any) => {
        const isUserInGroup = item.users.some(
            (user: any) => user.userId === userInfo.userId
        );
        return (
            isUserInGroup &&
            (item.name.toLowerCase().includes(search.toLowerCase()) ||
                search === "")
        );
    });
    const finalFilteredGroup = archivedChecked
        ? filteredGroup.filter((group: any) => group.archive)
        : filteredGroup.filter((group: any) => !group.archive);

    /* ------------------ End: Filter Group Data and set archived functionality ------------------ */

    return (
        <>
            <div className="self-stretch flex flex-row items-start justify-between py-2 md:py-3 px-5">
                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between h-9 px-2 py-2.5 border-[1px] dark:border-border-dark">
                    <input
                        id="group-search-input"
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
            <div className="flex items-center w-full h-8 py-2 px-5 justify-between border-t-[1px] border-border dark:border-border-dark">
                <p className="flex items-center gap-1 text-text/70 dark:text-text-textSecondary text-xs">
                    ALL GROUPS
                </p>
                <div
                    className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={handleArchivedClick}
                >
                    <input
                        id="group-select-input"
                        ref={checkboxRef}
                        type="checkbox"
                        checked={archivedChecked}
                        onChange={handleArchivedClick}
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
                    {/* <CustomScroll heightRelativeToParent="100%"> */}

                    {/*User Item -Chat*/}
                    {finalFilteredGroup.length === 0 ? (
                        <div className="md:max-w-[350px] w-full flex justify-center text-center py-5 px-3 text-text text-sm dark:text-text-dark">
                            {archivedChecked
                                ? "Looks like there are no archived Groups right now."
                                : "Looks like there are no Groups right now."}
                        </div>
                    ) : (
                        finalFilteredGroup.map((item: any, index: number) => (
                            <GroupItem
                                key={"Filtered-Group_" + item._id}
                                userItem={item}
                                activeItem={props.activeItem}
                                setActiveItem={props.setActiveItem}
                                userId={props.userId}
                            />
                        ))
                    )}

                    {/*User Item -Chat*/}
                </Scrollbars>
                {/* </CustomScroll> */}
            </div>
        </>
    );
};

export default Group;
