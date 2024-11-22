import React, { useEffect, useState } from "react";
import { GroupType } from "../utils/types";
import axios from "axios";
import { useAppState } from "../utils/useAppState";
import ProfileUserListProvider from "../ProfileUserList";

export interface userItemProps1 {
    userItem: GroupType;
    activeItem?: GroupType;
    userId: number;
    setActiveItem?: (item: GroupType) => void;
}

const GroupItem: React.FC<userItemProps1> = ({
    userItem,
    activeItem,
    setActiveItem,
    userId,
}) => {
    const [{ activeTab }, setAppState] = useAppState();
    const token = localStorage.getItem("token");
    const ProfileUser = ProfileUserListProvider();
    const loggedInUserId = ProfileUser?.id;
    const [clickDisabled, setClickDisabled] = useState<boolean>(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [unreadChat, setUnreadChat] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [lastMessage, setLastMessage] = useState<string | undefined>(
        undefined
    );
    const [lastTime, setLastTime] = useState<string | undefined>(undefined);

    const fetchChatData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/chats/messages/${loggedInUserId}/${userItem._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        skip: 0,
                        limit: 1,
                        tab: activeTab,
                        type: activeTab,
                    },
                }
            );
            const newMessages = response.data;
            if (newMessages.length > 0) {
                setLastMessage(newMessages[0].message);
                const lastCreatedOn = new Date(newMessages[0].createdAt);
                const formattedTime = lastCreatedOn.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                setLastTime(formattedTime);
            }
            const unreadMessages = await axios.get(
                `http://192.168.1.47:5000/api/chats/unreadCount/${userItem._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUnreadChat(unreadMessages.data.messages);
            setUnreadCount(unreadMessages.data.count);
        } catch (error) {
            console.error("Error fetching chat data:", error);
        }
    };
    useEffect(() => {
        if (loggedInUserId) {
            fetchChatData();
            const intervalId = setInterval(fetchChatData, 3000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [loggedInUserId, userItem._id, activeTab, token]);

    const handleGroupClick = async (item: GroupType) => {
        if (clickDisabled || (activeItem && activeItem._id === item._id)) {
            return;
        }

        setClickDisabled(true);

        setActiveItem && setActiveItem(item);

        try {
            // if (item._id.toString() === loggedInUserId) {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/chats/updateDeliverType`,
                {
                    senderId: loggedInUserId,
                    receiverId: [userItem._id],
                    deliverType: "delivered",
                    type: activeTab,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUnreadCount(0);
            // }
        } catch (error) {
            console.error("Error updating deliverType:", error);
        }

        setTimeout(() => {
            setClickDisabled(false);
        }, 100);
    };
    return (
        <>
            <div
                className="w-full sm:w-full md:w-[350px] lg:w-[350px] flex flex-row items-start justify-start cursor-pointer"
                // onClick={() => setActiveItem && setActiveItem(userItem)}
                onClick={() => handleGroupClick(userItem)}
            >
                <div
                    className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-5 border-b-[1px] hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect border-border dark:border-border-dark ${
                        activeItem?._id === userItem._id &&
                        "bg-primary-tabbg dark:bg-bgc-bgSelect"
                    }`}
                >
                    <div className="flex flex-col items-center justify-center relative ">
                        <img
                            src={userItem.groupImage}
                            className="w-[42px] h-[42px] rounded-full"
                            alt="user-profile"
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-row items-start justify-start gap-2.5">
                            <div className="flex-1 relative">
                                <h1 className="dark:text-text-dark text-sm font-semibold">
                                    {userItem.name}
                                </h1>
                            </div>
                            <div className="relative text-xs text-text/70 dark:text-text-placeholder">
                                {lastTime}
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-2.5 text-xs ">
                            <div className="flex-1 relative dark:text-text-textSecondary text-xs">
                                {lastMessage}
                            </div>
                            {userItem._id !== activeItem?._id &&
                            unreadChat?.[0]?.sender.userId !== loggedInUserId &&
                            unreadCount > 0 ? (
                                <div className="rounded-full bg-textSecondary-dark text-white flex items-center justify-center w-4">
                                    {unreadCount}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupItem;
