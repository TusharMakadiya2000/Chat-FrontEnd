import { Scrollbars } from "react-custom-scrollbars";
import SubSideCallItem from "./call-items/SubSideCallItem";
import Icon from "./utils/Icon";
import CallListProvider from "../components/CallHistoryList";
import { useEffect, useState } from "react";

const SubSideMenuCall = (props: any) => {
    const { callList } = CallListProvider();

    useEffect(() => {
        if (props.activeItem?.id) {
            localStorage.setItem(
                "activeItemId",
                props.activeItem.id.toString()
            );
        }
    }, [props.activeItem?.id]);

    useEffect(() => {
        const activeUserId = localStorage.getItem("activeItemId");

        if (activeUserId && props.setActiveItem) {
            const activeItemData = callList.find(
                (user: any) => user.id === parseInt(activeUserId)
            );
            if (activeItemData) {
                props.setActiveItem(activeItemData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.setActiveItem]);

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
    return (
        <>
            <div className="self-stretch rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md sm:rounded-tl-md sm:rounded-tr-md sm:rounded-br-md sm:rounded-bl-md md:rounded-tl-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-md lg:rounded-tl-md lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-md bg-white dark:bg-bgc-dark w-full sm:w-full md:w-[350px] lg:w-[350px] overflow-hidden shrink-0 flex flex-col items-center justify-start">
                <div className="w-full flex flex-row items-center justify-start text-lg border-b-[1px] border-border dark:border-border-dark">
                    <div className="flex-1 relative px-5 py-2 md:py-3 font-semibold">
                        Call
                    </div>
                </div>
                {/** Call SearchBar Start */}
                <div className="self-stretch flex flex-row items-start justify-between px-5 py-2 md:py-3">
                    <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between h-9 px-2 py-2.5 border-[1px] border-border dark:border-border-dark">
                        <input
                            id="call-search-input"
                            className="flex-1 relative overflow-auto outline-none dark:bg-bgc-dark dark:text-text-dark"
                            placeholder=" Search here..."
                            onChange={handleSearchChange}
                        />

                        <Icon
                            icon="search"
                            className="h-5 w-5 cursor-pointer dark:text-icon"
                        />
                    </div>
                </div>
                {/** Call SearchBar End */}

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
                        {/* <CustomScroll heightRelativeToParent="100%"> */}

                        {/*User Item -Chat*/}
                        {callList
                            .filter(
                                (item: any) =>
                                    item.name.toLowerCase().includes(search) ||
                                    search === ""
                            )
                            .map((item: any, index: number) => (
                                <SubSideCallItem
                                    key={"callList" + item.id}
                                    userItem={item}
                                    activeItem={props.activeItem}
                                    setActiveItem={props.setActiveItem}
                                    userId={props.userId}
                                />
                            ))}

                        {/*User Item -Chat*/}
                    </Scrollbars>
                    {/* </CustomScroll> */}
                </div>
            </div>
        </>
    );
};

export default SubSideMenuCall;
