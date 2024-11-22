import Broadcast from "./chat-items/BroadCast";
import Personal from "./chat-items/Personal";
import Group from "./chat-items/Group";
import { useEffect, useState } from "react";
import Icon from "./utils/Icon";
import CreateGroupPopup from "./chat-items/CreateGroupPopup";
import ContectList from "./chat-items/ContectList";
import { useAppState } from "./utils/useAppState";
import CreateBroadcastPopup from "./chat-items/CreateBrodcastPopup";

const ChatSubSideMenu = (props: any) => {
    const [{ activeTab }, setAppState] = useAppState();
    const [openCreate, setOpenCreate] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    const handleTabChange = (newTab: string) => {
        setAppState({ activeTab: newTab });
        localStorage.setItem("activeTab", newTab);
        localStorage.removeItem("activeItemId");
        props.setActiveItem(null);
    };

    // const handleTabChange = (newTab: string) => {
    //     setAppState({ activeTab: newTab });
    //     switch (newTab) {
    //         case "personal":
    //             localStorage.setItem("activeTab", "personal");
    //             props.setActiveItem(userList[0]);
    //             break;
    //         case "group":
    //             localStorage.setItem("activeTab", "group");
    //             props.setActiveItem(groupList[0]);
    //             break;
    //         case "broadcast":
    //             localStorage.setItem("activeTab", "broadcast");
    //             props.setActiveItem(broadcastList[0]);
    //             break;
    //         default:
    //             break;
    //     }
    // };
    return (
        <>
            <div className="self-stretch rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md sm:rounded-tl-md sm:rounded-tr-md sm:rounded-br-md sm:rounded-bl-md md:rounded-tl-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-md lg:rounded-tl-md lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-md bg-white dark:bg-bgc-dark w-full md:max-w-[300px] xl:max-w-[350px] overflow-hidden shrink-0 flex flex-col items-center justify-start">
                <div className="box-border w-full flex flex-row items-center text-lg px-5 border-b-[1px] border-border dark:border-border-dark">
                    <div className="flex-1 dark:text-text-dark font-semibold text-lg py-2 md:py-[11.6px]">
                        Chat
                    </div>

                    {/** Plus Click Popup Modal */}
                    <Icon
                        onClick={() => setOpenCreate(true)}
                        icon="plus"
                        className="h-6 w-6 cursor-pointer dark:text-icon"
                    />
                    {/** Plus Click Popup Modal End*/}
                </div>
                {/** ChatSubSideMenu 3 Bttons(Personal,group,broadcast) start*/}
                <div className="self-stretch flex flex-row items-center justify-between text-center">
                    {["personal", "group", "broadcast"].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`flex-1 flex flex-row cursor-pointer items-center justify-between p-[9.2px] px-0 text-blue border-b-[2px] ${
                                activeTab === tab
                                    ? "border-primary bg-primary-tabbg dark:bg-bgc-bgSelect dark:text-textSecondary-dark"
                                    : "border-border dark:border-border-dark dark:text-text-dark hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect hover:text-textSecondary-dark hover:dark:text-textSecondary-dark"
                            }`}
                        >
                            <button className="flex-1 relative font-semibold">
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        </div>
                    ))}
                </div>
                {/** ChatSubSideMenu 3 Bttons(Personal,group,broadcast) End*/}

                {activeTab === "personal" && (
                    <Personal
                        activeItem={props.activeItem}
                        setActiveItem={props.setActiveItem}
                        userId={props.userId}
                    />
                )}
                {activeTab === "broadcast" && (
                    <Broadcast
                        activeItem={props.activeItem}
                        setActiveItem={props.setActiveItem}
                    />
                )}
                {activeTab === "group" && (
                    <Group
                        activeItem={props.activeItem}
                        setActiveItem={props.setActiveItem}
                        userId={props.userId}
                    />
                )}
            </div>

            {activeTab === "personal" && (
                <ContectList
                    activeItem={props.activeItem}
                    setActiveItem={props.setActiveItem}
                    userId={props.userId}
                    openCreate={openCreate}
                    setOpenCreate={setOpenCreate}
                />
            )}
            {activeTab === "group" && (
                <CreateGroupPopup
                    openCreate={openCreate}
                    setOpenCreate={setOpenCreate}
                />
            )}
            {activeTab === "broadcast" && (
                <CreateBroadcastPopup
                    openCreate={openCreate}
                    setOpenCreate={setOpenCreate}
                />
            )}
        </>
    );
};

export default ChatSubSideMenu;
