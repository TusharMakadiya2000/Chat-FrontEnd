import Icon from "../utils/Icon";

const ChangeTheme = () => {
    return (
        <div className="flex justify-between px-5 pl-0 py-3">
            <div className="flex flex-col gap-2 px-5">
                <span className="text-text-placeholder">
                    Choose theme color
                </span>
                <div className="flex gap-2">
                    <div>
                        <input
                            id="theme1-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-theme-1"
                        />
                        <span className="absolute transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-bgc-dark cursor-pointer dark:text-bgc-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme2-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-theme-2"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-bgc-dark cursor-pointer dark:text-bgc-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme3-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-theme-3"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-bgc-dark cursor-pointer dark:text-bgc-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme4-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-theme-4"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-bgc-dark cursor-pointer dark:text-bgc-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme5-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-theme-5"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-bgc-dark cursor-pointer dark:text-bgc-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme6-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-theme-6"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-bgc-dark cursor-pointer dark:text-bgc-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme7-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-theme-7"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-bgc-dark cursor-pointer dark:text-bgc-dark"
                            />
                        </span>
                    </div>
                </div>
                <span className="text-text-placeholder">
                    Choose background Image
                </span>
                <div className="flex gap-2">
                    <div>
                        <input
                            id="theme8-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity bg-fgc-dark"
                        />
                        <span className="absolute transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-textSecondary-dark cursor-pointer dark:text-textSecondary-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme9-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                            style={{
                                backgroundImage: `url("./images/bg-pattern.svg")`,
                            }}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-textSecondary-dark cursor-pointer dark:text-textSecondary-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme10-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                            style={{
                                backgroundImage: `url("./images/bg-pattern1.svg")`,
                            }}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-textSecondary-dark cursor-pointer dark:text-textSecondary-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme11-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                            style={{
                                backgroundImage: `url("./images/bg-pattern2.svg")`,
                            }}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-textSecondary-dark cursor-pointer dark:text-textSecondary-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme12-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                            style={{
                                backgroundImage: `url("./images/bg-pattern3.svg")`,
                            }}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-textSecondary-dark cursor-pointer dark:text-textSecondary-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme13-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                            style={{
                                backgroundImage: `url("./images/bg-pattern4.svg")`,
                            }}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-textSecondary-dark cursor-pointer dark:text-textSecondary-dark"
                            />
                        </span>
                    </div>
                    <div>
                        <input
                            id="theme14-search-input"
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                            style={{
                                backgroundImage: `url("./images/bg-pattern5.svg")`,
                            }}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none -ml-[23px] mt-1.5 peer-checked:opacity-100">
                            <Icon
                                icon="right"
                                className="h-5 w-4 rounded-full text-textSecondary-dark cursor-pointer dark:text-textSecondary-dark"
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChangeTheme;
