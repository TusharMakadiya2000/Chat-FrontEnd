import React from "react";
import { CallUserList } from "../utils/types";

export interface userItemProps {
    userItem: CallUserList;
    activeItem?: CallUserList;
    setActiveItem?: (item: CallUserList) => void;
    userId: number;
}

const SubSideCallItem: React.FC<userItemProps> = ({
    userItem,
    activeItem,
    setActiveItem,
    userId,
}) => {
    return (
        <>
            <div
                className="w-full flex flex-row items-start justify-start cursor-pointer"
                onClick={() => setActiveItem && setActiveItem(userItem)}
            >
                <div
                    className={`box-border w-full flex flex-row items-center justify-start py-1 px-5 gap-5 hover:dark:bg-bgc-bgSelect hover:bg-primary-tabbg border-b border-border dark:border-border-dark ${
                        activeItem?.id === userItem.id &&
                        "bg-primary-tabbg dark:dark:bg-bgc-bgSelect"
                    }`}
                >
                    <div className="flex flex-col items-center justify-center relative">
                        <img
                            src={userItem.profileImage}
                            className="w-[42px] h-[42px] rounded-full"
                            alt="useritem-profile"
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start gap-1">
                        <div className="self-stretch flex flex-row items-start justify-start gap-2.5">
                            <div className="flex-1 relative">
                                <h1 className="dark:text-text-dark text-sm font-semibold">
                                    {userItem.name}
                                </h1>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start gap-2.5 text-xs ">
                            <div className="flex relative">
                                <img
                                    className=" w-3 h-3 relative text-xs"
                                    src={`./images/${userItem.icon}`}
                                    alt="useritem-icon"
                                />
                            </div>
                            <div className="flex-1 relative dark:text-text-textSecondary text-xs">
                                {userItem.lastCall}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubSideCallItem;
