import Icon from "../utils/Icon";
type SettingMenuItem = {
    title: string;
    name: string;
    icon: string;
    // link?: string; // Add this line if link is optional
};

type MenuProps = {
    menuList: SettingMenuItem[];
};
const SettingMenuPopup: React.FC<MenuProps> = ({ menuList }) => {
    return (
        <>
            <div
                className="z-10 w-[120px] rounded-md bg-white dark:bg-fgc-dark dark:shadow-white/10 shadow-lg dark:drop-shadow-sm focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                {menuList.map((item, index) => (
                    <div
                        key={"Setting-Menu-List_" + index}
                        className={` group relative ${
                            index === 0 ? "rounded-tl-md rounded-tr-md" : ""
                        } ${
                            index === menuList.length - 1
                                ? "rounded-bl-none rounded-br-none"
                                : ""
                        } `}
                    >
                        <div className="flex justify-around items-center px-5 gap-1 cursor-pointer hover:bg-bgc-bgSelect">
                            <span
                                className={`w-2 h-2 rounded-full ${
                                    item.title === "Active" && "dark:bg-green"
                                } ${item.title === "Away" && "dark:bg-away"} ${
                                    item.title === "DND" && "dark:bg-offline"
                                }`}
                            ></span>
                            <div className="py-2">{item.title}</div>
                            <div>
                                <Icon
                                    icon={item.icon}
                                    className="h-5 w-5 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SettingMenuPopup;
