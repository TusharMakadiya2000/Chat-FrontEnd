import React, { useRef, useState } from "react";
import Modal from "../layout/Modal";
import { classNames } from "../utils/classNames";
import Icon from "../utils/Icon";
import Scrollbars from "react-custom-scrollbars";
import { useAppState } from "../utils/useAppState";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode, JwtPayload } from "jwt-decode";
type CreateBroadcastPopupProps = {
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
};

interface UserIdJwtPayload extends JwtPayload {
    userId: string;
    email: string;
    name: string;
}

const CreateBroadcastPopup: React.FC<CreateBroadcastPopupProps> = ({
    openCreate,
    setOpenCreate,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList, broadcastList }, setAppState] = useAppState();
    const cancelButtonRef = useRef(null);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [broadCastName, setBroadCastName] = useState("");
    const theme = localStorage.getItem("theme") || "light";
    const token = localStorage.getItem("token");

    const handleCheckboxChange = (itemId: any) => {
        setSelectedItems((prevSelectedItems: any) => {
            const updatedSelectedItems = new Set(prevSelectedItems);
            if (updatedSelectedItems.has(itemId)) {
                updatedSelectedItems.delete(itemId);
            } else {
                updatedSelectedItems.add(itemId);
            }
            return updatedSelectedItems;
        });
    };

    let userInfo: any;
    if (token) {
        userInfo = jwtDecode<UserIdJwtPayload>(token);
    }

    const handleCreateBroadCast = async () => {
        const selectedUsers = userList
            .filter((user: any) => selectedItems.has(user._id))
            .map((user: any) => ({
                userId: user._id,
            }));

        if (selectedUsers.length > 101) {
            toast.error("Cannot create broadcast: Exceeds 101 user limit.", {
                theme: theme === "dark" ? "dark" : "light",
            });
            return;
        }

        const newBroadcast = {
            name: broadCastName,
            broadcastImage: "./group-images/nate-johnston-image.png",
            coverImage: "./general-images/vincentiu-solomon-image.png",
            chat: [],
            users: selectedUsers,
            createdBy: userInfo.userId,
        };

        try {
            // Send POST request to create a new broadcast
            const postResponse = await axios.post(
                "http://localhost:5000/api/broadcast",
                newBroadcast,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Check if the POST request was successful
            if (postResponse.status === 201) {
                toast.success("Broadcast created successfully!", {
                    theme: theme === "dark" ? "dark" : "light",
                });
            } else {
                toast.error("Failed to create broadcast.", {
                    theme: theme === "dark" ? "dark" : "light",
                });
                return;
            }

            // Fetch the updated list of broadcasts
            const broadcastData = await axios.get(
                "http://localhost:5000/api/broadcast",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update the state with the new list of broadcasts
            setAppState({ broadcastList: broadcastData.data });

            // Reset the form and close the popup
            setSelectedItems(new Set());
            setBroadCastName("");
            setOpenCreate(false);
        } catch (error: any) {
            // Handle specific error responses
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    toast.error(
                        `Bad Request: ${
                            data.error || "Invalid data provided."
                        }`,
                        {
                            theme: theme === "dark" ? "dark" : "light",
                        }
                    );
                } else if (status === 500) {
                    toast.error("Server Error: Please try again later.", {
                        theme: theme === "dark" ? "dark" : "light",
                    });
                } else {
                    toast.error(
                        `Error: ${
                            data.error || "An unexpected error occurred."
                        }`,
                        {
                            theme: theme === "dark" ? "dark" : "light",
                        }
                    );
                }
            } else {
                // Network or other errors
                console.error("Error creating broadcast:", error);
                toast.error(
                    "An unexpected error occurred. Please check the console for details.",
                    {
                        theme: theme === "dark" ? "dark" : "light",
                    }
                );
            }
        }
    };

    const handleCloseBroadCast = () => {
        setSelectedItems(new Set());
        setBroadCastName("");
        setOpenCreate(false);
    };

    return (
        <Modal
            openModal={openCreate}
            setOpenModal={setOpenCreate}
            size={"500px"}
        >
            <React.Fragment>
                <div className="w-full md:w-[500px] bg-bgc dark:bg-bgc-dark rounded-md">
                    <div className="flex items-center justify-between text-sm px-3 py-2.5 bg-black/5 border-b-2 border-border dark:border-border-dark font-semibold dark:text-text-dark">
                        <div>Create New Broadcast</div>
                        <button
                            autoFocus={true}
                            type="button"
                            className={classNames(
                                "dark:text-text-textSecondary"
                            )}
                            data-modal-toggle="defaultModal"
                            onClick={handleCloseBroadCast}
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
                        <div className="self-stretch flex flex-col items-start justify-start py-2 px-3 md:p-5 gap-3 md:gap-5">
                            <div className="flex flex-col w-full items-start justify-start gap-1">
                                <span className="dark:text-text-dark font-medium text-sm">
                                    Broadcast Name
                                </span>
                                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between py-1 px-2 border-[1px] border-border dark:border-border-dark">
                                    <input
                                        type="text"
                                        name="groupname"
                                        id="groupname"
                                        className="w-full flex relative overflow-auto outline-none dark:bg-bgc-dark dark:text-text-dark"
                                        placeholder="Type here..."
                                        value={broadCastName}
                                        onChange={(e) =>
                                            setBroadCastName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col items-start justify-start gap-1">
                                <div className="relative font-medium dark:text-text-dark">
                                    Select Members
                                </div>
                                <div className="self-stretch box-border h-[270px] flex flex-col items-start justify-start text-xs  border-[1px] border-solid border-border dark:border-border-dark">
                                    <div className="self-stretch h-screen flex-1 overflow-hidden flex flex-col items-start justify-start text-sm">
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
                                                {userList.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => (
                                                        <div
                                                            className={`self-stretch flex flex-row cursor-pointer items-center justify-start py-1.5 md:py-2 px-3 md:px-5 gap-3 ${
                                                                selectedItems.has(
                                                                    item._id
                                                                )
                                                                    ? "dark:bg-bgc-bgSelect bg-primary-tabbg"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                handleCheckboxChange(
                                                                    item._id
                                                                )
                                                            }
                                                            key={
                                                                "create-brodacast-userList_" +
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
                                                                        item._id
                                                                    )}
                                                                    onChange={() =>
                                                                        handleCheckboxChange(
                                                                            item._id
                                                                        )
                                                                    }
                                                                    onClick={() =>
                                                                        handleCheckboxChange(
                                                                            item._id
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
                                </div>
                            </div>
                            <div className="flex flex-col w-full items-start justify-start gap-1">
                                <div className="dark:text-text-dark font-medium text-sm">
                                    Description
                                </div>
                                <div className="self-stretch flex-1 rounded-lg flex flex-row items-center justify-between px-2 border border-border dark:border-border-dark">
                                    <textarea
                                        name="description"
                                        id="description"
                                        className="w-full flex relative overflow-auto h-9 md:h-12 outline-none dark:bg-bgc-dark dark:text-text-dark"
                                        placeholder="Type here..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch overflow-hidden flex flex-row items-center justify-end py-3 px-5 gap-5 text-primary border-t-2 border-solid dark:border-border-dark">
                            <button
                                className="relative text-sm"
                                onClick={handleCloseBroadCast}
                            >
                                Cancel
                            </button>
                            <div
                                className="flex items-center justify-center cursor-pointer px-3 py-1.5 text-sm rounded-md bg-primary hover:bg-primary/80 duration-300 hover:scale-105 dark:text-text-dark text-white shadow-[0px_2px_6px_rgba(0,_0,_0,_0.25)]"
                                onClick={handleCreateBroadCast}
                            >
                                Create Broadcast
                            </div>
                        </div>
                    </div>
                    {/* End popup content */}
                </div>
            </React.Fragment>
        </Modal>
    );
};

export default CreateBroadcastPopup;
