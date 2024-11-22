import { Scrollbars } from "react-custom-scrollbars";
import CallItem from "./callItem";
import { useEffect, useState } from "react";
import CallListProvider from "../CallHistoryList";
import Icon from "../utils/Icon";

interface ICallContentProps {
    activeItem: any;
    setActiveItem: (item: any) => void;
    userId: number;
}

const CallMenu = (props: ICallContentProps) => {
    const [theme, setThemeState] = useState(
        localStorage.getItem("theme") || "light"
    );
    useEffect(() => {
        const handleThemeChange = () => {
            setThemeState(localStorage.getItem("theme") || "light");
        };

        window.addEventListener("themeChange", handleThemeChange);

        return () => {
            window.removeEventListener("themeChange", handleThemeChange);
        };
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { callList } = CallListProvider();

    return (
        <>
            <div className="self-stretch flex-1 flex flex-col items-start justify-start call-menu">
                <div className="self-stretch shrink-0 box-border rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md md:rounded-tl-none md:rounded-tr-md md:rounded-br-md md:rounded-bl-none bg-white dark:bg-bgc-dark w-full flex flex-col items-start justify-start">
                    <div className="self-stretch box-border flex flex-col items-center justify-start border-border ">
                        {props.activeItem && (
                            <div className="self-stretch flex flex-col items-center justify-center py-3 md:py-5 box-border gap-2 md:gap-5">
                                <div className="absolute left-5 top-16 block md:hidden lg:hidden">
                                    <Icon
                                        icon="arrow-left"
                                        className="text-text dark:text-icon h-5 w-5 sm:h-6 sm:w-6"
                                        onClick={() => {
                                            props.setActiveItem &&
                                                props.setActiveItem(null);
                                            localStorage.removeItem(
                                                "activeItemId"
                                            );
                                        }}
                                    />
                                </div>
                                <div className="items-center justify-center ">
                                    <img
                                        src={
                                            props.activeItem
                                                ? props.activeItem.profileImage
                                                : "./images/avatar-male.svg"
                                        }
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                                        alt={
                                            props.activeItem
                                                ? props.activeItem.name
                                                : "avatar-male"
                                        }
                                    />
                                </div>
                                <div className="text-sm md:text-base h-[22px]">
                                    {props.activeItem
                                        ? props.activeItem.name
                                        : "Name"}
                                </div>
                                <div className="px-2 py-0.5 items-center text-sm md:text-base rounded bg-primary text-white justify-center">
                                    +91&nbsp;99999 99999
                                    {/* {props.activeItem
                                        ? props.activeItem.mobileNumber
                                        : "99999 99999"} */}
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className={`self-stretch flex-1 h-screen overflow-hidden flex flex-col rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none items-start justify-start overflow-y-auto ${
                            props.activeItem
                                ? "max-h-[calc(100vh-224px)] min-h-[calc(100vh-215px)] md:max-h-[calc(100vh-224px)] md:min-h-[calc(100vh-234px)]"
                                : "max-h-[calc(100vh-224px)] min-h-[calc(100vh-24px)]"
                        }`}
                        style={{
                            backgroundImage:
                                theme === "dark"
                                    ? "url('/dark-bg-pattern.png')"
                                    : "url('/light-bg-pattern.png')",
                        }}
                    >
                        <Scrollbars
                            autoHide
                            universal={true}
                            className=""
                            renderTrackVertical={(props) => (
                                <div {...props} className="track-vertical" />
                            )}
                            renderThumbVertical={(props) => (
                                <div {...props} className="thumb-vertical" />
                            )}
                        >
                            <div className="self-stretch  flex flex-col items-start justify-end gap-5">
                                <div className="relative flex-row self-stretch">
                                    <CallItem
                                        userItem={props.activeItem}
                                        activeItem={props.activeItem}
                                        setActiveItem={props.setActiveItem}
                                    />
                                </div>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CallMenu;
