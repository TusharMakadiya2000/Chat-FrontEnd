import { useState } from "react";
import { Switch } from "@headlessui/react";

const Privacy = () => {
    const [laseSeenEnabled, setLaseSeenEnabled] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between px-5 pl-0">
                <div className="flex flex-col gap-2 px-5">
                    <span className="text-text-placeholder">
                        Show security notification
                    </span>
                </div>
                <div className="py-2.5">
                    <Switch
                        checked={laseSeenEnabled}
                        onChange={setLaseSeenEnabled}
                        className={`${
                            laseSeenEnabled
                                ? "dark:bg-textSecondary-dark bg-black/20"
                                : "bg-gray-200 dark:bg-white/10"
                        } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                        <span
                            aria-hidden="true"
                            className={`${
                                laseSeenEnabled
                                    ? "translate-x-6"
                                    : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-fgc-dark rounded-full`}
                        />
                    </Switch>
                </div>
            </div>
        </>
    );
};
export default Privacy;
