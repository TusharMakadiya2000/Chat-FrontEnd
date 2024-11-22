import React, { useRef, useState } from "react";
import Modal from "./layout/Modal";
import { classNames } from "./utils/classNames";
import Icon from "./utils/Icon";
import Scrollbars from "react-custom-scrollbars";
import { useAppState } from "./utils/useAppState";
import { IChat } from "./utils/types";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
type ContectModalProps = {
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
    chat?: IChat;
};

const ContectModal: React.FC<ContectModalProps> = ({
    openCreate,
    setOpenCreate,
    chat,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList, activeTab }, setAppState] = useAppState();
    const cancelButtonRef = useRef(null);
    const [search, setSearch] = useState("");
    const [selectedItems, setSelectedItems] = useState(new Set());
    const token = localStorage.getItem("token");
    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };
    const handleCheckboxChange = (item: any) => {
        setSelectedItems((prevSelectedItems: any) => {
            const updatedSelectedItems = new Set(prevSelectedItems);
            if (updatedSelectedItems.has(item)) {
                updatedSelectedItems.delete(item);
            } else {
                updatedSelectedItems.add(item);
            }
            return updatedSelectedItems;
        });
    };
    const sendMessage = async (selectedUser: any[]) => {
        let userInfo;
        if (token) {
            userInfo = jwtDecode<any>(token);
        }
        if (selectedUser.length > 0) {
            // Formate the receiver data
            const receiverData = selectedUser.map((user) => ({
                userId: user._id,
                name: user.name,
            }));

            const newMessage = {
                sender: {
                    userId: userInfo?.userId,
                    name: userInfo?.name,
                },
                receiver: receiverData,
                messageType: chat?.messageType,
                deliverType: chat?.deliverType,
                message: chat?.message,
                imagename: "Wallpaper",
                type: activeTab,
                isForwarded: true,
                refId: chat?._id,
                docname1: "user.png",
                docname2: "group.png",
                docname3: "natural.png",
                files: [],
            };

            try {
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/chats/send`,
                    { newMessage },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSelectedItems(new Set());
                setOpenCreate(false);
            } catch (error) {
                console.error("Error Forwarding message:", error);
            }
        }
    };

    const handleForward = () => {
        sendMessage(Array.from(selectedItems));
    };

    return (
        <Modal
            openModal={openCreate}
            setOpenModal={setOpenCreate}
            size={"500px"}
        >
            <React.Fragment>
                <div className="w-full md:w-[300px] bg-bgc dark:bg-bgc-dark rounded-md">
                    <div className="flex items-center justify-between text-sm px-3 md:px-5 py-2 md:py-[10.75px] rounded-tl-md rounded-tr-md dark:bg-fgc-dark bg-black/10  dark:text-text-dark">
                        <div>Contect List</div>
                        <button
                            autoFocus={true}
                            type="button"
                            className={classNames(
                                "dark:text-text-textSecondary",
                                "dark:text-darkPrimary"
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
                            <div className="flex flex-col w-full items-start justify-start px-3 md:px-5 py-2 md:py-3 gap-1">
                                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between py-[5.20px] px-2 border-[1px] border-border dark:border-border-dark">
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
                                                                className={`self-stretch flex flex-row cursor-pointer items-center justify-start py-2 px-3 md:px-5 gap-3 ${
                                                                    selectedItems.has(
                                                                        item
                                                                    )
                                                                        ? "bg-primary-tabbg dark:bg-bgc-bgSelect"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    handleCheckboxChange(
                                                                        item
                                                                    )
                                                                }
                                                                key={
                                                                    "userList_" +
                                                                    item._id
                                                                }
                                                            >
                                                                <div className="w-5 h-5 flex flex-row items-start justify-start relative">
                                                                    <input
                                                                        id={`checkbox-${item._id}`}
                                                                        name="Alex[]"
                                                                        value="check"
                                                                        type="checkbox"
                                                                        checked={selectedItems.has(
                                                                            item
                                                                        )}
                                                                        onChange={() =>
                                                                            handleCheckboxChange(
                                                                                item
                                                                            )
                                                                        }
                                                                        onClick={() =>
                                                                            handleCheckboxChange(
                                                                                item
                                                                            )
                                                                        }
                                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                                                                    />
                                                                    <span className="absolute text-primary transition-opacity opacity-0 pointer-events-none ml-[3px] mt-[3.5px] peer-checked:opacity-100">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-3.5 w-3.5"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                clipRule="evenodd"
                                                                            ></path>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                                <img
                                                                    src={
                                                                        import.meta
                                                                            .env
                                                                            .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                                                        item.profileImage
                                                                    }
                                                                    className="w-6 h-6 rounded-full"
                                                                    alt="userImage"
                                                                />
                                                                <div className="flex items-center justify-start dark:text-text-dark">
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </Scrollbars>
                                    </div>
                                    <div className="self-stretch overflow-hidden flex flex-row items-center justify-end py-2 md:py-3 px-5 gap-5 text-primary border-t-2 border-solid dark:border-border-dark">
                                        <button
                                            className="relative text-sm"
                                            onClick={() => {
                                                setOpenCreate(false);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <div
                                            onClick={handleForward}
                                            className="flex items-center cursor-pointer justify-center px-3 py-1.5 text-sm rounded-md bg-primary hover:bg-primary/80 duration-300 hover:scale-105 text-white dark:text-text-dark shadow-[0px_2px_6px_rgba(0,_0,_0,_0.25)]"
                                        >
                                            Forward Message
                                        </div>
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

export default ContectModal;
