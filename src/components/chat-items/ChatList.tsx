const ChatList = () => {
    const ChatSendMenuList = [
        {
            title: "Replay",
            name: "replay",
            // link: "/chat",
            icon: "reply",
        },
        {
            title: "Copy",
            name: "copy",
            // link: "/call",
            icon: "duplicate",
        },
        {
            title: "Edit",
            name: "edit",
            // link: "/contact",
            icon: "pencil-alt",
        },
        {
            title: "Forward",
            name: "forward",
            // link: "/chat",
            icon: "share",
        },
        {
            title: "BookMark",
            name: "bookmark",
            // link: "/call",
            icon: "bookmark",
        },
        {
            title: "Mark as Unread",
            name: "markAsUnread",
            // link: "/contact",
            icon: "exclamation-circle",
        },
        {
            title: "Delete",
            name: "delete",
            // link: "/contact",
            icon: "trash",
        },
    ];
    const ChatReceiveMenuList = [
        {
            title: "Replay",
            name: "replay",
            // link: "/chat",
            icon: "reply",
        },
        {
            title: "Copy",
            name: "copy",
            // link: "/call",
            icon: "duplicate",
        },
        {
            title: "Forward",
            name: "forward",
            // link: "/chat",
            icon: "share",
        },
        {
            title: "BookMark",
            name: "bookmark",
            // link: "/call",
            icon: "bookmark",
        },
        {
            title: "Mark as Unread",
            name: "markAsUnread",
            // link: "/contact",
            icon: "exclamation-circle",
        },
        {
            title: "Delete",
            name: "delete",
            // link: "/contact",
            icon: "trash",
        },
    ];

    return { ChatSendMenuList, ChatReceiveMenuList };
};
export default ChatList;
