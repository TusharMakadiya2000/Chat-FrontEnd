import { Scrollbars } from "react-custom-scrollbars";
import { useState } from "react";
import ContactItem from "./ContactItem";
import Icon from "../utils/Icon";
import { useAppState } from "../utils/useAppState";

const FavoriteContact = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTab, setActiveTab] = useState<string>("favorites");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList }, setAppState] = useAppState();
    const [search, setSearch] = useState("");
    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };

    return (
        <>
            <div className="self-stretch flex flex-row items-start justify-between py-2 md:py-3 px-5">
                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between h-9 px-2 py-2.5 border-[1px] dark:border-border-dark">
                    <input
                        id="favoriteContact-search-input"
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
                    {/* <CustomScroll heightRelativeToParent="100%"> */}

                    {/*User Item -Chat*/}
                    {userList
                        .filter(
                            (item: any) =>
                                item.name.toLowerCase().includes(search) ||
                                search === ""
                        )
                        .map((item: any, index: number) => (
                            <ContactItem
                                key={"FavoriteContect-User-List_" + item._id}
                                userItem={item}
                                activeItem={props.activeItem}
                                setActiveItem={props.setActiveItem}
                                userId={props.userId}
                                activeTab={activeTab}
                            />
                        ))}

                    {/*User Item -Chat*/}
                </Scrollbars>
                {/* </CustomScroll> */}
            </div>
        </>
    );
};

export default FavoriteContact;
