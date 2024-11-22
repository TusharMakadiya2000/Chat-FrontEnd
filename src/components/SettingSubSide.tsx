import { Scrollbars } from "react-custom-scrollbars";
import { useEffect, useState } from "react";
import Icon from "./utils/Icon";
import MenuList from "./MenuList";
import ChangeTheme from "./seeting-items/ChangeTheme";
import PersonalInfo from "./seeting-items/PersonalInfo";
import Privacy from "./seeting-items/Privacy";
import Security from "./seeting-items/Security";
import Help from "./seeting-items/Help";
import { Popover } from "@headlessui/react";
import MenuPopup from "./MenuPopup";
import useAuthUser from "./useAuthUser";
import CoverImageModal from "./seeting-items/CoverImage";

interface IMainContentProps {
    activeItem: any;
    setActiveItem: (item: any) => void;
    userId: number;
}

interface IDownloadItem {
    id: number;
    name: string;
    icon: string;
    // icon1: string;
}

export const SettingSubSide = (props: IMainContentProps) => {
    const [infoMenuStatus, setInfoMenuStatus] = useState(false);
    const [status, setStatus] = useState(false);
    const { SettingActiveMenuList } = MenuList();
    const [openState, setOpenState] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useState("light");
    // Get Login user Info.
    const user = useAuthUser();
    const [openCoverImagePopup, setopenCoverImagePopup] = useState(false);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    useEffect(() => {
        setStatus(status);
    }, [status]);

    useEffect(() => {
        if (user?.coverImage) {
            setCoverImageUrl(
                `${
                    import.meta.env
                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL
                }${user.coverImage}`
            );
        }
    }, [user]);

    const handleCoverImageUpdate = (newImageUrl: string) => {
        // Update the cover image URL when a new image is uploaded
        setCoverImageUrl(newImageUrl);
    };

    const handleIconClick = (name: string) => {
        setOpenState(openState === name ? null : name);
    };
    const downloadList: IDownloadItem[] = [
        {
            id: 1,
            name: "Personal Info",
            icon: "user",
        },
        {
            id: 2,
            name: "Privacy",
            icon: "lock-closed",
        },
        {
            id: 3,
            name: "Themes",
            icon: "theme-color",
        },
        {
            id: 4,
            name: "Security",
            icon: "shield-check",
        },
        {
            id: 5,
            name: "Help",
            icon: "question-mark-circle",
        },
    ];

    return (
        <>
            <div className="self-stretch rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md md:rounded-tl-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-md bg-white dark:bg-bgc-dark w-full md:w-[350px] overflow-hidden shrink-0 flex flex-col items-center justify-start">
                <div className="relative">
                    <div className="w-full flex flex-row items-center justify-between absolute p-3 pb-0 pt-0 top-2.5">
                        <div className="p-2.5 font-semibold text-lg">
                            Settings
                        </div>
                        <div className="p-2.5">
                            <Popover className="relative">
                                <Popover.Button className="outline-none">
                                    <div
                                        onClick={() =>
                                            setopenCoverImagePopup(true)
                                        }
                                        className="p-1.5 bg-black/50 dark:bg-fgc-dark rounded-full flex items-center justify-center"
                                    >
                                        <Icon
                                            onClick={() =>
                                                setInfoMenuStatus(
                                                    !infoMenuStatus
                                                )
                                            }
                                            icon="pencil"
                                            className="h-6 w-6 text-white cursor-pointer dark:text-icon"
                                        />
                                    </div>
                                </Popover.Button>
                                {/* <Popover.Panel className="absolute group">
                                    {({ open }) => (
                                        <div
                                            className="absolute z-10 -translate-x-20 top-3 text-nowrap rounded-md bg-white dark:bg-bgc-dark dark:shadow-white/10 shadow-lg dark:drop-shadow-sm focus:outline-none after:absolute after:left-[63%] after:-top-4 after:h-0 after:w-0 after:translate-x-1/2 after:border-8 after:border-b-white after:group-hover:border-b-bgc-bgSelect after:dark:border-b-bgc-dark after:group-hover:dark:border-b-bgc-bgSelect after:border-l-transparent after:border-t-transparent after:border-r-transparent"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="menu-button"
                                        >
                                            <div className="relative">
                                                <div className="flex px-3 gap-2 py-2 text-xs cursor-pointer group-hover:bg-bgc-bgSelect group-hover:dark:bg-bgc-bgSelect group-hover:text-white group-hover:rounded-md">
                                                    Change background
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Popover.Panel> */}
                            </Popover>
                        </div>
                        {/* <div className="p-2.5">
                            <Icon icon="dots-vertical" className="" />
                        </div> */}
                    </div>
                    <div className="p-2.5">
                        <img
                            src={
                                coverImageUrl || ""
                                // import.meta.env
                                //     .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                // user?.coverImage
                            }
                            className="w-[100vh] md:w-[330px] h-[222px] rounded-tr-2xl rounded-tl-2xl"
                            alt=""
                        />
                        <div className="relative left-10 mx-auto top-3 w-9 h-9 bg-black/80 dark:bg-fgc-dark rounded-full flex justify-center items-center">
                            <Icon
                                icon="camera"
                                className="h-6 w-6 text-white cursor-pointer dark:text-icon"
                            />
                        </div>
                    </div>
                    <div className="-mt-24 flex flex-col items-center justify-center py-[18px] pt-0 border-b dark:border-border-dark">
                        <div className="flex flex-col gap-1">
                            <img
                                src={
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                    user?.profileImage
                                }
                                className="w-[110px] h-[110px] rounded-full top-6 ring-1 ring-border-dark"
                                alt="userImage"
                            />
                            <div className="flex flex-col items-center justify-center gap-1">
                                <div className="py-[2.50px] text-primary">
                                    Front End Developer
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green dark:bg-green"></span>
                                    <span>Active</span>
                                    <Popover className="relative">
                                        {({ open }) => {
                                            // eslint-disable-next-line react-hooks/rules-of-hooks
                                            useEffect(() => {
                                                if (status !== open) {
                                                    setStatus(open);
                                                }
                                            }, [open]);
                                            return (
                                                <>
                                                    <Popover.Button
                                                        className="outline-none"
                                                        onClick={() =>
                                                            setStatus(!status)
                                                        }
                                                    >
                                                        <Icon
                                                            icon="chevron-down"
                                                            className={`h-5 w-5 rounded-full text-text cursor-pointer dark:text-icon transition-transform duration-300 ease-in-out ${
                                                                status
                                                                    ? "rotate-180"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </Popover.Button>
                                                    <Popover.Panel className="absolute z-10 -ml-20 top-6 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                                        <MenuPopup
                                                            menuList={
                                                                SettingActiveMenuList
                                                            }
                                                        />
                                                    </Popover.Panel>
                                                </>
                                            );
                                        }}
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-screen w-full border-b border-border dark:border-border-dark">
                    <Scrollbars
                        className=""
                        autoHide
                        universal={true}
                        renderTrackVertical={(props) => (
                            <div {...props} className="track-vertical" />
                        )}
                        renderThumbVertical={(props) => (
                            <div {...props} className="thumb-vertical" />
                        )}
                    >
                        {downloadList.map((item, index) => (
                            <div key={"download-List_" + item.id}>
                                <div
                                    onClick={() => handleIconClick(item.name)}
                                    className="flex items-center justify-between px-5 py-3 border-b border-border dark:border-border-dark hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect cursor-pointer"
                                >
                                    <div className="flex gap-3">
                                        <Icon
                                            icon={item.icon}
                                            className="h-5 w-5 rounded-full text-text cursor-pointer dark:text-icon"
                                        />
                                        <span className="font-semibold">
                                            {item.name}
                                        </span>
                                    </div>
                                    <Icon
                                        icon="chevron-down"
                                        className={`h-5 w-5 rounded-full text-text cursor-pointer dark:text-icon transition-transform duration-300 ease-in-out ${
                                            openState === item.name
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </div>
                                {item.name === openState && (
                                    <div className="w-full md:w-[350px] flex flex-col px-8 pr-0 border-b dark:border-border-dark">
                                        {item.name === "Personal Info" &&
                                            user && (
                                                <PersonalInfo userItem={user} />
                                            )}
                                        {item.name === "Privacy" && <Privacy />}
                                        {item.name === "Themes" && (
                                            <ChangeTheme />
                                        )}
                                        {item.name === "Security" && (
                                            <Security />
                                        )}
                                        {item.name === "Help" && <Help />}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Scrollbars>
                </div>

                {/** Right SideBar Profile End*/}
            </div>

            <CoverImageModal
                activeItem={props.activeItem}
                setActiveItem={props.setActiveItem}
                openCreate={openCoverImagePopup}
                setOpenCreate={setopenCoverImagePopup}
                onCoverImageUpdate={handleCoverImageUpdate}
            />
        </>
    );
};
export default SettingSubSide;
