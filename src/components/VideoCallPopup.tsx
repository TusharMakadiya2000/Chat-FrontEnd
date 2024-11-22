import React, { useRef } from "react";
import Modal from "./layout/Modal";
import { classNames } from "./utils/classNames";
import Icon from "./utils/Icon";

type VideoCallPopupProps = {
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
};

const VideoCallPopup: React.FC<VideoCallPopupProps> = ({
    openCreate,
    setOpenCreate,
}) => {
    const cancelButtonRef = useRef(null);

    return (
        <Modal openModal={openCreate} setOpenModal={setOpenCreate} size={"sm"}>
            <React.Fragment>
                <div className="p-5 dark:bg-bgc-dark border-b dark:border-border-dark">
                    <div className="text-lg font-medium dark:text-white">
                        Create New Group
                        <button
                            autoFocus={true}
                            type="button"
                            className={classNames(
                                "float-right",
                                "text-gray-400",
                                "hover:text-gray-500 dark:text-darkPrimary"
                            )}
                            data-modal-toggle="defaultModal"
                            onClick={() => {
                                setOpenCreate(false);
                            }}
                            ref={cancelButtonRef}
                        >
                            <Icon
                                icon="x-mark"
                                className="h-6 w-6 cursor-pointer"
                            />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-darkSecondary">
                        Choose a users to create new group.
                    </div>
                </div>
                {/* Start VideoCall popup content */}
                <div className="flex flex-col items-center justify-start dark:bg-fgc-dark px-20">
                    <div className=" flex-1 flex flex-row items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className="py-5 pb-0 grid-rows-1 items-center justify-center ">
                                <img
                                    src="./images/avatar-male.svg"
                                    className="w-40 h-32 ml-1"
                                    alt="avatar-male"
                                />
                            </div>
                            <div className="text-lg flex-row items-center dark:text-white justify-start">
                                John Carter
                            </div>
                            <div className="grid grid-cols-3 p-2 items-center text-red rounded-md">
                                <img
                                    src="./images/mute.svg"
                                    className="w-40 h-20 pl-2"
                                    alt="mute"
                                />
                                <img
                                    src="./images/speaker.svg"
                                    className="w-40 h-20 pl-2 "
                                    alt="speaker"
                                />
                                <img
                                    src="./images/add-call.svg"
                                    className="w-40 h-20 pl-2 "
                                    alt="add-call"
                                />
                            </div>
                            <div className="flex p-2 w-full items-center text-red rounded-md justify-center">
                                <img
                                    src="./images/videocall-ended.svg"
                                    className="w-40 h-20 pl-2"
                                    alt="video-call"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* End  VideoCall popup content */}
            </React.Fragment>
        </Modal>
    );
};

export default VideoCallPopup;
