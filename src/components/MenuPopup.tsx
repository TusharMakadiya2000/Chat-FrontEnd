import { useState } from "react";
import Icon from "./utils/Icon";
import ForwardMessagepopup from "./ForwardMessagepopup";
import { IChat } from "./utils/types";
type MenuItem = {
    title: string;
    name: string;
    icon?: string;
    // link?: string; // Add this line if link is optional
};

type MenuProps = {
    menuList: MenuItem[];
    onMenuItemClick?: (action: string) => void;
    chatItem?: IChat;
};
const MenuPopup: React.FC<MenuProps> = ({
    menuList,
    onMenuItemClick,
    chatItem,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openCreate, setOpenCreate] = useState<string | null>(null);
    return (
        <>
            <div
                className="divide-y divide-border dark:divide-border-dark rounded-md dark:shadow-white/10 shadow-lg dark:drop-shadow-sm focus:outline-none overflow-hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                {menuList.map((item, index) => (
                    <div
                        key={"menuList_" + index}
                        className="relative cursor-pointer hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect"
                        onClick={() => {
                            setOpenCreate(item.name);
                            if (onMenuItemClick) {
                                onMenuItemClick(item.name);
                            }
                        }}
                    >
                        <div className="flex items-center px-3 gap-2 py-1.5">
                            {item.title === "Active" && (
                                <span className="w-2 h-2 rounded-full bg-green dark:bg-green"></span>
                            )}
                            {item.title === "Away" && (
                                <span className="w-2 h-2 rounded-full bg-away dark:bg-away"></span>
                            )}
                            {item.title === "DND" && (
                                <span className="w-2 h-2 rounded-full bg-offline dark:bg-offline"></span>
                            )}
                            {item.title === "Offline" && (
                                <span className="w-2 h-2 rounded-full bg-offline dark:bg-offline"></span>
                            )}
                            <Icon
                                icon={item.icon}
                                className="h-4 w-4 cursor-pointer"
                            />
                            <div>
                                <h1 className="">{item.title}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {openCreate === "forward" && (
                <ForwardMessagepopup
                    openCreate={true}
                    setOpenCreate={setOpenCreate.bind(null, null)}
                    chat={chatItem}
                />
            )}
        </>
    );
};

export default MenuPopup;
