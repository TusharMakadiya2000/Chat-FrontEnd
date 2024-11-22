const MenuList = () => {
    const HederMenuList = [
        {
            title: "Archive",
            name: "archive",
            icon: "calendar",
        },
        {
            title: "Muted",
            name: "muted",
            icon: "microphone-muted",
        },
        {
            title: "Delete",
            name: "delete",
            icon: "trash",
        },
    ];
    const ContactMenuList = [
        {
            title: "Edit",
            name: "edit",
            icon: "pencil",
        },
        {
            title: "Block",
            name: "block",
            icon: "cog",
        },
        {
            title: "Remove",
            name: "remove",
            icon: "trash",
        },
    ];
    const SavedMenuList = [
        {
            title: "Open",
            name: "open",
            icon: "folder-open",
        },
        {
            title: "Edit",
            name: "edit",
            icon: "pencil",
        },
        {
            title: "Delete",
            name: "delete",
            icon: "trash",
        },
    ];
    const profileMenuList = [
        {
            title: "Info",
            name: "info",
            icon: "exclamation-circle",
        },
        {
            title: "Setting",
            name: "setting",
            icon: "cog",
        },
        {
            title: "Help",
            name: "help",
            icon: "question-mark-circle",
        },
    ];
    const profileDotMenuList = [
        {
            title: "Share",
            name: "share",
            icon: "share",
        },
        {
            title: "Save",
            name: "save",
            icon: "bookmark",
        },
        {
            title: "Delete",
            name: "delete",
            icon: "trash",
        },
    ];
    const profileMenu = [
        {
            title: "My Profile",
            name: "my-profile",
            link: "/my-profile",
            icon: "user-circle",
        },
        {
            title: "Setting",
            name: "Setting",
            link: "/setting",
            icon: "cog",
        },
        {
            title: "Change Password",
            name: "change-password",
            link: "/change-password",
            icon: "lock-open",
        },
        {
            title: "Log out",
            name: "logout",
            icon: "logout",
        },
    ];
    const SettingActiveMenuList = [
        {
            title: "Active",
            name: "active",
        },
        {
            title: "Away",
            name: "away",
        },
        {
            title: "DND",
            name: "dnd",
        },
    ];
    const SettingProfilePhotoMenuList = [
        {
            title: "Selected",
            name: "selected",
        },
        {
            title: "Everyone",
            name: "everyone",
        },
        {
            title: "Nobody",
            name: "nobody",
        },
    ];
    const GroupMenuList = [
        {
            title: "Message",
            name: "message",
        },
        {
            title: "View",
            name: "view",
        },
        {
            title: "Make Admin",
            name: "MakeAdmin",
        },
        {
            title: "Remove Admin",
            name: "RemoveAdmin",
        },
    ];
    const UserStatusMenuList = [
        {
            title: "Online",
            name: "online",
        },
        {
            title: "Away",
            name: "away",
        },
        {
            title: "Offline",
            name: "offline",
        },
        {
            title: "All STATUS",
            name: "all",
        },
    ];
    const ChatSendMenuList = [
        {
            title: "Edit",
            name: "edit",
            icon: "pencil-alt",
        },
        {
            title: "Copy",
            name: "copy",
            icon: "duplicate",
        },
        {
            title: "Replay",
            name: "replay",
            icon: "reply-arrow",
        },

        {
            title: "Forward",
            name: "forward",
            icon: "forward-arrow",
        },
        {
            title: "BookMark",
            name: "bookmark",
            icon: "bookmark",
        },
        {
            title: "Delete",
            name: "delete",
            icon: "trash",
        },
    ];
    const ChatReceiveMenuList = [
        {
            title: "Copy",
            name: "copy",
            icon: "duplicate",
        },
        {
            title: "Replay",
            name: "replay",
            icon: "reply-arrow",
        },
        {
            title: "Forward",
            name: "forward",
            icon: "forward-arrow",
        },
        {
            title: "BookMark",
            name: "bookmark",
            icon: "bookmark",
        },
        {
            title: "Mark as Unread",
            name: "markAsUnread",
            icon: "exclamation-circle",
        },
        {
            title: "Delete",
            name: "delete",
            icon: "trash",
        },
    ];
    const GroupUserList = [
        {
            title: "Dismiss as admin",
            name: "dismissAdmin",
        },
        {
            title: "Make group admin",
            name: "makeAdmin",
        },
        {
            title: "Remove from group",
            name: "remove",
        },
    ];
    const BroadcastUserList = [
        {
            title: "Remove from Broadcast",
            name: "remove",
        },
    ];

    return {
        HederMenuList,
        ContactMenuList,
        SavedMenuList,
        profileMenuList,
        profileDotMenuList,
        profileMenu,
        SettingActiveMenuList,
        SettingProfilePhotoMenuList,
        GroupMenuList,
        UserStatusMenuList,
        ChatReceiveMenuList,
        ChatSendMenuList,
        GroupUserList,
        BroadcastUserList,
    };
};
export default MenuList;
