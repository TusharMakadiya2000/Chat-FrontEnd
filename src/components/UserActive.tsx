import React from "react";
import { userItemType } from "./utils/types";

export interface userItemProps3 {
    userItem3: userItemType;
    activeItem?: userItemType;
    setActiveItem?: (item: userItemType) => void;
}

const UserActive: React.FC<userItemProps3> = ({
    userItem3,
    activeItem,
    setActiveItem,
}) => {
    return (
        <>
            <div
                className="w-full flex flex-row items-start justify-start cursor-pointer"
                onClick={() => setActiveItem && setActiveItem(userItem3)}
            >
                <div
                    className={`box-border w-full flex flex-row items-center justify-start py-2.5 px-5 gap-5 
                     ${activeItem?._id === userItem3._id && "bg-fgc"}`}
                >
                    <div className="w-10 h-10 flex flex-col items-center justify-center relative">
                        <img
                            src={userItem3.profileImage}
                            className="w-10 h-10"
                            alt=""
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-row items-start justify-start gap-2.5">
                            <div className="flex-1 relative">
                                <h1>{userItem3.name}</h1>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-2.5 text-xs ">
                            <div className="flex-1 relative">
                                {/* {userItem3.participants} */} participants
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserActive;
