import Icon from "./utils/Icon";

const AttachmentMenu = () => {
    return (
        <>
            <ul className="dropup-content absolute -top-1 right-0 -translate-y-full w-full">
                <div className="flex justify-between items-start py-2.5 px-5 box-border bg-white dark:bg-bgc-dark rounded">
                    <li>
                        <a href="/" className="flex flex-col items-center">
                            <Icon
                                icon="paper-clip"
                                className="h-6 w-6 dark:text-icon"
                            />
                            <div className="hidden lg:block">Attached</div>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="flex flex-col items-center">
                            <Icon
                                icon="camera"
                                className="h-6 w-6 dark:text-icon"
                            />
                            <div className="hidden lg:block">Camera</div>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="flex flex-col items-center">
                            <Icon
                                icon="photograph"
                                className="h-6 w-6 dark:text-icon"
                            />
                            <div className="hidden lg:block">Gallery</div>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="flex flex-col items-center">
                            <Icon
                                icon="play"
                                className="h-6 w-6 dark:text-icon"
                            />
                            <div className="hidden lg:block">Audio</div>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="flex flex-col items-center">
                            <Icon
                                icon="location-marker"
                                className="h-6 w-6 dark:text-icon"
                            />
                            <div className="hidden lg:block">location</div>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="flex flex-col items-center">
                            <Icon
                                icon="user-circle"
                                className="h-6 w-6 dark:text-icon"
                            />
                            <div className="hidden lg:block">Contacts</div>
                        </a>
                    </li>
                </div>
            </ul>
        </>
    );
};

export default AttachmentMenu;
