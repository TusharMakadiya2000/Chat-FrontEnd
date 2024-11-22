import { useEffect, useState } from "react";
import AllContact from "./contact-items/AllContact";
import FavoriteContact from "./contact-items/FavoriteContact";
import BlockedContact from "./contact-items/BlockedContact";

const ContactSideMenu = (props: any) => {
    const [activeTab, setActiveTab] = useState<string>("all");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    return (
        <>
            <div className="self-stretch rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md sm:rounded-tl-md sm:rounded-tr-md sm:rounded-br-md sm:rounded-bl-md md:rounded-tl-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-md lg:rounded-tl-md lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-md bg-white dark:bg-bgc-dark w-full sm:w-full md:w-[350px] lg:w-[350px] overflow-hidden shrink-0 flex flex-col items-center justify-start">
                <div className="box-border w-full flex flex-row items-center justify-start py-2 md:py-[11.60px] px-5 gap-5 text-lg border-b-[1px] dark:border-border-dark">
                    <div className="flex-1 relative font-semibold">Contact</div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-between text-center">
                    <div
                        onClick={() => setActiveTab("all")}
                        className={`flex-1 flex flex-row cursor-pointer items-center justify-between p-[9.2px] px-0 text-blue border-b-[2px]  ${
                            activeTab === "all"
                                ? "border-primary bg-primary-tabbg dark:bg-bgc-bgSelect dark:text-textSecondary-dark"
                                : "border-border dark:border-border-dark dark:text-text-dark hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect hover:text-textSecondary-dark hover:dark:text-textSecondary-dark"
                        }`}
                    >
                        <button className="flex-1 relative font-semibold">
                            All
                        </button>
                    </div>
                    <div
                        onClick={() => setActiveTab("favorites")}
                        className={`flex-1 flex flex-row cursor-pointer items-center justify-between p-[9.2px] px-0 text-blue border-b-[2px] ${
                            activeTab === "favorites"
                                ? "border-primary bg-primary-tabbg dark:bg-bgc-bgSelect dark:text-textSecondary-dark"
                                : "border-border dark:border-border-dark dark:text-text-dark hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect hover:text-textSecondary-dark hover:dark:text-textSecondary-dark"
                        }`}
                    >
                        <button className="flex-1 relative font-semibold">
                            Favorites
                        </button>
                    </div>
                    <div
                        onClick={() => setActiveTab("blocked")}
                        className={`flex-1 flex flex-row cursor-pointer items-center justify-between p-[9.2px] px-0 text-blue border-b-[2px] ${
                            activeTab === "blocked"
                                ? "border-primary bg-primary-tabbg dark:bg-bgc-bgSelect dark:text-textSecondary-dark"
                                : "border-border dark:border-border-dark dark:text-text-dark hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect hover:text-textSecondary-dark hover:dark:text-textSecondary-dark"
                        }`}
                    >
                        <button className="flex-1 relative font-semibold">
                            Blocked
                        </button>
                    </div>
                </div>
                {/** Call SearchBar Start */}
                {activeTab === "all" && (
                    <AllContact
                        activeItem={props.activeItem}
                        setActiveItem={props.setActiveItem}
                        userId={props.userId}
                    />
                )}
                {activeTab === "favorites" && (
                    <FavoriteContact
                        activeItem={props.activeItem}
                        setActiveItem={props.setActiveItem}
                        userId={props.userId}
                    />
                )}
                {activeTab === "blocked" && (
                    <BlockedContact
                        activeItem={props.activeItem}
                        setActiveItem={props.setActiveItem}
                        userId={props.userId}
                    />
                )}
            </div>
        </>
    );
};

export default ContactSideMenu;
