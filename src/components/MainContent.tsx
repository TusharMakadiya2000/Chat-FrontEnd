import { Scrollbars } from "react-custom-scrollbars";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Icon from "./utils/Icon";
import TextSent from "./chat-items/TextSent";
import TextReceived from "./chat-items/TextReceived";
import ImageReceived from "./chat-items/ImageReceived";
import DocumentSent from "./chat-items/DocumentSent";
import ImageSent from "./chat-items/ImageSent";
import DocumentReceived from "./chat-items/DocumentReceived";
import AttachmentMenu from "./AttachmentMenu";
import DotMenu from "./MenuPopup";
import Userinfo from "./Userinfo";
import EmojiPicker from "emoji-picker-react";
import MenuList from "./MenuList";
import { Popover } from "@headlessui/react";
import GroupInfo from "./chat-items/GroupInfo";
import BroadCastInfo from "./chat-items/BroadCastInfo";
import { useAppState } from "./utils/useAppState";
import VideoCallModal from "./call-items/VideoCallModal";
import VoiceCallModal from "./call-items/VoiceCallModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileUserListProvider from "./ProfileUserList";
import { JwtPayload, jwtDecode } from "jwt-decode";
import io from "socket.io-client";

const socket = io("https://chat-bachend.onrender.com");

// Inherite userId in JwtPayload interface
interface UserIdJwtPayload extends JwtPayload {
    userId: string;
    email: string;
    name: string;
}
interface IMainContentProps {
    activeItem: any;
    setActiveItem: (item: any) => void;
    userId: number;
    isContactMenuOpen?: boolean;
    setView?: any;
}

interface ReplyMessage {
    message: string;
    createdAt: any;
    name: any;
    chatId: string;
}

