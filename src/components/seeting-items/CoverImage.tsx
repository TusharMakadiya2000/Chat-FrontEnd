import React, { useEffect, useState } from "react";
import Modal from "../layout/Modal";
import Icon from "../utils/Icon";
import { CallUserList } from "../utils/types";
import useAuthUser from "../useAuthUser";
import { filesExt } from "../utils/conts";
import axios, { AxiosResponse } from "axios";

type CoverImageProps = {
    activeItem?: any;
    setActiveItem?: (item: CallUserList) => void;
    openCreate: boolean;
    setOpenCreate: (fl: boolean) => void;
    onCoverImageUpdate?: (imageUrl: string) => void;
};
const CoverImageModal: React.FC<CoverImageProps> = ({
    openCreate,
    setOpenCreate,
    activeItem,
    setActiveItem,
    onCoverImageUpdate,
}) => {
    const user = useAuthUser();
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const token = localStorage.getItem("token");

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const ext = file.name.split(".").pop()?.toLowerCase();
            if (filesExt["image"].includes(ext || "")) {
                setCoverImage(file);
            } else {
                setCoverImage(null);
            }
        } else {
            setCoverImage(null);
        }
    };

    useEffect(() => {
        // Clean up object URL when component unmounts
        return () => {
            if (coverImage) {
                URL.revokeObjectURL(URL.createObjectURL(coverImage));
            }
        };
    }, [coverImage]);

    const saveCoverImage = async () => {
        try {
            let uploadConfig: AxiosResponse | null = null;
            const selectedFile = (coverImage as File) || "";
            if (selectedFile) {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/users/upload?filename=${
                        selectedFile.name
                    }&type=coverImage`
                );

                if (response.status === 200) {
                    uploadConfig = response;
                    console.log(
                        "uploadConfig?.data?.url",
                        uploadConfig?.data?.url
                    );
                    try {
                        const upload = await axios.put(
                            uploadConfig?.data?.url,
                            selectedFile,
                            {
                                headers: {
                                    "Content-Type": selectedFile?.type || "",
                                },
                            }
                        );
                        const updateResponse = await axios.put(
                            `${import.meta.env.VITE_API_BASE_URL}/users/${
                                user?._id
                            }`,
                            { coverImage: uploadConfig.data.key },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        if (updateResponse.status === 200) {
                            if (onCoverImageUpdate) {
                                const newImageUrl = `${
                                    import.meta.env
                                        .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL
                                }${uploadConfig.data.key}`;
                                onCoverImageUpdate(newImageUrl); // Pass the new image URL
                            }
                            // Optionally update the user context or state
                            setCoverImage(null);
                            setOpenCreate(false); // Close the modal after successful update
                        } else {
                            console.error("Failed to update user cover image.");
                        }

                        // setValue("coverImage", uploadConfig.data.key);
                    } catch (error) {
                        console.error("Upload error:", error);
                    }
                }
            }
        } catch (error) {
            return;
        }
    };

    const handleCancel = () => {
        setCoverImage(null);
    };

    return (
        <Modal
            openModal={openCreate}
            setOpenModal={setOpenCreate}
            size={"500px"}
        >
            <React.Fragment>
                <div className="w-full md:w-[600px] py-5 bg-bgc dark:bg-bgc-dark rounded-md flex flex-col justify-between relative gap-5 md:gap-2.5 ">
                    <div className="text-center flex flex-col gap-3">
                        <div
                            onClick={() => setOpenCreate(false)}
                            className="absolute right-5 cursor-pointer"
                        >
                            <Icon
                                icon="x"
                                className="sm:h-8 sm:w-8 w-4 h-4 dark:text-white"
                            />
                        </div>
                        <label
                            htmlFor="coverImage"
                            className="cursor-pointer mx-auto 
        md:w-auto md:h-auto flex flex-col items-center justify-center h-10 w-10"
                        >
                            {coverImage ? (
                                // <>
                                <img
                                    src={URL.createObjectURL(coverImage)}
                                    alt=""
                                    className="md:w-[550px] md:h-auto mx-auto h-24 w-24 rounded-md border-dashed border-2 dark:border-border-dark"
                                />
                            ) : (
                                <div className="gap-2 md:w-40 md:h-40 text-center flex flex-col justify-center items-center">
                                    <Icon
                                        icon="cloud-arrow-up"
                                        className="sm:h-8 sm:w-8 w-4 h-4 dark:text-white"
                                    />
                                    <div className="md:text-lg md:text-center text-xs dark:text-white">
                                        Upload Profile
                                    </div>

                                    <div className="sm:text-[#A9ACB4] sm:text-xs sm:text-center sm:pb-5 hidden">
                                        JPG,JPEG or PNG formats, up to 5MB
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                id="coverImage"
                                accept="image/*"
                                onChange={handleCoverImageChange}
                            />
                        </label>
                        {coverImage && (
                            <div className="self-stretch overflow-hidden flex flex-row items-center justify-center gap-5 text-primary">
                                <div
                                    className="flex cursor-pointer items-center justify-center px-3 py-1.5 text-sm rounded-md bg-primary hover:bg-primary/55 dark:text-text-dark text-white shadow-[0px_2px_6px_rgba(0,_0,_0,_0.25)]"
                                    onClick={saveCoverImage}
                                >
                                    Save
                                </div>
                                <button
                                    className="relative text-sm"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        </Modal>
    );
};

export default CoverImageModal;
