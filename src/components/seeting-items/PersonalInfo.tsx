import Icon from "../utils/Icon";
import { userItemType } from "../utils/types";

export interface userItemProps {
    userItem: userItemType;
}

const PersonalInfo: React.FC<userItemProps> = ({ userItem }) => {
    return (
        <div className="flex flex-col gap-5 py-1">
            <div className="flex justify-between px-5 pl-0">
                <div className="flex flex-col gap-2 px-5">
                    <span className="text-text-placeholder dark:text-text-textSecondary">
                        Name
                    </span>
                    <span>{userItem.name}</span>
                </div>
                <div className="flex items-center justify-center h-9 w-9 dark:bg-bgc-bgSelect bg-black/50 rounded-full">
                    <Icon
                        icon="pencil"
                        className="h-5 w-5 rounded-full text-white cursor-pointer dark:text-icon"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2 px-5">
                <span className="text-text-placeholder dark:text-text-textSecondary">
                    Email
                </span>
                <span>{userItem.email}</span>
            </div>
            <div className="flex flex-col gap-2 px-5">
                <span className="text-text-placeholder dark:text-text-textSecondary">
                    Location
                </span>
                <span>California,USA</span>
            </div>
        </div>
    );
};
export default PersonalInfo;
