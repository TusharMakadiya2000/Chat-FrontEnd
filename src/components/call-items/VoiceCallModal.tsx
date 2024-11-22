import React from "react";
import Modal from "../layout/Modal";
import Icon from "../utils/Icon";
import { CallUserList } from "../utils/types";

type CallPopupProps = {
    activeItem?: any;
    setActiveItem?: (item: CallUserList) => void;
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
};
const CallModal: React.FC<CallPopupProps> = ({
    openCreate,
    setOpenCreate,
    activeItem,
    setActiveItem,
}) => {
    return (
        <Modal
            openModal={openCreate}
            setOpenModal={setOpenCreate}
            size={"500px"}
        >
            <React.Fragment>
                <div className="w-full md:w-[600px] py-5 md:py-10 bg-bgc dark:bg-bgc-dark rounded-md flex flex-col justify-between relative gap-5 md:gap-2.5 ring-2 ring-border/25 dark:ring-border-dark">
                    <div className="flex flex-col justify-center items-cnter gap-1">
                        <div className="flex justify-center items-center">
                            <img
                                className="relative text-xs w-20 h-20 border border-black/50 dark:border-border-dark rounded-full"
                                src={
                                    activeItem?.groupImage ??
                                    activeItem?.broadcastImage ??
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                        activeItem?.profileImage
                                }
                                alt="user-icon"
                            />
                        </div>
                        <div className="dark:text-text-dark text-black flex flex-col justify-center items-center">
                            <span className="text-[10px]">Talking with...</span>
                            <span className="text-sm">{activeItem?.name}</span>
                            <span className="text-[10px] font-light">
                                02:10 min
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                        <div className="bg-fgc-dark cursor-pointer rounded-full h-10 w-10 flex items-center justify-center">
                            <Icon
                                icon="microphone-muted"
                                className="h-5 w-5 text-white dark:text-icon-primary"
                            />
                        </div>
                        <div className="bg-fgc-dark cursor-pointer rounded-full h-10 w-10 flex items-center justify-center">
                            <Icon
                                icon="volume-up"
                                className="h-5 w-5 text-white dark:text-icon-primary"
                            />
                        </div>
                        <div className="bg-fgc-dark cursor-pointer rounded-full h-10 w-10 flex items-center justify-center">
                            <Icon
                                icon="user-add"
                                className="h-5 w-5 text-white dark:text-icon-primary"
                            />
                        </div>
                        <div className="bg-primary cursor-pointer rounded-full h-11 w-11 flex items-center justify-center">
                            <Icon
                                icon="video-camera"
                                className="h-5 w-5 text-white dark:text-icon-primary"
                            />
                        </div>
                        <div
                            onClick={() => setOpenCreate(false)}
                            className="bg-icon-icon cursor-pointer rounded-full py-1 h-11 w-11 flex items-center justify-center"
                        >
                            <Icon
                                icon="phone-missed-call"
                                className="h-5 w-5 text-white dark:text-icon-primary"
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </Modal>
    );
};

export default CallModal;
