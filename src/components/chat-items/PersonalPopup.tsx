import React, { useRef, useState } from "react";
import Modal from "../layout/Modal";
import { classNames } from "../utils/classNames";
import Icon from "../utils/Icon";
import Scrollbars from "react-custom-scrollbars";
import { userItemType } from "../utils/types";
import { useAppState } from "../utils/useAppState";
type PersonalPopupProps = {
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
    activeItem?: userItemType;
    setActiveItem?: (item: userItemType) => void;
    userId: number;
};

const PersonalPopup: React.FC<PersonalPopupProps> = ({
    openCreate,
    setOpenCreate,
    activeItem,
    setActiveItem,
    userId,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList }, setAppState] = useAppState();
    const cancelButtonRef = useRef(null);
    const [search, setSearch] = useState("");

    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };

    const handleUserClick = (item: userItemType) => {
        if (setActiveItem) {
            setActiveItem(item);
        }
        setOpenCreate(false);
    };
    return (
        <Modal
            openModal={openCreate}
            setOpenModal={setOpenCreate}
            size={"500px"}
        >
            <React.Fragment>
                <div className="w-full md:w-[300px] lg:w-[300px] h-full md:h-[500px] lg:h-[500px] bg-bgc dark:bg-bgc-dark rounded-md">
                    <div className="flex items-center justify-between text-sm px-5 py-[10.75px] rounded-tl-md rounded-tr-md dark:bg-fgc-dark bg-black/5  dark:text-text-dark">
                        <div className="font-semibold">Search by Name</div>
                        <button
                            autoFocus={true}
                            type="button"
                            className={classNames(
                                "dark:text-text-textSecondary"
                            )}
                            data-modal-toggle="defaultModal"
                            onClick={() => {
                                setOpenCreate(false);
                            }}
                            ref={cancelButtonRef}
                        >
                            <Icon
                                icon="x"
                                className="h-5 w-5 dark:text-icon"
                                aria-hidden="true"
                            ></Icon>
                        </button>
                    </div>

                    {/* Start popup content */}
                    <div className="overflow-hidden flex flex-col items-center justify-start">
                        <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="flex flex-col w-full items-start justify-start px-5 py-2 md:py-3 gap-1">
                                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between py-[5.20px] px-2 border-[1px] dark:border-border-dark">
                                    <input
                                        type="text"
                                        name="searchuser"
                                        id="searchuser"
                                        className="w-full flex relative overflow-auto outline-none dark:bg-bgc-dark dark:text-text-dark"
                                        placeholder="Search here..."
                                        onChange={handleSearchChange}
                                    />
                                    <Icon
                                        icon="search"
                                        className="h-5 w-5 cursor-pointer dark:text-icon-primary"
                                    />
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col items-start justify-start gap-1">
                                <div className="self-stretch h-[380px] flex flex-col items-start justify-start text-xs">
                                    <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-start text-sm">
                                        <Scrollbars
                                            className=""
                                            autoHide
                                            universal={true}
                                            renderTrackVertical={(props) => (
                                                <div
                                                    {...props}
                                                    className="track-vertical"
                                                />
                                            )}
                                            renderThumbVertical={(props) => (
                                                <div
                                                    {...props}
                                                    className="thumb-vertical"
                                                />
                                            )}
                                        >
                                            <div className="divide-y divide-border dark:divide-border-dark">
                                                {userList
                                                    .filter(
                                                        (item: any) =>
                                                            item.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    search
                                                                ) ||
                                                            search === ""
                                                    )
                                                    .map(
                                                        (
                                                            item: any,
                                                            index: number
                                                        ) => (
                                                            <div
                                                                onClick={() =>
                                                                    handleUserClick(
                                                                        item
                                                                    )
                                                                }
                                                                className={`self-stretch flex flex-row items-center justify-between cursor-pointer py-1.5 md:py-2 px-3 md:px-5 gap-3 hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect`}
                                                                key={
                                                                    "personalPopup-user-List_" +
                                                                    item.id
                                                                }
                                                            >
                                                                <div className="flex gap-1 items-center justify-center">
                                                                    <img
                                                                        src={
                                                                            item.image
                                                                        }
                                                                        className="w-6 h-6 rounded-full"
                                                                        alt="userImage"
                                                                    />
                                                                    <div className=" dark:text-text-dark">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <Icon
                                                                    icon="plus"
                                                                    className="h-5 w-5 cursor-pointer dark:text-icon"
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End popup content */}
                </div>
            </React.Fragment>
        </Modal>
    );
};

export default PersonalPopup;
