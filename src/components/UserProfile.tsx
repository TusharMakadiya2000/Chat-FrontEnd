import Icon from "./utils/Icon";

export const UserProfile = (props: any) => {
    return (
        <div
            className={`${props.className} w-full md:w-96 relative h-[100vh-64px] p-1 self-stretch overflow-y-hidden bg-white `}
        >
            <div className="relative p-2">
                <img
                    src="./images/sidemenuprofile.svg"
                    className="w-full h-full "
                    alt="userImage"
                />

                <h2 className=" w-7 rounded-full text-white  absolute my-0  top-4 left-4 cursor-pointer ">
                    settings
                </h2>

                <img
                    src="./images/profile-pic.svg"
                    className="w-20 h-20 absolute left-28 top-36 "
                    alt="userImage"
                />
                <img
                    src="./images/profile-camera.svg"
                    className="w-10 h-10 absolute left-40 top-48 "
                    alt="userImage"
                />
                <Icon
                    icon="pencil-outline"
                    className=" w-7 rounded-full text-black bg-white absolute my-0  top-3 right-2 "
                />
            </div>

            <div className="ml-24 mt-6">
                <h2> Frontend Developer</h2>
            </div>
            <div className="ml-28 flex ">
                <svg
                    className="mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                >
                    <circle cx="5" cy="5.5" r="4" fill="#2DAA50" />
                </svg>
                <h2 className="ml-2"> Active</h2>
                <Icon icon="chevron-down-outline" className="h-6 w-5 ml-2" />
            </div>

            <div className="grid grid-rows-5  mt-2 box-border border-[1px]  w-full">
                <div className="box-border  py-2 border-b-[1px] ">
                    <div className=" flex flex-row">
                        <Icon icon="user-outline" className="h-4 w-6 mt-1 " />
                        <h1 className="ml-1 text-icon">personal info</h1>
                        <Icon
                            icon="chevron-down-outline"
                            className="h-6 w-5 ml-40"
                        />
                    </div>
                </div>
                <div className="box-border  border-b-[1px] ">
                    <div className="flex flex-row py-1">
                        <Icon
                            icon="lock-closed-outline"
                            className="h-4 w-6 mt-1"
                        />
                        <h1 className="ml-2 text-icon">privacy</h1>
                        <Icon
                            icon="chevron-down-outline"
                            className="h-6 w-5 ml-48"
                        />
                    </div>
                </div>

                <div className="flex flex-row py-1  box-border  border-b-[1px]  ">
                    <Icon icon="user-outline" className="h-4 w-6 mt-1" />
                    <h1 className="ml-2 text-icon">Themes</h1>
                    <Icon
                        icon="chevron-down-outline"
                        className="h-6 w-5 ml-[187px]"
                    />
                </div>

                <div className="flex flex-row py-1  box-border  border-b-[1px]  ">
                    <Icon
                        icon="shield-check-outline"
                        className="h-4 w-6 mt-1"
                    />
                    <h1 className="ml-2 text-icon">security</h1>
                    <Icon
                        icon="chevron-down-outline"
                        className="h-6 w-5 ml-[188px]"
                    />
                </div>

                <div className="flex flex-row py-1  box-border border-b-[1px] bg-border ">
                    <Icon
                        icon="question-mark-circle"
                        className="h-4 w-6 mt-1"
                    />
                    <h1 className="ml-2 text-icon">Help</h1>
                    <Icon
                        icon="chevron-down-outline"
                        className="h-6 w-5 ml-[204px]"
                    />
                </div>
            </div>

            {/** Right SideBar Profile End*/}
        </div>
    );
};
export default UserProfile;
