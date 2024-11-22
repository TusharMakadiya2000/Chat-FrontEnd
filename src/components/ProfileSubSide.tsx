import { Scrollbars } from "react-custom-scrollbars";
import { Fragment, useEffect, useState } from "react";
import Icon from "./utils/Icon";
import MenuList from "./MenuList";
import MenuPopup from "./MenuPopup";
import { Popover, Transition } from "@headlessui/react";
import useAuthUser from "./useAuthUser";

interface IMainContentProps {
    activeItem: any;
    setActiveItem: (item: any) => void;
    userId: number;
}

export const ProfileSubSide = (props: IMainContentProps) => {
    const [infoMenuStatus, setInfoMenuStatus] = useState(false);
    const [infodotstatus, setInfodotstatus] = useState(false);
    const { profileMenuList, profileDotMenuList } = MenuList();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useState("light");

    // get login user Info.
    const user = useAuthUser();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    const downloadList = [
        {
            id: 1,
            name: "image.png",
            size: "1.3mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
        {
            id: 2,
            name: "image.png",
            size: "4.7mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
        {
            id: 3,
            name: "image.png",
            size: "6.1mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
        {
            id: 4,
            name: "image.png",
            size: "3.10mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
        {
            id: 5,
            name: "image.png",
            size: "5.2mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
        {
            id: 6,
            name: "image.png",
            size: "2.4mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
        {
            id: 7,
            name: "image.png",
            size: "3.6mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
        {
            id: 8,
            name: "image.png",
            size: "3.0mb",
            icon: "dots-vertical",
            icon1: "download",
            image: "document-text",
        },
    ];

    return (
        <div className="self-stretch rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md sm:rounded-tl-md sm:rounded-tr-md sm:rounded-br-md sm:rounded-bl-md md:rounded-tl-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-md lg:rounded-tl-md lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-md bg-white dark:bg-bgc-dark w-full sm:w-full md:w-[350px] lg:w-[350px] overflow-hidden shrink-0 flex flex-col items-center justify-start">
            <div className="relative">
                <div className="w-full flex flex-row items-center justify-between absolute p-3">
                    <div className="p-2.5 font-semibold text-lg">
                        My Profile
                    </div>
                    <div className="p-2.5">
                        <Popover className="relative">
                            <Popover.Button className="outline-none">
                                <Icon
                                    onClick={() =>
                                        setInfoMenuStatus(!infoMenuStatus)
                                    }
                                    icon="menu"
                                    className="h-6 w-6 dark:text-icon text-text cursor-pointer"
                                />
                            </Popover.Button>
                            <Popover.Panel className="absolute z-10 -ml-24 top-7 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                {({ open }) => (
                                    <>
                                        <MenuPopup menuList={profileMenuList} />
                                    </>
                                )}
                            </Popover.Panel>
                        </Popover>
                    </div>
                    {/* <div className="p-2.5">
                            <Icon icon="dots-vertical" className="" />
                        </div> */}
                </div>
                <div className="p-2.5">
                    <img
                        src={
                            import.meta.env
                                .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                            user?.coverImage
                        }
                        className="w-[100vh] md:w-[330px] h-[222px] rounded-tr-lg rounded-tl-lg"
                        alt=""
                    />
                </div>
                <div className="-mt-16 flex flex-col items-center justify-center py-5 pt-0 border-b dark:border-border-dark">
                    <img
                        src={
                            import.meta.env
                                .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                            user?.profileImage
                        }
                        className="w-[110px] h-[110px] rounded-full top-6"
                        alt=""
                    />
                    <div className="flex flex-row items-center justify-center gap-1">
                        <div className="py-[2.50px] pb-0 text-primary">
                            Front End Developer
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-2 gap-2 border-b dark:border-border-dark">
                    <div className="flex items-center px-5 gap-5">
                        <Icon
                            icon="user"
                            className="h-6 w-6 text-text cursor-pointer dark:text-icon"
                        />
                        <span>{user?.name}</span>
                    </div>
                    <div className="flex items-center px-5 gap-5">
                        <Icon
                            icon="mail"
                            className="h-6 w-6 text-text cursor-pointer dark:text-icon"
                        />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center px-5 gap-5">
                        <Icon
                            icon="location-marker"
                            className="h-6 w-6 text-text cursor-pointer dark:text-icon"
                        />
                        <span>California, USA</span>
                    </div>
                </div>
            </div>
            <div className="relative h-screen flex-row self-stretch w-full overflow-y-auto">
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
                    <div className="flex flex-col px-5 py-2 gap-1 border-b dark:border-border-dark">
                        <div className="flex justify-between">
                            <span className="font-medium">Media</span>
                            <span className="text-textSecondary-dark dark:text-textSecondary-dark">
                                Show all
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <div className="">
                                <img
                                    src="./general-images/brynden-image.png"
                                    className="w-24 h-24 rounded"
                                    alt="userImage"
                                />
                            </div>
                            <div className="">
                                <img
                                    src="./general-images/nina-plobner-image.png"
                                    className="w-24 h-24 rounded"
                                    alt="userImage"
                                />
                            </div>
                            <div className="">
                                <img
                                    src="./general-images/vincentiu-solomon-image.png"
                                    className="w-24 h-24 rounded"
                                    alt="userImage"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <span className="font-medium px-5">Attach file</span>

                        {downloadList.map((item) => (
                            <div
                                key={"downloadList_" + item.id}
                                className="md:w-[350px] flex flex-row items-start justify-start"
                            >
                                <div
                                    className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-2 hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect border-b border-border dark:border-border-dark `}
                                >
                                    <div className="h-[42px] w-[42px] flex flex-col items-center justify-center relative">
                                        <Icon
                                            icon={item.image}
                                            className="h-[28px] w-[28px] cursor-pointer dark:text-icon-primary"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-row items-start justify-start">
                                        <div className="self-stretch flex flex-col items-start justify-start">
                                            <div className="flex-1 relative">
                                                <h1 className="dark:text-text-dark text-sm font-semibold">
                                                    {item.name}
                                                </h1>
                                            </div>
                                            <div className="self-stretch flex flex-row items-center justify-start gap-2.5 text-xs ">
                                                <div className="flex-1 relative dark:text-text-textSecondary text-xs">
                                                    {item.size}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Icon
                                            icon={item.icon1}
                                            className="h-6 w-6 cursor-pointer dark:text-icon"
                                        />

                                        <Popover className="relative">
                                            <>
                                                <Popover.Button className="inline-flex outline-none items-center gap-x-1 text-sm font-semibold leading-6">
                                                    <div>
                                                        <Icon
                                                            onClick={() =>
                                                                setInfodotstatus(
                                                                    !infodotstatus
                                                                )
                                                            }
                                                            icon={item.icon}
                                                            className="h-6 w-6 cursor-pointer dark:text-icon"
                                                        />
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
                                                    <Popover.Panel className="absolute z-10 -ml-24 top-7 w-[110px] bg-white dark:bg-fgc-dark rounded-md">
                                                        {({ open }) => (
                                                            <>
                                                                <MenuPopup
                                                                    menuList={
                                                                        profileDotMenuList
                                                                    }
                                                                />
                                                            </>
                                                        )}
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Scrollbars>
            </div>

            {/** Right SideBar Profile End*/}
        </div>
    );
};
export default ProfileSubSide;
