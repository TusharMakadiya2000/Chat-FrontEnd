import React, { useRef } from "react";
import Modal from "./layout/Modal";
import { classNames } from "./utils/classNames";
import Icon from "./utils/Icon";
import Scrollbars from "react-custom-scrollbars";
import { useAppState } from "./utils/useAppState";
type SendMessagePopupProps = {
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
};

const SendMessagePopup: React.FC<SendMessagePopupProps> = ({
    openCreate,
    setOpenCreate,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList }, setAppState] = useAppState();
    const cancelButtonRef = useRef(null);
    return (
        <Modal
            openModal={openCreate}
            setOpenModal={setOpenCreate}
            size={"500px"}
        >
            <React.Fragment>
                <div className="w-[300px] dark:bg-bgc-dark rounded-md">
                    <div className="flex items-center justify-between text-sm px-5 py-[10.75px] rounded-tl-md rounded-tr-md dark:bg-fgc-dark  dark:text-text-dark">
                        <div>Search by Name</div>
                        <button
                            autoFocus={true}
                            type="button"
                            className={classNames(
                                "dark:text-text-textSecondary",
                                "hover:text-gray-500 dark:text-darkPrimary"
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
                    <div className=" overflow-hidden flex flex-col items-center justify-start">
                        <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="flex flex-col w-full items-start justify-start px-5 py-3 gap-1">
                                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between py-[5.20px] px-2 border-[1px] dark:border-border-dark">
                                    <input
                                        type="text"
                                        name="searchuser"
                                        id="searchuser"
                                        className="w-full flex relative overflow-auto outline-none dark:bg-bgc-dark dark:text-text-dark"
                                        placeholder="Search here..."
                                    />
                                    <Icon
                                        icon="search"
                                        className="h-5 w-5 cursor-pointer dark:text-icon-primary"
                                    />
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col items-start justify-start gap-1">
                                <div className="self-stretch h-[270px] flex flex-col items-start justify-start text-xs">
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
                                            {userList.map(
                                                (item: any, index: number) => (
                                                    <div
                                                        className={`self-stretch flex flex-row items-center justify-between py-2 px-5 gap-3 border-b-[1px] border-solid dark:border-border-dark `}
                                                        key={"user_List_"+item.id}
                                                    >
                                                        <div className="flex gap-1 items-center justify-center">
                                                            <img
                                                                src={`./images/${item.image}`}
                                                                className="w-6 h-6 rounded-full"
                                                                alt="userImage"
                                                            />
                                                            <div className=" dark:text-text-dark">
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        <Icon
                                                            icon="plus"
                                                            className="h-5 w-5 cursor-pointer dark:text-icon"
                                                        />
                                                    </div>
                                                )
                                            )}
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

export default SendMessagePopup;
