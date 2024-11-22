import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";
import { ModalSizeType } from "../utils/types";
import { classNames } from "../utils/classNames";

const ModalSize: ModalSizeType = {
    xs: "lg:w-3/12 sm:w-6/12 md:w-5/12",
    sm: "w-full sm:w-4/12",
    md: "w-full lg:w-5/12 sm:w-10/12 md:w-8/12",
    lg: "lg:w-7/12 sm:w-10/12 md:w-10/12",
    xl: "lg:w-8/12 sm:w-10/12 md:w-10/12",
};

type RequestType = {
    openModal: boolean;
    setOpenModal: (fl: boolean) => void;
    size: string;
    children: JSX.Element;
};

const Modal: React.FC<RequestType> = ({
    openModal,
    setOpenModal,
    size,
    children,
}) => {
    const cancelButtonRef = useRef(null);
    return (
        <>
            {size && (
                <Transition.Root show={openModal} as={Fragment}>
                    <Dialog
                        onClickCapture={() => {
                            // ReactTooltip.hide();
                        }}
                        as="div"
                        className="relative z-40"
                        initialFocus={cancelButtonRef}
                        onClose={() => {
                            ("");
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div
                                className={classNames(
                                    "fixed",
                                    "inset-0",
                                    "bg-black/40",
                                    "dark:bg-black/70"
                                )}
                            />
                        </Transition.Child>

                        <div className={`fixed inset-0 z-10 overflow-y-auto`}>
                            <div
                                className={classNames(
                                    "flex",
                                    "min-h-full",
                                    "items-center",
                                    "justify-center",
                                    "p-5 sm:p-5",
                                    "text-center",
                                    "sm:items-center",
                                    "sm:p-0"
                                )}
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition-opacity duration-0"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel
                                        className={classNames(
                                            "relative",
                                            // "",
                                            `flex justify-center w-full md:${ModalSize[size]}`,
                                            "rounded-lg",
                                            "dark:bg-dark2",
                                            "text-left",
                                            "sm:my-8",
                                            "transition-all",
                                            "h-auto",
                                            "duration-300 ease-in"
                                        )}
                                    >
                                        {children}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            )}
        </>
    );
};

export default Modal;
