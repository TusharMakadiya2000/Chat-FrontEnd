import React, { useRef, useState } from "react";
import Modal from "../layout/Modal";
import { classNames } from "../utils/classNames";
import Icon from "../utils/Icon";
import Scrollbars from "react-custom-scrollbars";
import { useAppState } from "../utils/useAppState";
import { userItemType } from "../utils/types";
import axios from "axios";
import { toast } from "react-toastify";

type ContectModalProps = {
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
    activeItem?: userItemType;
    setActiveItem?: (item: userItemType) => void;
    userId: number;
};

const ContectModal: React.FC<ContectModalProps> = ({
    openCreate,
    setOpenCreate,
    activeItem,
    setActiveItem,
    userId,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ userList, groupList, broadcastList }, setAppState] = useAppState();
    const cancelButtonRef = useRef(null);
    const [search, setSearch] = useState("");
    const [selectedItems, setSelectedItems] = useState(new Set());
    const theme = localStorage.getItem("theme") || "light";
    const token = localStorage.getItem("token");

    /* ------------------ Start: Search User ------------------ */
    const handleSearchChange = (e: any) => {
        const searchText = e.target.value.toLowerCase();
        setTimeout(() => {
            setSearch(searchText);
        }, 1500);
    };
    /* ------------------ End: Search User ------------------ */

    /* ------------------ Start: userList Set in setSelectedItems ------------------ */

    const handleContactClick = (contact: any) => {
        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = new Set(prevSelectedItems);
            if (newSelectedItems.has(contact._id)) {
                newSelectedItems.delete(contact._id);
            } else {
                newSelectedItems.add(contact._id);
            }
            return newSelectedItems;
        });
    };

    /* ------------------ End: userList Set in setSelectedItems ------------------ */

    /* ------------------ Start: Show that user is not in group Member  ------------------ */

    const activeItemId = localStorage.getItem("activeItemId");
    const activTab = localStorage.getItem("activeTab");
    let filterUserData = [];
    if (activTab === "group") {
        if (activeItemId) {
            // const activeGroupId = parseInt(activeItemId);
            const activGroup = groupList.find(
                (group: any) => group._id === activeItemId
            );
            if (activGroup && activGroup.users) {
                const groupUserIds = activGroup.users.map(
                    (user: any) => user.userId
                );
                filterUserData = userList.filter(
                    (user: any) => !groupUserIds.includes(user._id)
                );
            } else {
                filterUserData = userList;
            }
        }
    } else if (activTab === "broadcast") {
        if (activeItemId) {
            // const activeGroupId = parseInt(activeItemId);
            const activBroadcast = broadcastList.find(
                (broadcast: any) => broadcast._id === activeItemId
            );

            if (activBroadcast && activBroadcast.users) {
                const BroadcastUserIds = activBroadcast.users.map(
                    (user: any) => user.userId
                );
                filterUserData = userList.filter(
                    (user: any) => !BroadcastUserIds.includes(user._id)
                );
            }
        }
    }

    /* ------------------ End: Show that user is not in group Member  ------------------ */

    /* ------------------ Start: Add user in Group Member  ------------------ */

    const handleAddUser = async () => {
        setSelectedItems(new Set());
        if (activTab === "group") {
            if (activeItemId === null) {
                console.error("No activeItemId found in localStorage.");
                return;
            }

            const selectedUsers = userList.filter((user: any) =>
                selectedItems.has(user._id)
            );
            const newUserListItems = selectedUsers.map((user: any) => {
                return { userId: user._id, role: "user" };
            });
            try {
                await axios.put(
                    `http://localhost:5000/api/groups/${activeItemId}/users`,
                    { users: newUserListItems },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const groupData = await axios.get(
                    "http://localhost:5000/api/groups",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAppState({ groupList: groupData.data });
                toast.success("Selected user add in group", {
                    theme: theme === "dark" ? "dark" : "light",
                });
                setOpenCreate(false);
            } catch (error: any) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    const errorMessage = error.response.data.error;

                    // Check if the error is related to the user limit
                    if (
                        errorMessage.includes("cannot have more than 151 users")
                    ) {
                        toast.error(
                            "Cannot add users: group limit of 151 users reached.",
                            {
                                theme: theme === "dark" ? "dark" : "light",
                            }
                        );
                    } else {
                        toast.error(`Error updating group: ${errorMessage}`, {
                            theme: theme === "dark" ? "dark" : "light",
                        });
                    }
                } else {
                    console.error("Error updating group:", error);
                    toast.error("An unexpected error occurred.", {
                        theme: theme === "dark" ? "dark" : "light",
                    });
                }
            }

            setOpenCreate(false);
        } else if (activTab === "broadcast") {
            if (activeItemId === null) {
                console.error("No activeItemId found in localStorage.");
                return;
            }

            const selectedUsers = userList.filter((user: any) =>
                selectedItems.has(user._id)
            );
            const newBroadcastListItems = selectedUsers.map((user: any) => {
                return { userId: user._id };
            });

            try {
                await axios.put(
                    `http://localhost:5000/api/broadcast/${activeItemId}/users`,
                    { users: newBroadcastListItems },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const broadcastData = await axios.get(
                    "http://localhost:5000/api/broadcast",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAppState({ broadcastList: broadcastData.data });
                toast.success("Selected user add in broadcast", {
                    theme: theme === "dark" ? "dark" : "light",
                });
                setOpenCreate(false);
            } catch (error: any) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    const errorMessage = error.response.data.error;

                    // Check if the error is related to the user limit
                    if (
                        errorMessage.includes("cannot have more than 101 users")
                    ) {
                        toast.error(
                            "Cannot add users: Broadcast limit of 101 users reached.",
                            {
                                theme: theme === "dark" ? "dark" : "light",
                            }
                        );
                    } else {
                        toast.error(
                            `Error updating broadcast: ${errorMessage}`,
                            {
                                theme: theme === "dark" ? "dark" : "light",
                            }
                        );
                    }
                } else {
                    console.error("Error updating broadcast:", error);
                    toast.error("An unexpected error occurred.", {
                        theme: theme === "dark" ? "dark" : "light",
                    });
                }
            }
        }
    };

    /* ------------------ End: Add user in Group Member  ------------------ */
    const handleCloseGroup = () => {
        setSelectedItems(new Set());
        setOpenCreate(false);
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
                <div
                    className={`w-full h-full bg-bgc dark:bg-bgc-dark rounded-md ${
                        activTab === "personal"
                            ? "md:w-[300px] md:h-[485px]"
                            : "md:w-[300px] md:h-[535px]"
                    }`}
                >
                    <div className="flex items-center justify-between text-sm px-5 py-[10.75px] rounded-tl-md rounded-tr-md bg-black/5 dark:bg-fgc-dark dark:text-text-dark">
                        <div className="dark:text-text-dark text-text font-semibold">
                            Contact List
                        </div>
                        <button
                            autoFocus={true}
                            type="button"
                            className={classNames(
                                "dark:text-text-textSecondary"
                            )}
                            data-modal-toggle="defaultModal"
                            onClick={handleCloseGroup}
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
                                                {activTab === "personal"
                                                    ? userList
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
                                                                          item._id
                                                                      }
                                                                  >
                                                                      <div className="flex gap-1 items-center justify-center">
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
                                                          )
                                                    : filterUserData
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
                                                                      className={`self-stretch flex flex-row items-center justify-between cursor-pointer py-2 px-3 md:px-5 gap-3 hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect ${
                                                                          selectedItems.has(
                                                                              item._id
                                                                          )
                                                                              ? "bg-primary-tabbg dark:bg-bgc-bgSelect"
                                                                              : ""
                                                                      }`}
                                                                      key={
                                                                          "Contact-UserList_" +
                                                                          item._id
                                                                      }
                                                                      onClick={() =>
                                                                          handleContactClick(
                                                                              item
                                                                          )
                                                                      }
                                                                  >
                                                                      <div className="flex gap-1 items-center justify-center">
                                                                          <img
                                                                              src={
                                                                                  import.meta
                                                                                      .env
                                                                                      .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                                                                  item.profileImage
                                                                              }
                                                                              className="w-6 h-6 rounded-full"
                                                                              alt=""
                                                                          />
                                                                          <div className="dark:text-text-dark">
                                                                              {
                                                                                  item.name
                                                                              }
                                                                          </div>
                                                                      </div>
                                                                      <Icon
                                                                          icon="plus"
                                                                          className="h-5 w-5 dark:text-icon text-text"
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
                    {activTab !== "personal" ? (
                        <div className="self-stretch overflow-hidden flex flex-row items-center justify-end py-1.5 md:py-2 px-5 gap-5 text-primary border-t-2 border-solid border-border dark:border-border-dark">
                            <button
                                className="relative text-sm"
                                onClick={handleCloseGroup}
                            >
                                Cancel
                            </button>
                            <div
                                className="flex cursor-pointer items-center justify-center px-3 py-1.5 text-sm rounded-md bg-primary hover:bg-primary/80 duration-300 hover:scale-105 dark:text-text-dark text-white shadow-[0px_2px_6px_rgba(0,_0,_0,_0.25)]"
                                onClick={handleAddUser}
                            >
                                Add
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* End popup content */}
                </div>
            </React.Fragment>
        </Modal>
    );
};

export default ContectModal;
