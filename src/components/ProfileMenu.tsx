import Icon from "./utils/Icon";
type MenuItem = {
    title: string;
    name: string;
    icon: string;
    // link?: string; // Add this line if link is optional
};

type MenuProps = {
    menuList: MenuItem[];
};
const ProfileMenu: React.FC<MenuProps> = ({ menuList }) => {
    return (
        <>
            <div
                className="absolute z-10 left-0 -bottom-12 w-[168px] rounded-md bg-bgc dark:bg-fgc-dark dark:shadow-white/10 shadow-lg dark:drop-shadow-sm focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                {menuList.map((item, index) => (
                    <div
                        key={"menu-List_ " + index}
                        className={`border-b relative ${
                            index === 0 ? "rounded-tl-md rounded-tr-md" : ""
                        } ${
                            index === menuList.length - 1
                                ? "rounded-bl-none rounded-br-none"
                                : ""
                        } dark:border-border-dark`}
                    >
                        <div className="flex px-3 gap-2 py-2 cursor-pointer hover:bg-bgc-bgSelect">
                            <Icon
                                icon={item.icon}
                                className="h-5 w-5 cursor-pointer"
                            />
                            <div>
                                <h1 className="">{item.title}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProfileMenu;
