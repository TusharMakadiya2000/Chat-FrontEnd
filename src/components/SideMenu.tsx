import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import Icon from "./utils/Icon";
import MenuList from "./MenuList";
import { Popover, Transition } from "@headlessui/react";
import useAuthUser from "./useAuthUser";
import { useAuth } from "../AuthContext";

const SideMenu = () => {
    const { isAuthenticated, logout } = useAuth();
    const user = useAuthUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [activePage, setActivePage] = useState(
        location.pathname.replace("/", "")
    );
    const [profile, setProfileMenu] = useState(false);
    const { profileMenu } = MenuList();
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("theme") || "light"
    );
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleRouteChange = () => {
            setActivePage(location.pathname.replace("/", ""));
            if (window.innerWidth < 768) {
                setIsMenuOpen(false);
            }
        };
        handleRouteChange();
    }, [location.pathname]);

    useEffect(() => {
        const handleThemeChange = () => {
            const newTheme = localStorage.getItem("theme") || "light";
            setThemeMode(newTheme);
        };

        window.addEventListener("themeChange", handleThemeChange);

        let isDark = false;
        if (
            !("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.classList.add("dark");
            isDark = true;
            setThemeMode("dark");
        }
        if (localStorage.theme === "dark") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            isDark = true;
            setThemeMode("dark");
        } else if (localStorage.theme === "light") {
            setThemeMode("light");
        }

        return () => {
            window.removeEventListener("themeChange", handleThemeChange);
        };
    }, []);

    const setThemeModeState = (isDark: any) => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setThemeMode("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setThemeMode("light");
        }
        const event = new Event("themeChange");
        window.dispatchEvent(event);
    };

    const toggleTheme = () => {
        const isDark = localStorage.theme === "dark";
        setThemeModeState(!isDark);
        setThemeMode(isDark ? "light" : "dark");
    };

    const [menuList] = useState([
        { title: "Chat", name: "chat", link: "/chat", icon: "chat-alt-2" },
        { title: "Call", name: "call", link: "/call", icon: "phone" },
        {
            title: "Contacts",
            name: "contact",
            link: "/contact",
            icon: "clipboard-list",
        },
        { title: "Saved", name: "saved", link: "/saved", icon: "bookmark" },
        {
            title: "My Profile",
            name: "my-profile",
            link: "/my-profile",
            icon: "user",
        },
        { title: "Setting", name: "setting", link: "/setting", icon: "cog" },
    ]);

    const handleLogout = (e: any) => {
        e.preventDefault();
        logout();
        // localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className="z-10 flex flex-col self-stretch">
            <button
                className="absolute left-5 top-4 block text-primaryActive dark:text-text-primaryText md:hidden focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Icon icon="menu" className="h-6 w-6" />
            </button>
            <div
                className={`flex flex-col items-center box-border md:w-[92px] ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } fixed top-0 left-0 h-full bg-primary md:static md:transform-none md:bg-transparent transition-transform duration-700 rounded-tr-[50%] rounded-br-[50%]`}
            >
                <button
                    className={`absolute top-1 left-[70px] block md:hidden ${
                        isMenuOpen ? "block" : "hidden md:block"
                    }`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Icon icon="x" className="h-6 w-6" />
                </button>
                <div className="flex flex-col items-center gap-1 md:gap-3 py-1 px-2.5 md:pt-6 md:px-4">
                    <div className="flex flex-col items-start justify-start p-1 md:p-0">
                        <Icon icon="chat-logo" className="h-16 w-16" />
                    </div>
                    <div className="flex flex-col items-center gap-4 flex-1 text-sm">
                        <div className="flex flex-col items-center gap-2 lg:gap-2">
                            {menuList.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.link}
                                    className={`flex flex-col items-center w-[76px] py-1 md:py-[6.5px] rounded-lg text-primaryActive dark:text-text-primaryText transition-all hover:bg-bgc-select hover:text-white ${
                                        activePage === item.name
                                            ? "bg-bgc-select"
                                            : ""
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className="h-6 w-6 dark:text-text-primaryText"
                                    />
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -top-1 right-0 md:bottom-6 md:left-7 flex flex-row items-center md:flex md:flex-col md:items-center gap-2 lg:gap-2 p-2 md:static">
                <span
                    className="flex cursor-pointer gap-3"
                    onClick={toggleTheme}
                >
                    <div className="flex flex-col items-center">
                        <Icon
                            icon={themeMode === "dark" ? "moon" : "sun"}
                            className="h-6 w-6 text-white dark:text-text-primaryText"
                        />
                        <p className="text-text-primaryText text-xs">
                            {themeMode === "dark" ? "Dark" : "Light"}
                        </p>
                    </div>
                </span>
                <Popover>
                    <Popover.Button className="outline-none">
                        <div>
                            <img
                                onClick={() => setProfileMenu(!profile)}
                                // user?.profileImage
                                src={
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                    user?.profileImage
                                }
                                className="w-8 h-8 rounded-full"
                                alt="userImage"
                            />
                            <p className="text-text-primaryText text-xs">
                                Profile
                            </p>
                        </div>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10 -translate-x-36 md:bottom-3 md:translate-x-10">
                            <div
                                className="divide-y divide-border dark:divide-border-dark left-0 w-[168px] rounded-md bg-white dark:bg-fgc-dark dark:shadow-white/10 shadow-lg dark:drop-shadow-sm overflow-hidden"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                            >
                                {profileMenu.map((item, index) => (
                                    <div
                                        key={"sub-side-profileMenu_" + index}
                                        className="relative"
                                    >
                                        <Link
                                            to={`${item.link}`}
                                            className="flex px-3 gap-2 py-2 hover:bg-primary-tabbg dark:hover:bg-bgc-bgSelect"
                                            onClick={(e) => {
                                                if (item.name === "logout") {
                                                    handleLogout(e);
                                                }
                                            }}
                                        >
                                            <Icon
                                                icon={item.icon}
                                                className="h-5 w-5"
                                            />
                                            <div>
                                                <h1>{item.title}</h1>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>
        </div>
    );
};

export default SideMenu;