const MainContent = (props: IMainContentProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ activeTab, userList, groupList, broadcastList }, setAppState] =
        useAppState();
    const chatScroll: any = useRef(null);
    const { HederMenuList } = MenuList();
    const [muted, setMuted] = useState(false);
    const ProfileUser = ProfileUserListProvider();
    const loggedInUserId = ProfileUser?.id;
    const navigate = useNavigate();
    const [theme, setThemeState] = useState(localStorage.getItem("theme"));
    const [showHeaderMenu, setShowHeaderMenu] = useState(false);
    const [Searchstatus, setSearchstatus] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [replyMessage, setReplyMessage] = useState<ReplyMessage | null>(null);
    const handleReplyMessage = (
        message: string,
        createdAt: any,
        name: any,
        chatId: string
    ) => {
        setReplyMessage({ message, createdAt, name, chatId });
    };

    /* ------------------ Start: Dark and Light Theme ------------------ */
    useEffect(() => {
        const handleThemeChange = () => {
            const newTheme = localStorage.getItem("theme") || "light";
            setThemeState(newTheme);
        };

        window.addEventListener("themeChange", handleThemeChange);

        return () => {
            window.removeEventListener("themeChange", handleThemeChange);
        };
    }, []);

    /* ------------------ End: Dark and Light Theme ------------------ */

    /* ------------------ Start: Microphone Mute ------------------ */

    const handleClick = () => {
        setMuted(!muted);
    };

    /* ------------------ End: Microphone Mute ------------------ */

    /* ------------------ Start: User Chat contant fix page on Load  ------------------ */
    const [isMobile, setIsMobile] = useState(window.outerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.outerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    useEffect(() => {
        if (isMobile) {
            if (props.activeItem?._id && activeTab === "personal") {
                localStorage.setItem(
                    "activeItemId",
                    props.activeItem._id.toString()
                );
            } else if (props.activeItem?._id && activeTab === "group") {
                localStorage.setItem(
                    "activeItemId",
                    props.activeItem._id.toString()
                );
            } else if (props.activeItem?._id && activeTab === "broadcast") {
                localStorage.setItem(
                    "activeItemId",
                    props.activeItem._id.toString()
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, props.activeItem?._id]);

    useEffect(() => {
        if (isMobile) {
            const chatActiveTab = localStorage.getItem("activeTab");
            const activeUserId = localStorage.getItem("activeItemId");

            setAppState({ activeTab: chatActiveTab });

            if (
                activeUserId &&
                props.setActiveItem &&
                chatActiveTab === "personal"
            ) {
                const activeItemData = userList.find(
                    (user: any) => user.id === parseInt(activeUserId)
                );
                if (activeItemData) {
                    props.setActiveItem(activeItemData);
                }
            } else if (
                activeUserId &&
                props.setActiveItem &&
                chatActiveTab === "group"
            ) {
                const activeItemData = groupList.find(
                    (user: any) => user.id === parseInt(activeUserId)
                );
                if (activeItemData) {
                    props.setActiveItem(activeItemData);
                }
            } else if (
                activeUserId &&
                props.setActiveItem &&
                chatActiveTab === "broadcast"
            ) {
                const activeItemData = broadcastList.find(
                    (user: any) => user.id === parseInt(activeUserId)
                );
                if (activeItemData) {
                    props.setActiveItem(activeItemData);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.setActiveItem, setAppState]);

    /* ------------------ End: User Chat contant fix page on Load  ------------------ */

    /* ------------------ Start: Get user Chat  ------------------ */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [moreChat, setMoreChat] = useState(true);
    const pageSize = 50;

    const activeItemIdRef = useRef(props.activeItem?._id);
    const token = localStorage.getItem("token");

    const fetchChatData = async (
        page = 0,
        activeItemId: any,
        activeTab: string,
        refId?: string
    ) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error("No token found.");
            }
            const response = await axios.get(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/chats/messages/${loggedInUserId}/${activeItemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        skip: page * pageSize,
                        limit: pageSize,
                        tab: activeTab,
                        refId: refId,
                        type: activeTab,
                    },
                }
            );
            const newMessages = response.data.reverse();
            const filteredMessages = filterMessages(newMessages, searchQuery);
            if (filteredMessages.length < pageSize) {
                setMoreChat(false);
            }

            const currentScrollHeight = chatScroll.current?.getScrollHeight();
            props.setActiveItem((user: any) => {
                if (user?._id !== activeItemId) return user;
                const updatedChat =
                    page === 0
                        ? filteredMessages
                        : [...filteredMessages, ...(user?.chat || [])];
                return {
                    ...user,
                    chat: updatedChat,
                };
            });
            setTimeout(() => {
                if (chatScroll.current) {
                    chatScroll.current.scrollTop(
                        chatScroll.current?.getScrollHeight() -
                            currentScrollHeight
                    );
                }
            }, 0);
        } catch (error) {
            console.error("Error fetching chat data:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterMessages = (messages: any[], query: string) => {
        if (!query) return messages; // If no search query, return all messages
        return messages.filter((message) => {
            const messageText = message?.message?.toLowerCase(); // Adjust based on how messages store the text
            return messageText.includes(query.toLowerCase());
        });
    };

    const handleScroll = useCallback(() => {
        const scrollTop = chatScroll.current.getScrollTop();
        if (scrollTop === 0 && !loading && moreChat) {
            setPage((prevPage) => {
                const newPage = prevPage + 1;
                fetchChatData(newPage, activeItemIdRef.current, activeTab);
                return newPage;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, moreChat]);
    useEffect(() => {
        if (props.activeItem?._id) {
            activeItemIdRef.current = props.activeItem._id;
            setPage(0);
            setMoreChat(true);
            fetchChatData(0, props.activeItem._id, activeTab);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeItem?._id, searchQuery]);

    /* ------------------ End: Get user Chat  ------------------ */

    /* ------------------ Start: Chat Scroll auto down in bottom  ------------------ */

    useEffect(() => {
        if (chatScroll.current) {
            chatScroll.current.scrollToBottom();
        }
    }, [props.activeItem]);

    /* ------------------ End: Chat Scroll auto down in bottom  ------------------ */

    const [modal] = useState(false);

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    const [status, setstatus] = useState(false);
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    const [explicitlyClosed, setExplicitlyClosed] = useState(false);
    const [inputStr, setInputStr] = useState<string>("");

    /* ------------------ Start: Chat input KeyDown  ------------------ */

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    /* ------------------ End: Chat input KeyDown  ------------------ */

    /* ------------------ Start: Add new Chat  ------------------ */
    const getReceiver = () => {
        if (activeTab === "broadcast") {
            return props.activeItem.users.map((user: any) => ({
                userId: user.userId,
                name: user.name,
            }));
        } else {
            return [
                {
                    userId: props.activeItem._id,
                    name: props.activeItem.name,
                },
            ];
        }
    };

    const [editingMessageId, setEditingMessageId] = useState<string | null>(
        null
    );

    const handleUpdateMessage = (messageId: string, messageText: string) => {
        setEditingMessageId(messageId);
        setInputStr(messageText);
    };

    const handleUpdatedeliverType = async (messageId: string) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/chats/deliverTypeUpdate`,
                {
                    messageId: messageId,
                    deliverType: "unread",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error("Error updating deliverType:", error);
        }
    };

    const sendMessage = async () => {
        let userInfo;
        if (token) {
            userInfo = jwtDecode<UserIdJwtPayload>(token);
        }
        if (inputStr.trim()) {
            const newMessage = {
                sender: {
                    userId: userInfo?.userId,
                    name: userInfo?.name,
                },
                receiver: getReceiver(),
                messageType: "text",
                deliverType: "sent",
                message: inputStr,
                imagename: "Wallpaper",
                type: activeTab,
                isForwarded: false,
                refId: props.activeItem._id,
                docname1: "user.png",
                docname2: "group.png",
                docname3: "natural.png",
                files: [],
                createdAt: new Date().toISOString(),
                replyTo: replyMessage?.chatId || null,
            };

            try {
                if (editingMessageId) {
                    // Update existing message
                    await axios.put(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/chats/update/${editingMessageId}`,
                        { message: inputStr },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setInputStr("");
                    setEditingMessageId(null);
                } else {
                    // Send new message
                    socket.emit("sendMessage", newMessage);
                    setReplyMessage(null);
                    setInputStr("");

                    await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/chats/send`,
                        { newMessage },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }

                fetchChatData(0, props.activeItem._id, activeTab);
                setTimeout(() => {
                    chatScroll.current?.scrollToBottom(0, 0);
                }, 100);
            } catch (error) {
                console.error("Error sending/updating message:", error);
            }
        }
    };
    /* ------------------ End: Add new Chat  ------------------ */

    let userInfo: any;
    if (token) {
        userInfo = jwtDecode<UserIdJwtPayload>(token);
    }

    useEffect(() => {
        const handleReceiveMessage = (message: any) => {
            if (!message || !userInfo) return;

            let messageTimestamp;
            if (message.createdAt) {
                messageTimestamp = new Date(message.createdAt);
            } else {
                messageTimestamp = new Date();
            }
            if (isNaN(messageTimestamp.getTime())) {
                console.error("Invalid date received:", message.createdAt);
                return;
            }

            const activeChatId = props.activeItem?._id;

            const isBroadcastMessage = message.type === "broadcast";
            const isGroupMessage = message.type === "group";
            const isPersonalMessage = !isGroupMessage && !isBroadcastMessage;
            const isForActiveChat =
                (isBroadcastMessage &&
                    message.receiver.some(
                        (receiver: any) => receiver.userId === userInfo.userId
                    )) ||
                (isGroupMessage &&
                    activeChatId === message.receiver[0].userId) ||
                (isPersonalMessage &&
                    ((activeChatId === message.sender.userId &&
                        userInfo.userId === message.receiver[0].userId) ||
                        (activeChatId === message.receiver[0].userId &&
                            userInfo.userId === message.sender.userId)));
            if (isForActiveChat) {
                props.setActiveItem((currentChat: any) => {
                    if (!currentChat || !message) return currentChat;
                    return {
                        ...currentChat,
                        chat: [...(currentChat.chat || []), message],
                    };
                });

                setTimeout(() => {
                    chatScroll.current?.scrollToBottom(0, 0);
                }, 100);
            }
            const receivetId =
                activeTab === "group"
                    ? message.receiver[0].userId
                    : loggedInUserId;
            setTimeout(async () => {
                if (
                    (activeTab === "personal" &&
                        props.activeItem?._id === message.sender.userId) ||
                    (activeTab === "group" &&
                        props.activeItem?._id === message.receiver[0].userId)
                ) {
                    await axios.post(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/chats/updateDeliverType`,
                        {
                            senderId: message.sender.userId,
                            receiverId: [receivetId],
                            deliverType: "delivered",
                            type: activeTab,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }
            }, 2000);
        };

        const handleMessageDeleted = (data: {
            messageId: string;
            senderId: string;
            receiverId: string;
        }) => {
            if (!data || !props.activeItem) return;
            fetchChatData(0, props.activeItem._id, activeTab);

            const isGroupChat = props.activeItem?.chat[0]?.type === "group";
            const isActiveGroupChat =
                isGroupChat && props.activeItem._id === data.receiverId;

            if (
                isActiveGroupChat ||
                (props.activeItem._id === data.senderId && !isGroupChat)
            ) {
                // Update the chat state immutably
                props.setActiveItem((currentChat: any) => {
                    if (!currentChat) return currentChat;

                    const updatedChat = currentChat.chat.filter(
                        (msg: any) => msg._id !== data.messageId
                    );

                    return {
                        ...currentChat,
                        chat: updatedChat,
                    };
                });

                setTimeout(() => {
                    chatScroll.current?.scrollToBottom(0, 0);
                }, 100);
            }
        };

        if (socket) {
            socket.on("receiveMessage", handleReceiveMessage);
            socket.on("messageDeleted", handleMessageDeleted);
        }

        return () => {
            if (socket) {
                socket.off("receiveMessage", handleReceiveMessage);
                socket.off("messageDeleted", handleMessageDeleted);
            }
        };
    }, [props.activeItem, userInfo, token]);

    /* ------------------ Start: Show or hide UserInfo  ------------------ */
    const toggleUserInfo = () => {
        if (explicitlyClosed) {
            setExplicitlyClosed(false);
            setUserInfoVisible(true);
        } else {
            setUserInfoVisible((prevState) => !prevState);
        }
    };
    const closeUserInfo = () => {
        setUserInfoVisible(false);
        setExplicitlyClosed(true);
    };

    /* ------------------ End: Show or hide UserInfo  ------------------ */

    const onEmojiClick = (event: any, emojiObject: any) => {
        setInputStr((prevInput) => prevInput + event.emoji);
        setShowPicker(false);
    };

    const [openVideoCallPopup, setopenVideoCallPopup] = useState(false);

    const [openVoiceCallPopup, setopenVoiceCallPopup] = useState(false);

    /* ------------------ Start: SideBar Menu Change Contact To Chat  ------------------ */

    const handleGroupClick = (item: any) => {
        const userData = userList.find((user: any) => user._id === item._id);
        navigate("/chat");
        setAppState({ activeTab: "personal" });
        localStorage.setItem("activeTab", "personal");
        localStorage.setItem("activeItemId", userData._id.toString());
    };

    /* ------------------ Start: SideBar Menu Change Contact To Chat  ------------------ */

    /* ------------------ Start: Delete and Archive for Group and Broadcast  ------------------ */

    const handleMenuItemClick = async (action: string) => {
        const theme = localStorage.getItem("theme") || "light";
        const activTab = localStorage.getItem("activeTab");
        const baseUrl =
            activTab === "personal"
                ? "users"
                : activTab === "group"
                ? "groups"
                : activTab === "broadcast"
                ? "broadcast"
                : "";

        if (!activTab) {
            toast.error("No active tab selected.");
            return;
        }

        try {
            let response;

            if (action === "delete") {
                response = await axios.delete(
                    `http://localhost:5000/api/${baseUrl}/${props.activeItem._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    toast.success(
                        `${
                            activTab.charAt(0).toUpperCase() + activTab.slice(1)
                        } deleted successfully!`,
                        { theme: theme === "dark" ? "dark" : "light" }
                    );
                }
            } else if (action === "archive") {
                const currentData = await axios.get(
                    `http://localhost:5000/api/${baseUrl}/${props.activeItem._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentArchiveStatus = currentData.data.archive;
                const newArchiveStatus = !currentArchiveStatus;

                response = await axios.put(
                    `http://localhost:5000/api/${baseUrl}/${props.activeItem._id}`,
                    {
                        archive: newArchiveStatus,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    toast.success(
                        `${
                            activTab.charAt(0).toUpperCase() + activTab.slice(1)
                        } ${
                            newArchiveStatus ? "archived" : "unarchived"
                        } successfully!`,
                        { theme: theme === "dark" ? "dark" : "light" }
                    );
                }
            }

            const data = await axios.get(
                `http://localhost:5000/api/${baseUrl}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (activTab === "personal") {
                setAppState({ userList: data.data });
            } else if (activTab === "group") {
                setAppState({ groupList: data.data });
            } else if (activTab === "broadcast") {
                setAppState({ broadcastList: data.data });
            }
        } catch (error) {
            console.error(
                `Error ${
                    action === "delete" ? "deleting" : "archiving"
                } ${activTab}:`,
                error
            );
            toast.error(
                `Error ${
                    action === "delete" ? "deleting" : "archiving"
                } ${activTab}!`,
                {
                    theme: theme === "dark" ? "dark" : "light",
                }
            );
        }
    };

    const removeChatFromList = (chatId: any) => {
        props.setActiveItem((user: any) => {
            if (user?._id !== props.activeItem?._id) return user;

            const updatedChat = (user?.chat || []).filter(
                (chat: any) => chat._id !== chatId
            );

            return {
                ...user,
                chat: updatedChat,
            };
        });
    };

    /* ------------------ End: Delete and Archive for Group and Broadcast  ------------------ */

    return (
        <>
            <div className="flex justify-center items-center md:items-start md:justify-start w-full">
                <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                    <div
                        className={`${
                            userInfoVisible
                                ? "rounded-md md:rounded-tl-none md:rounded-tr-none md:rounded-br-none md:rounded-bl-none translate-x-0"
                                : "rounded-md md:rounded-tl-none md:rounded-tr-md md:rounded-br-md md:rounded-bl-none translate-x-full"
                        }self-stretch shrink-0 bg-fgc w-full flex flex-col items-start justify-start transition delay-500 ease-in-out duration-300`}
                        style={{
                            backgroundImage:
                                theme === "dark"
                                    ? "url('/dark-bg-pattern.png')"
                                    : "url('/light-bg-pattern.png')",
                        }}
                    >
                        {/* Start user chat header */}
                        {props.activeItem && (
                            <div className="self-stretch h-[52px]">
                                <div
                                    className={`${
                                        userInfoVisible
                                            ? "rounded-md md:rounded-tl-none md:rounded-tr-none md:rounded-br-none md:rounded-bl-none"
                                            : "rounded-tl-md rounded-tr-md rounded-br-none rounded-bl-none md:rounded-tl-none md:rounded-tr-md md:rounded-br-none md:rounded-bl-none"
                                    }box-border py-[4.6px] flex flex-col border-b-[1px] border-border dark:border-border-dark bg-fgc dark:bg-fgc-dark`}
                                >
                                    <div
                                        className={`self-stretch flex-1 h-screen flex flex-row items-center px-2 justify-between ${
                                            userInfoVisible
                                                ? "lg:px-3"
                                                : "lg:px-5"
                                        }`}
                                    >
                                        {/* Start Header user name */}
                                        <div
                                            className={`self-stretch md:w-auto lg:w-auto flex flex-row items-center justify-start box-border gap-2 ${
                                                userInfoVisible
                                                    ? "lg:gap-2"
                                                    : "lg:gap-5"
                                            }`}
                                        >
                                            <div className="block md:hidden">
                                                <Icon
                                                    icon="arrow-left"
                                                    className="text-text dark:text-icon h-5 w-5 sm:h-6 sm:w-6"
                                                    onClick={() => {
                                                        props.setActiveItem &&
                                                            props.setActiveItem(
                                                                null
                                                            );
                                                        localStorage.removeItem(
                                                            "activeItemId"
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col items-center justify-center relative">
                                                {props.activeItem && (
                                                    <div>
                                                        <img
                                                            src={
                                                                props.activeItem
                                                                    .groupImage ??
                                                                props.activeItem
                                                                    .broadcastImage ??
                                                                import.meta.env
                                                                    .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                                                    props
                                                                        .activeItem
                                                                        .profileImage
                                                            }
                                                            className="w-[42px] h-[42px] rounded-full"
                                                            alt=""
                                                        />
                                                        <span
                                                            className={`${
                                                                props.activeItem
                                                                    .status ===
                                                                "online"
                                                                    ? "absolute my-0 mx-[!important] top-7 left-[30px] rounded-full w-3 h-3 bg-online"
                                                                    : ""
                                                            } ${
                                                                props.activeItem
                                                                    .status ===
                                                                "away"
                                                                    ? "absolute my-0 mx-[!important] top-7 left-[30px] rounded-full w-3 h-3 bg-away"
                                                                    : ""
                                                            } ${
                                                                props.activeItem
                                                                    .status ===
                                                                "offline"
                                                                    ? "absolute my-0 mx-[!important] top-7 left-[30px] rounded-full w-3 h-3 bg-offline"
                                                                    : ""
                                                            }`}
                                                        ></span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col items-start justify-start">
                                                <div className="self-stretch flex flex-row items-start justify-start gap-2.5">
                                                    <div className="flex-1 relative dark:text-text-dark text-sm font-semibold">
                                                        {props.activeItem
                                                            ?.name &&
                                                            props.activeItem
                                                                .name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End Header user name */}
                                        {/* Start Header icons */}
                                        <div
                                            className={`self-stretch flex flex-row items-center justify-center gap-2 ${
                                                userInfoVisible
                                                    ? "lg:gap-2"
                                                    : "lg:gap-5"
                                            }`}
                                        >
                                            <div>
                                                {Searchstatus ? (
                                                    <div
                                                        className="absolute -translate-x-60 md:-translate-x-60 top-[63px] md:top-[18px] right-0 w-28 md:w-64
                                                    rounded-md bg-border dark:bg-fgc-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300"
                                                    >
                                                        <div className="self-stretch flex flex-row items-start justify-between">
                                                            <div className="self-stretch flex-1 rounded-md flex flex-row items-center justify-between py-2 px-5 border-[1px] dark:border-border-dark">
                                                                <input
                                                                    id="header-search-input"
                                                                    className="flex-1 relative overflow-auto outline-none bg-border dark:bg-fgc-dark"
                                                                    value={
                                                                        searchQuery
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSearchQuery(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder=" Search here..."
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                                <Icon
                                                    onClick={() =>
                                                        setSearchstatus(
                                                            !Searchstatus
                                                        )
                                                    }
                                                    icon="search"
                                                    className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer dark:text-icon"
                                                />
                                            </div>
                                            <Icon
                                                onClick={() =>
                                                    setopenVoiceCallPopup(true)
                                                }
                                                icon="phone"
                                                className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer dark:text-icon"
                                            />
                                            <Icon
                                                onClick={() =>
                                                    setopenVideoCallPopup(true)
                                                }
                                                icon="video-camera"
                                                className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover dark:text-icon"
                                            />
                                            <Icon
                                                onClick={toggleUserInfo}
                                                icon="exclamation-circle"
                                                className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
                                            />

                                            <Popover className="relative">
                                                <Popover.Button className="outline-none">
                                                    <Icon
                                                        onClick={() =>
                                                            setShowHeaderMenu(
                                                                !showHeaderMenu
                                                            )
                                                        }
                                                        icon="dots-vertical"
                                                        className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer dark:text-icon outline-none"
                                                    />
                                                </Popover.Button>
                                                <Popover.Panel className="absolute z-10 -ml-24 top-7 w-[110px] bg-white dark:bg-fgc-dark">
                                                    {({ open }) => (
                                                        <DotMenu
                                                            menuList={
                                                                HederMenuList
                                                            }
                                                            onMenuItemClick={
                                                                handleMenuItemClick
                                                            }
                                                        />
                                                    )}
                                                </Popover.Panel>
                                            </Popover>
                                        </div>
                                        {/* End Header icons */}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* End user chat header */}
                        {/* Start user chat */}
                        <div
                            className={`self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center overflow-y-auto ${
                                props.isContactMenuOpen && props.activeItem
                                    ? "max-h-[calc(100%-224px)] md:min-h-[calc(100vh-76px)] min-h-[calc(100vh-116px)]"
                                    : props.activeItem
                                    ? `max-h-[calc(100%-224px)] ${
                                          replyMessage
                                              ? "min-h-[calc(100vh-288.90px)] md:min-h-[calc(100vh-252.1px)]"
                                              : "min-h-[calc(100vh-188.90px)] md:min-h-[calc(100vh-147.90px)]"
                                      }`
                                    : props.isContactMenuOpen
                                    ? "max-h-[calc(100%-224px)] min-h-[calc(100vh-23.90px)]"
                                    : "max-h-[calc(100%-224px)] min-h-[calc(100vh-44px)]"
                            }`}
                        >
                            {props.isContactMenuOpen && props.activeItem ? (
                                <div className="flex flex-col items-center justify-center flex-grow gap-4">
                                    <div className="flex items-center justify-center h-[88px] w-[88px] bg-bgc-dark rounded-full">
                                        <Icon
                                            icon="chat-logo"
                                            className="h-10 w-10 dark:text-text-primaryText"
                                        />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-lg">
                                            Welcome to contacts
                                        </span>
                                    </div>
                                    <div className="w-full md:max-w-[400px] text-center">
                                        <span>
                                            It's important to have a good
                                            customer service, a customer service
                                            provider. Aenean's good fortune
                                            needs pain. with partners born and
                                            bred
                                        </span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleGroupClick(props.activeItem)
                                        }
                                        className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded duration-300 hover:scale-110"
                                    >
                                        Start Chat
                                    </button>
                                </div>
                            ) : (
                                <Scrollbars
                                    autoHide
                                    universal={true}
                                    className=""
                                    ref={chatScroll}
                                    onScroll={handleScroll}
                                    renderTrackVertical={(props) => (
                                        <div
                                            {...props}
                                            className="track-vertical"
                                        />
                                    )}
                                    renderThumbVertical={(props) => (
                                        <div
                                            {...props}
                                            className="thumb-vertical"
                                        />
                                    )}
                                >
                                    <div className="self-stretch flex flex-col items-start justify-end">
                                        {props.activeItem
                                            ? (props.activeItem.chat || [])
                                                  .filter((item: any) => {
                                                      // Apply refId filtering only in broadcast context
                                                      if (
                                                          activeTab ===
                                                          "broadcast"
                                                      ) {
                                                          return (
                                                              item.refId ===
                                                              props.activeItem
                                                                  ?._id
                                                          );
                                                      }
                                                      // For personal or group chats, show all messages
                                                      return true;
                                                  })
                                                  .sort(
                                                      (
                                                          createdDateA: any,
                                                          createdDateB: any
                                                      ) => {
                                                          const dateA =
                                                              new Date(
                                                                  createdDateA.createdAt
                                                              ).getTime();
                                                          const dateB =
                                                              new Date(
                                                                  createdDateB.createdAt
                                                              ).getTime();
                                                          return dateA - dateB;
                                                      }
                                                  )
                                                  .map(
                                                      (
                                                          item: any,
                                                          index: number
                                                      ) => (
                                                          <React.Fragment
                                                              key={index}
                                                          >
                                                              {item.messageType ===
                                                                  "text" && (
                                                                  <>
                                                                      {item
                                                                          .sender
                                                                          .userId !==
                                                                      userInfo?.userId ? (
                                                                          <TextReceived
                                                                              item={
                                                                                  item
                                                                              }
                                                                              userId={
                                                                                  loggedInUserId
                                                                              }
                                                                              activeItem={
                                                                                  props.activeItem
                                                                              }
                                                                              onReply={
                                                                                  handleReplyMessage
                                                                              }
                                                                              markAsUnread={
                                                                                  handleUpdatedeliverType
                                                                              }
                                                                          />
                                                                      ) : (
                                                                          <TextSent
                                                                              item={
                                                                                  item
                                                                              }
                                                                              userId={
                                                                                  loggedInUserId
                                                                              }
                                                                              activeItem={
                                                                                  props.activeItem
                                                                              }
                                                                              onDelete={
                                                                                  removeChatFromList
                                                                              }
                                                                              onReply={
                                                                                  handleReplyMessage
                                                                              }
                                                                              onUpdate={
                                                                                  handleUpdateMessage
                                                                              }
                                                                          />
                                                                      )}
                                                                  </>
                                                              )}

                                                              {item.messageType ===
                                                                  "image" && (
                                                                  <>
                                                                      {item
                                                                          .receiver[0]
                                                                          .userId ===
                                                                      loggedInUserId ? (
                                                                          <ImageReceived
                                                                              item={
                                                                                  item
                                                                              }
                                                                              userId={
                                                                                  loggedInUserId
                                                                              }
                                                                              activeItem={
                                                                                  props.activeItem
                                                                              }
                                                                          />
                                                                      ) : (
                                                                          <ImageSent
                                                                              item={
                                                                                  item
                                                                              }
                                                                              userId={
                                                                                  loggedInUserId
                                                                              }
                                                                              activeItem={
                                                                                  props.activeItem
                                                                              }
                                                                          />
                                                                      )}
                                                                  </>
                                                              )}

                                                              {item.messageType ===
                                                                  "document" && (
                                                                  <>
                                                                      {item
                                                                          .receiver
                                                                          .userId ===
                                                                      loggedInUserId ? (
                                                                          <DocumentReceived
                                                                              item={
                                                                                  item
                                                                              }
                                                                              userId={
                                                                                  loggedInUserId
                                                                              }
                                                                              activeItem={
                                                                                  props.activeItem
                                                                              }
                                                                          />
                                                                      ) : (
                                                                          <DocumentSent
                                                                              item={
                                                                                  item
                                                                              }
                                                                              userId={
                                                                                  loggedInUserId
                                                                              }
                                                                              activeItem={
                                                                                  props.activeItem
                                                                              }
                                                                          />
                                                                      )}
                                                                  </>
                                                              )}
                                                          </React.Fragment>
                                                      )
                                                  )
                                            : null}
                                    </div>
                                </Scrollbars>
                            )}
                        </div>
                        {/* End user chat */}

                        {/** MainContent footer */}
                        <div
                            className={`self-stretch flex flex-row-center justify-start w-full p-2.5 ${
                                props.isContactMenuOpen ? "hidden" : "block"
                            }`}
                        >
                            {props.activeItem && (
                                <div
                                    className={`flex-1 rounded ${
                                        replyMessage
                                            ? "h-auto flex-col py-3"
                                            : "h-[52px] flex-row"
                                    } flex  items-center bg-white dark:bg-bgc-dark justify-start box-border relative px-5`}
                                >
                                    {replyMessage && (
                                        <div className="w-full rounded border-s-[3px] border-green flex flex-col gap-2.5 p-2 mb-2 bg-[#b5b2b252]">
                                            <div className="flex justify-between">
                                                <Icon
                                                    icon="reply"
                                                    className="w-5 h-5"
                                                />
                                                <Icon
                                                    icon="x"
                                                    className="w-5 h-5 cursor-pointer"
                                                    onClick={() =>
                                                        setReplyMessage(null)
                                                    }
                                                />
                                            </div>
                                            <div className="font-semibold">
                                                {replyMessage.message}
                                            </div>
                                            <div>
                                                {replyMessage.name},{" "}
                                                {new Date(
                                                    replyMessage.createdAt
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    {status ? <AttachmentMenu /> : null}
                                    <div className="w-full flex gap-5">
                                        <div className="flex flex-row items-center justify-start">
                                            <Icon
                                                onClick={() =>
                                                    setstatus(!status)
                                                }
                                                icon="dots-horizontal"
                                                className="h-6 w-6 inline-flex cursor-pointer dark:text-icon"
                                            />
                                        </div>
                                        <div className="">
                                            <ul className="dropup-content absolute -top-1 left-0 -translate-y-full w-[350px]">
                                                {showPicker && (
                                                    <EmojiPicker
                                                        onEmojiClick={
                                                            onEmojiClick
                                                        }
                                                    />
                                                )}
                                            </ul>
                                            <Icon
                                                onClick={() =>
                                                    setShowPicker((val) => !val)
                                                }
                                                icon="emoji-happy"
                                                className="h-6 w-6 inline-flex cursor-pointer dark:text-icon"
                                            />
                                        </div>

                                        <div className="self-stretch flex-1 flex w-full flex-row items-center justify-start p-1">
                                            <textarea
                                                id="textarea-input"
                                                className="flex-1 relative resize-none w-full h-5 outline-0 overflow-hidden inline-block vertical-align:middle over h-100vh-[25px] box-border dark:bg-bgc-dark"
                                                placeholder="Type here..."
                                                value={inputStr}
                                                onChange={(e) => {
                                                    setInputStr(e.target.value);
                                                }}
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e)
                                                }
                                            />
                                        </div>
                                        <Icon
                                            icon={
                                                muted
                                                    ? "microphone-muted"
                                                    : "microphone"
                                            }
                                            className="h-6 w-6 cursor-pointer dark:text-icon"
                                            onClick={handleClick}
                                        />
                                        <button onClick={sendMessage}>
                                            <Icon
                                                icon="paper-airplane"
                                                className="h-6 w-6 cursor-pointer rotate-90 dark:text-icon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/** MainContent footer End*/}
                    </div>
                </div>
                {activeTab === "personal" &&
                    userInfoVisible &&
                    props.activeItem && (
                        <div className="absolute md:absolute md:right-3 lg:right-0 lg:relative w-full md:max-w-[350px] px-3 md:px-0">
                            <Userinfo
                                activeItem={props.activeItem}
                                setActiveItem={props.setActiveItem}
                                userId={props.userId}
                                close={closeUserInfo}
                                open={!userInfoVisible}
                            />
                        </div>
                    )}

                {activeTab === "group" &&
                    userInfoVisible &&
                    props.activeItem && (
                        <div className="absolute md:absolute md:right-3 lg:right-0 lg:relative w-full md:w-[350px] px-3 md:px-0">
                            <GroupInfo
                                activeItem={props.activeItem}
                                setActiveItem={props.setActiveItem}
                                userId={props.userId}
                                close={closeUserInfo}
                                open={!userInfoVisible}
                            />
                        </div>
                    )}

                {activeTab === "broadcast" &&
                    userInfoVisible &&
                    props.activeItem && (
                        <div className="absolute md:absolute md:right-3 lg:right-0 lg:relative w-full md:w-[350px] px-3 md:px-0">
                            <BroadCastInfo
                                activeItem={props.activeItem}
                                setActiveItem={props.setActiveItem}
                                userId={props.userId}
                                close={closeUserInfo}
                                open={!userInfoVisible}
                            />
                        </div>
                    )}
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
        </>
    );
};

export default MainContent;
