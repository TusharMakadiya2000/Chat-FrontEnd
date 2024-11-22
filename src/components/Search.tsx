import Icon from "./utils/Icon";

const Search = () => {
    return (
        <>
            <div
                className="absolute right-0 z-10 mt-10 w-80 mr-72
                rounded-md bg-border dark:bg-bgc-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div className="self-stretch flex flex-row items-start justify-between">
                    <div className="self-stretch flex-1 rounded-md flex flex-row items-center justify-between py-3 px-5 border-[1px] dark:border-border-dark">
                        <input
                            className="flex-1 relative overflow-auto outline-none bg-border dark:bg-bgc-dark"
                            placeholder=" Search here..."
                        />

                        <Icon
                            icon="search"
                            className="h-6 w-6 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
