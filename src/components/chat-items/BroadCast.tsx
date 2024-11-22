import { Scrollbars } from "react-custom-scrollbars";
import { useEffect, useRef, useState } from "react";
import BroadcastItem from "./BroadcastItem";
import Icon from "../utils/Icon";
import { useAppState } from "../utils/useAppState";
import { jwtDecode, JwtPayload } from "jwt-decode";
// import broadCastListData from "../../components/broadCastList.json";
export interface userItemType2 {
    name: string;
}

interface UserIdJwtPayload extends JwtPayload {
    userId: string;
    email: string;
    name: string;
}

const Broadcast = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ activeTab, broadcastList }, setAppState] = useAppState();
    const [search, setSearch] = useState("");
    const checkboxRef = useRef<HTMLInputElement>(null);
    const [archivedChecked, setArchivedChecked] = useState(() => {
        const savedArchivedChecked = localStorage.getItem("archivedChecked");
        return savedArchivedChecked ? JSON.parse(savedArchivedChecked) : false;
    });
    const token = localStorage.getItem("token");

    let userInfo: any;
    if (token) {
        userInfo = jwtDecode<UserIdJwtPayload>(token);
    }

    /* ------------------ Start: Set archived not change on load ------------------ */

    useEffect(() => {
        localStorage.setItem(
            "archivedChecked",
            JSON.stringify(archivedChecked)
        );
    }, [archivedChecked]);

    /* ------------------ End: Set archived not change on load ------------------ */

    /* ------------------ Start: User BroadcastList contant fix page on Load  ------------------ */

    useEffect(() => {
        if (props.activeItem?._id) {
            if (activeTab === "broadcast") {
                localStorage.setItem(
                    "activeItemId",
                    props.activeItem._id.toString()
                );
            }
        }
    }, [activeTab, props.activeItem?._id]);

    useEffect(() => {
        const chatActiveTab = localStorage.getItem("activeTab");

        setAppState({ activeTab: chatActiveTab });

        const activeBroadcastId = localStorage.getItem("activeItemId");

        if (activeBroadcastId && props.setActiveItem) {
            const activeItemData =
                chatActiveTab === "broadcast" &&
                broadcastList.find(
                    (user: any) => user._id === activeBroadcastId
                );
            if (activeItemData) {
                props.setActiveItem(activeItemData);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.setActiveItem, setAppState, broadcastList]);

    /* ------------------ End: User BroadcastList contant fix page on Load  ------------------ */

    /* ------------------ Start: Set ActivItem Based on activItem   ------------------ */

    useEffect(() => {
        if (props.activeItem?._id) {
            const items = broadcastList.filter(
                (item: any) => item._id === props.activeItem._id
            );
            if (items) {
                props.setActiveItem && props.setActiveItem({ ...items[0] });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [broadcastList]);

    /* ------------------ End: Set ActivItem Based on activItem   ------------------ */

    /* ------------------ Start: Search BroadcastList   ------------------ */

    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };
    /* ------------------ End: Search BroadcastList   ------------------ */

    /* ------------------ Start: Filter BroadcastList Data and set archived functionality ------------------ */

    const handleArchivedClick = () => {
        if (checkboxRef.current) {
            checkboxRef.current.click();
        }
        setArchivedChecked(!archivedChecked);
    };

    // Filter the broadcasts by the current user's ID (createdBy field)
    const userCreatedBroadcasts = broadcastList.filter(
        (item: any) => item.createdBy === userInfo.userId
    );

    const filteredBroadcast = userCreatedBroadcasts.filter((item: any) => {
        return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            search === ""
        );
    });
    const finalFilteredBroadcast = archivedChecked
        ? filteredBroadcast.filter((broadcast: any) => broadcast.archive)
        : filteredBroadcast.filter((broadcast: any) => !broadcast.archive);

    /* ------------------ End: Filter BroadcastList Data and set archived functionality ------------------ */

    return (
        <>
            <div className="self-stretch flex flex-row items-start justify-between py-2 md:py-3 px-5">
                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between h-9 px-2 py-2.5 border-[1px] dark:border-border-dark">
                    <input
                        id="brodcast-search-input"
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
                    ALL BROADCAST
                </p>
                <div
                    className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={handleArchivedClick}
                >
                    <input
                        id="brodcast-select-input"
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
                    {/*User Item -Chat*/}
                    {finalFilteredBroadcast.length === 0 ? (
                        <div className="md:max-w-[350px] w-full flex justify-center text-center py-5 px-3 text-text text-sm dark:text-text-dark">
                            {archivedChecked
                                ? "Looks like there are no archived Broadcasts right now."
                                : "Looks like there are no Broadcasts right now."}
                        </div>
                    ) : (
                        finalFilteredBroadcast.map(
                            (item: any, index: number) => (
                                <BroadcastItem
                                    key={"finalFilteredBroadcast_" + item._id}
                                    userItem={item}
                                    activeItem={props.activeItem}
                                    setActiveItem={props.setActiveItem}
                                />
                            )
                        )
                    )}
                    {/*User Item -Chat*/}
                </Scrollbars>
            </div>
        </>
    );
};

export default Broadcast;
