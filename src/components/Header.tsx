import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./utils/Icon";

const Header = () => {
    const [activeMode, setActiveMode] = useState<string>("");

    useEffect(() => {
        let isDark = false;
        if (
            !("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.classList.add("dark");
            isDark = true;
            setActiveMode("moon");
        }
        if (localStorage.theme === "dark") {
            isDark = true;
            setActiveMode("moon");
        } else if (localStorage.theme === "light") {
            setActiveMode("sun");
        }
        setThemeMode(isDark);
    }, []);
    /* const clickHandler = (mode: string) => {

        if (mode === "dark") {
            setIsDark(true);
            localStorage.setItem("theme", "dark");
        } else if (mode === "light") {
            setIsDark(false);
            localStorage.setItem("theme", "light");
        } else {
            setIsDark(false);
            localStorage.removeItem("theme");
            if (
                !("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                setIsDark(true);
            }
        }
        changeMode();
    } */

    const setThemeMode = (isDark: boolean) => {
        if (
            !("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.classList.add("dark");
            isDark = true;
        }

        // setIsDark(isDark);
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>

            <nav className="navbar border-b dark:border-slate-800  dark:text-white border-gray-100 fixed w-full top-0 z-50 bg-white dark:bg-transparent dark:backdrop-blur">
                <Link
                    to=""
                    className="float-left items-center text-2xl font-medium text-indigo-500 dark:text-gray-100 p-4"
                >
                    <span>TestDemo</span>
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className="nav-link dark:hover:bg-slate-900 hover:bg-gray-100"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item dropdown dark:hover:bg-slate-900 hover:bg-gray-100">
                        <Link to="/login" className="nav-link dropdown-toggle">
                            Authentication
                        </Link>
                        <ul className="dropdown-menu dark:bg-slate-800 dark:text-white bg-white">
                            <li className="dark:hover-bg-slate-900 hover:bg-gray-100">
                                <Link to="/login">Login</Link>
                            </li>
                            <li className="dark:hover-bg-slate-900 hover:bg-gray-100">
                                <Link to="/Signup">Signup</Link>
                            </li>
                            <li className="dark:hover-bg-slate-900 hover:bg-gray-100">
                                <Link to="/ForgotPassword">ForgotPassword</Link>
                            </li>
                            <li className="dark:hover-bg-slate-900 hover:bg-gray-100">
                                <Link to="/ResetPassword">ResetPassword</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="chat-item">
                        <Link
                            to="/chat"
                            className="nav-link  dark:hover:bg-slate-900 hover:bg-gray-100"
                        >
                            Chat
                        </Link>
                    </li>
                    <li className="about-item">
                        <Link
                            to="/about-us"
                            className="nav-link  dark:hover:bg-slate-900 hover:bg-gray-100"
                        >
                            About
                        </Link>
                    </li>
                    <li className="contact-item">
                        <Link
                            to="/contact-us"
                            className="nav-link  dark:hover:bg-slate-900 hover:bg-gray-100"
                        >
                            ConatactUs
                        </Link>
                    </li>

                    <li className="nav-item dropdown mr-4 dark:hover:bg-slate-900 hover:bg-gray-100">
                        <Link
                            to="/"
                            className="nav-link dropdown-toggle no-icon !flex"
                        >
                            <Icon
                                icon={activeMode || "desktop-computer"}
                                className="h-6 w-6 text-gray-900 dark:text-white"
                            />
                        </Link>
                        <ul className="dropdown-menu w-32 dark:bg-slate-800 dark:text-white bg-white">
                            <li>
                                <span
                                    className="!flex cursor-pointer gap-3 mode_link dark:hover:bg-slate-900 hover:bg-gray-100"
                                    data-title="light"
                                    onClick={() => {
                                        localStorage.setItem("theme", "light");
                                        setActiveMode("sun");
                                        setThemeMode(false);
                                    }}
                                >
                                    <Icon
                                        icon="sun"
                                        className="h-6 w-6 text-gray-900 dark:text-white"
                                    />
                                    Light
                                </span>
                            </li>
                            <li>
                                <span
                                    className="!flex cursor-pointer gap-3 mode_link dark:hover:bg-slate-900 hover:bg-gray-100"
                                    data-title="dark"
                                    onClick={() => {
                                        setThemeMode(true);
                                        setActiveMode("moon");
                                        localStorage.setItem("theme", "dark");
                                    }}
                                >
                                    <Icon
                                        icon="moon"
                                        className="h-6 w-6 text-gray-900 dark:text-white"
                                    />
                                    Dark
                                </span>
                            </li>
                            <li>
                                <span
                                    className="!flex cursor-pointer gap-3 mode_link dark:hover:bg-slate-900 hover:bg-gray-100"
                                    data-title="system"
                                    onClick={() => {
                                        setThemeMode(false);
                                        setActiveMode("");
                                        localStorage.removeItem("theme");
                                    }}
                                >
                                    <Icon
                                        icon="desktop-computer"
                                        className="h-6 w-6 text-gray-900 dark:text-white"
                                    />
                                    System
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
