import Icon from "./utils/Icon";
import Scrollbars from "react-custom-scrollbars";
import SubSideSavedItem from "./saved-items/SubSideSavedItem";
import { useEffect, useState } from "react";

const SubSideSavedMenu = (props: any) => {
    const [search, setSearch] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };
    const userList = [
        {
            id: 1,
            name: "image.png",
            size: "1.3mb",
            icon: "dots-vertical",
            image: "document-text",
        },
        {
            id: 2,
            name: "image.png",
            size: "4.7mb",
            icon: "dots-vertical",
            image: "document-text",
        },
        {
            id: 3,
            name: "image.png",
            size: "6.1mb",
            icon: "dots-vertical",
            image: "document-text",
        },
        {
            id: 4,
            name: "image.png",
            size: "3.10mb",
            icon: "dots-vertical",
            image: "document-text",
        },
        {
            id: 5,
            name: "image.png",
            size: "5.2mb",
            icon: "dots-vertical",
            image: "document-text",
        },
        {
            id: 6,
            name: "image.png",
            size: "2.4mb",
            icon: "dots-vertical",
            image: "document-text",
        },
        {
            id: 7,
            name: "image.png",
            size: "3.6mb",
            icon: "dots-vertical",
            image: "document-text",
        },
        {
            id: 8,
            name: "image.png",
            size: "3.0mb",
            icon: "dots-vertical",
            image: "document-text",
        },
    ];

    return (
        <>
            <div className="self-stretch rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md sm:rounded-tl-md sm:rounded-tr-md sm:rounded-br-md sm:rounded-bl-md md:rounded-tl-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-md lg:rounded-tl-md lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-md bg-white dark:bg-bgc-dark w-full sm:w-full md:w-[350px] lg:w-[350px] overflow-hidden shrink-0 flex flex-col items-center justify-start">
                <div className="box-border w-full flex flex-row items-center text-lg px-5 border-b-[1px] border-border dark:border-border-dark">
                    <div className="flex-1 dark:text-text-dark font-semibold text-lg py-2 md:py-[11.6px]">
                        Saved
                    </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-between px-5 py-2 md:py-3">
                    <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between h-9 px-2 py-2.5 border-[1px] border-border dark:border-border-dark">
                        <input
                            id="saved-search-input"
                            className="flex-1 relative overflow-auto outline-none dark:bg-bgc-dark dark:text-text-dark"
                            placeholder=" Search here..."
                            onChange={handleSearchChange}
                        />

                        <Icon
                            icon="search"
                            className="h-5 w-5 cursor-pointer dark:text-icon-primary"
                        />
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
                        {userList
                            .filter(
                                (item: any) =>
                                    item.name.toLowerCase().includes(search) ||
                                    search === ""
                            )
                            .map((item: any, index: number) => (
                                <SubSideSavedItem
                                    key={"user-list_" + index}
                                    item={item}
                                />
                            ))}
                    </Scrollbars>
                </div>
            </div>
        </>
    );
};

export default SubSideSavedMenu;
