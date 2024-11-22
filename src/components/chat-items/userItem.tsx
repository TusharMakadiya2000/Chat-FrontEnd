import React, { useEffect, useState } from "react";
import { userItemType } from "../utils/types";
import axios from "axios";
import ProfileUserListProvider from "../ProfileUserList";
import { useAppState } from "../utils/useAppState";
export interface userItemProps {
    userItem: userItemType;
    activeItem?: userItemType;
    setActiveItem?: (item: userItemType) => void;
    userId: number;
}

const UserItem: React.FC<userItemProps> = ({
    userItem,
    activeItem,
    setActiveItem,
    userId,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ activeTab }, setAppState] = useAppState();
    const token = localStorage.getItem("token");
    const ProfileUser = ProfileUserListProvider();
    const loggedInUserId = ProfileUser?.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState<boolean>(true);
    const [lastMessage, setLastMessage] = useState<string | undefined>(
        undefined
    );
    const [lastTime, setLastTime] = useState<string | undefined>(undefined);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [unreadChat, setUnreadChat] = useState<any>();
    const [clickDisabled, setClickDisabled] = useState<boolean>(false);
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
                `http://192.168.1.47:5000/api/chats/unreadCount/${loggedInUserId}`,
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

    const handleUserClick = async (item: userItemType) => {
        if (clickDisabled || (activeItem && activeItem._id === item._id)) {
            return;
        }

        setClickDisabled(true);

        setActiveItem && setActiveItem(item);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/chats/updateDeliverType`,
                {
                    senderId: item._id,
                    receiverId: [loggedInUserId],
                    deliverType: "delivered",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Error updating deliverType:", error);
        }

        setTimeout(() => {
            setClickDisabled(false);
        }, 100);
    };

    return (
        <div
            className="w-full sm:w-full md:w-full lg:w-full flex flex-row items-start justify-start cursor-pointer"
            onClick={() => handleUserClick(userItem)}
        >
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
                    {userItem.status && (
                        <span
                            className={`absolute my-0 mx-[!important] top-[30px] left-[30px] rounded-81xl w-3 h-3 rounded-full ${
                                userItem.status === "online" && "bg-online"
                            } ${userItem.status === "away" && "bg-away"} ${
                                userItem.status === "offline" && "bg-offline"
                            }`}
                        ></span>
                    )}
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
                    <div className="self-stretch flex flex-row items-start justify-between gap-2.5 text-xs">
                        <div className="flex-1 w-44 relative text-text/70 dark:text-text-textSecondary truncate">
                            {lastMessage}
                        </div>
                        {userItem._id !== activeItem?._id &&
                        unreadChat?.[0]?.sender.userId === userItem._id &&
                        unreadCount > 0 ? (
                            <div className="rounded-full bg-textSecondary-dark text-white flex items-center justify-center w-4">
                                {unreadCount}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserItem;
