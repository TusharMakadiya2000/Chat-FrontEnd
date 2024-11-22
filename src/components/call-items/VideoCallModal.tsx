import React from "react";
import Modal from "../layout/Modal";
import Icon from "../utils/Icon";
import { CallUserList } from "../utils/types";

type ViedoCallPopupProps = {
    activeItem?: any;
    setActiveItem?: (item: CallUserList) => void;
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
};
const VideoCallModal: React.FC<ViedoCallPopupProps> = ({
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
                <div
                    className="w-full h-[374px] md:w-[600px] md:h-[474px] lg:w-[600px] lg:h-[474px] rounded-md flex flex-row justify-between relative ring-2 ring-border/25 dark:ring-border-dark"
                    style={{
                        backgroundImage:
                            "url('./general-images/ahmed-nishaath-image.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="absolute flex flex-col gap-1 right-0 w-36">
                        <div className="py-2.5 pb-0 px-10">
                            <img
                                className="relative text-xs w-[60px] h-20 border border-border-dark rounded-xl"
                                src={
                                    activeItem?.groupImage ??
                                    activeItem?.broadcastImage ??
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                        activeItem?.profileImage
                                }
                                alt=""
                            />
                        </div>
                        <div className="text-text-dark flex flex-col justify-center items-center">
                            <span className="text-[10px]">Talking with...</span>
                            <span className="text-sm">{activeItem?.name}</span>
                            <span className="text-[10px] font-light">
                                02:10 min
                            </span>
                        </div>
                    </div>
                    <div className="absolute py-3.5 flex justify-center items-center gap-3 bottom-0 w-full md:w-[600px]">
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
                            className="bg-icon-icon cursor-pointer rounded-full h-11 w-11 flex items-center justify-center"
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

export default VideoCallModal;
