import React, { useState } from "react";
import { CallUserList } from "../utils/types";
import VideoCallModal from "./VideoCallModal";
import VoiceCallModal from "./VoiceCallModal";
import Icon from "../utils/Icon";

export interface userItemProps {
    userItem: CallUserList;
    activeItem?: CallUserList;
    setActiveItem?: (item: CallUserList) => void;
}

const CallItem: React.FC<userItemProps> = ({
    userItem,
    activeItem,
    setActiveItem,
}) => {
    const [selectedCallIcon, setSelectedCallIcon] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);
    const handleCallIconClick = (icon: any) => {
        setSelectedCallIcon(icon); // Update the selected call icon
        setOpenCreate(true); // Open the modal
    };
    return (
        <>
            <div
                className="w-full flex flex-col items-start justify-start cursor-pointer"
                onClick={() => setActiveItem && setActiveItem(userItem)}
            >
                {activeItem?.call.map((callItem) => (
                    <div
                        key={"activeItem_" + callItem.id}
                        className={`w-full flex flex-row py-1 md:py-2 px-3 md:px-5 gap-2.5 border-b-[1px] border-border dark:border-border-dark`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <img
                                src={`./images/${callItem.image}`}
                                className="w-9 h-9 md:w-[42px] md:h-[42px]"
                                alt={callItem.name}
                            />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-row items-center justify-between">
                                {callItem.name === "Missed call" ? (
                                    <h1 className="dark:text-icon-icon text-icon-icon">
                                        {callItem.name}
                                    </h1>
                                ) : (
                                    <h1 className="dark:text-white text-text">
                                        {callItem.name}
                                    </h1>
                                )}
                                <div
                                    className="relative text-xs mt-1"
                                    onClick={() =>
                                        handleCallIconClick(callItem.icon)
                                    }
                                >
                                    <Icon
                                        className="h-6 w-6 relative dark:text-icon"
                                        icon={callItem.icon}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center text-xs gap-2">
                                <div className="dark:text-text-textSecondary text-text-placeholder">
                                    {callItem.lastCall}
                                </div>
                                <div className="flex items-center gap-2 text-text-textSecondary">
                                    {callItem.name === "Missed call" ? (
                                        ""
                                    ) : (
                                        <>
                                            <div className="flex">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="6"
                                                    height="7"
                                                    viewBox="0 0 6 7"
                                                    fill="none"
                                                >
                                                    <circle
                                                        cx="3"
                                                        cy="3.5"
                                                        r="3"
                                                        fill="#888888"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="dark:text-text-textSecondary text-text-placeholder">
                                                {callItem.timing}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCallIcon === "video-camera" && (
                <VideoCallModal
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    openCreate={openCreate}
                    setOpenCreate={setOpenCreate}
                />
            )}
            {selectedCallIcon === "phone" && (
                <VoiceCallModal
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    openCreate={openCreate}
                    setOpenCreate={setOpenCreate}
                />
            )}
        </>
    );
};

export default CallItem;
