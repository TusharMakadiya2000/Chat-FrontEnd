import React, { useState } from "react";
import { BroadCastType } from "../utils/types";

export interface userItemProps1 {
    userItem: BroadCastType;
    activeItem?: BroadCastType;
    setActiveItem?: (item: BroadCastType) => void;
}

const BroadcastItem: React.FC<userItemProps1> = ({
    userItem,
    activeItem,
    setActiveItem,
}) => {
    const [clickDisabled, setClickDisabled] = useState<boolean>(false);
    const handleBroadcastClick = (item: BroadCastType) => {
        if (clickDisabled || (activeItem && activeItem._id === item._id)) {
            return;
        }

        setClickDisabled(true);

        setActiveItem && setActiveItem(item);
        setTimeout(() => {
            setClickDisabled(false);
        }, 100);
    };

    return (
        <>
            <div
                className="w-full sm:w-full md:w-[350px] lg:w-[350px] flex flex-row items-start justify-start cursor-pointer"
                // onClick={() => setActiveItem && setActiveItem(userItem)}
                onClick={() => handleBroadcastClick(userItem)}
            >
                <div
                    className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-5 border-b-[1px] hover:bg-primary-tabbg hover:dark:bg-bgc-bgSelect border-border dark:border-border-dark ${
                        activeItem?._id === userItem._id &&
                        "bg-primary-tabbg dark:bg-bgc-bgSelect"
                    }`}
                >
                    <div className="flex flex-col items-center justify-center relative ">
                        <img
                            src={userItem.broadcastImage}
                            className="w-[42px] h-[42px] rounded-full"
                            alt="user-profile"
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-row items-start justify-start gap-2.5">
                            <div className="flex-1 relative">
                                <h1 className="dark:text-text-dark text-sm font-semibold">
                                    {userItem.name}
                                </h1>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-2.5 text-xs ">
                            <div className="flex-1 relative dark:text-text-textSecondary text-xs">
                                {userItem.users?.length} Participants
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BroadcastItem;
