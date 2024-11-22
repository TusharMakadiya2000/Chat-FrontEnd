/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Icon from "../components/utils/Icon";
import CryptoJS from "crypto-js";
import { allowedFiles, filesExt } from "../../src/components/utils/conts";
import { useAuth } from "../AuthContext";

interface FormDataType {
    profileImage: string;
    email: string;
    password: string;
    name: string;
    confirmpassword: string;
}

const Signup = (props: any) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const queryClient = useQueryClient();

    const theme = localStorage.getItem("theme") || "light";

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/chat");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        document.documentElement.classList.add(theme);
    }, [theme]);

    const navigateToForgot = () => {
        navigate("/forgot-password");
    };

    const schema = yup.object().shape({
        profileImage: yup.string().required("Profile Image is required"),
        email: yup
            .string()
            .email("Invalid Email.")
            .required("Email is required")
            .matches(
                /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Email is not in criteria"
            ),
        password: yup
            .string()
            .required("Password is required")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        confirmpassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("password")], "Your passwords do not match."),
        name: yup
            .string()
            .required("Name is required")
            .min(3, "Must be more then 3 character"),
    });
    const {
        register,
        trigger,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(schema),
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleProfileImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const ext = file.name.split(".").pop()?.toLowerCase();
            if (filesExt["image"].includes(ext || "")) {
                setProfileImage(file);
                setValue("profileImage", file.name); // Update form state
            } else {
                setValue("profileImage", "");
                setProfileImage(null);
            }
        } else {
            setValue("profileImage", "");
            setProfileImage(null);
        }
    };
    const saveProfileImage = async () => {
        try {
            let uploadConfig: AxiosResponse | null = null;
            const selectedFile = (profileImage as File) || "";
            if (selectedFile) {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/users/upload?filename=${
                        selectedFile.name
                    }&type=profileImage`
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
                        setValue("profileImage", uploadConfig.data.key);
                    } catch (error) {
                        console.error("Upload error:", error);
                    }
                }
            }
        } catch (error) {
            return;
        }
    };

    const secretKey = import.meta.env.VITE_CRYPTO_ENCRYPTION_KEY;

    // Function to encrypt data
    const encryptData = (data: any) => {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    };

    const signupMutation = useMutation({
        mutationFn: (data: FormDataType) =>
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`, {
                ...data,
                password: encryptData(data.password),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Signup successful! Please log in.", {
                theme: theme === "dark" ? "dark" : "light",
            });
            navigate("/login");
        },
        onError: (error: any) => {
            console.error("Error during signup:", error);
            toast.error("Signup failed. Please try again.", {
                theme: theme === "dark" ? "dark" : "light",
            });
        },
    });

    const onSubmit = async (data: FormDataType) => {
        if (profileImage) {
            await saveProfileImage();
            data.profileImage = getValues().profileImage;
        }
        signupMutation.mutate(data);
    };

    return (
        <>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row bg-primary items-center justify-between p-3 gap-3 h-screen">
                    <div className="flex flex-col flex-grow">
                        <div className="hidden absolute md:flex top-0 px-7 py-7">
                            <div className="flex items-center justify-center">
                                <Icon icon="chat-logo" className="h-16 w-16" />
                            </div>
                            <div className="flex items-center justify-center text-lg">
                                Nexus Chat
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <img
                                className=""
                                src="./images/read-image.svg"
                                alt="images"
                            />
                        </div>
                    </div>
                    <div className="px-5 md:px-24 w-full md:w-[520px] h-full gap-5 md:gap-5 flex flex-col justify-center dark:bg-bgc-dark rounded-md bg-white">
                        <div className="flex flex-col gap-3 md:gap-5">
                            <h3 className="text-center font-semibold text-4xl">
                                Sign up
                            </h3>
                            <div className="text-sm">
                                <span className="text-base font-semibold text-primary gap-x-2">
                                    <Link to="/login">Login here</Link>
                                </span>
                                &nbsp;If you already have an account.
                            </div>
                        </div>
                        <div className="text-center">
                            <label
                                htmlFor="profileImage"
                                className="cursor-pointer mx-auto md:border-dashed md:border-2 sm:border-border md:dark:border-border-dark md:rounded-full 
        md:w-32 md:h-32 items-center flex flex-col h-10 w-10  border-dashed border-2 border-border rounded-full sm:rounded-full"
                            >
                                {profileImage || getValues().profileImage ? (
                                    <img
                                        src={
                                            (profileImage &&
                                                URL.createObjectURL(
                                                    profileImage
                                                )) ||
                                            import.meta.env
                                                .VITE_NEXT_PUBLIC_TEBI_CLOUD_FRONT_PROFILE_S3_URL +
                                                getValues().profileImage
                                        }
                                        alt=""
                                        className="md:w-32 md:h-32 mx-auto md:rounded-full h-24 w-24 rounded-full"
                                    />
                                ) : (
                                    <div className="absolute gap-2 bottom-[61%] md:w-40 md:h-40 text-center flex flex-col justify-center items-center">
                                        <Icon
                                            icon="cloud-arrow-up"
                                            className="sm:h-8 sm:w-8 w-4 h-4"
                                        />
                                        <div className="md:text-sm md:text-center text-xs">
                                            Upload Profile
                                        </div>

                                        <div className="sm:text-[#A9ACB4] sm:text-xs sm:text-center sm:pb-5 hidden">
                                            JPG,JPEG or PNG formats, up to 5MB
                                        </div>
                                    </div>
                                )}
                            </label>

                            <input
                                type="file"
                                className="hidden"
                                id="profileImage"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                            />
                        </div>

                        <div className="flex flex-col gap-3 md:gap-6">
                            <div className="relative">
                                <Input
                                    preIcon="user"
                                    name={"name"}
                                    type={"text"}
                                    label={"name"}
                                    placeholder={"Enter your Name"}
                                    error={errors?.name?.message}
                                    register={register}
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    preIcon="mail"
                                    name={"email"}
                                    label={"Email"}
                                    type={"text"}
                                    placeholder={"Enter your Email"}
                                    error={errors?.email?.message}
                                    register={register}
                                />
                            </div>

                            <div className="">
                                <Input
                                    preIcon="lock-closed"
                                    name={"password"}
                                    type={"password"}
                                    label={"Password"}
                                    placeholder={"Password"}
                                    error={errors?.password?.message}
                                    register={register}
                                    trigger={trigger}
                                />
                            </div>
                            <div className="">
                                <Input
                                    preIcon="lock-closed"
                                    name={"confirmpassword"}
                                    type={"password"}
                                    label={"Confirm Password"}
                                    placeholder={"Confirm Password"}
                                    error={errors?.confirmpassword?.message}
                                    register={register}
                                    trigger={trigger}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-3 md:gap-5">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="vehicle3"
                                        name="vehicle3"
                                        value="Boat"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded border border-black dark:border-text-textSecondary transition-all before:absolute before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                                    />
                                    <span className="absolute text-primary transition-opacity opacity-0 pointer-events-none ml-[1px]  peer-checked:opacity-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="1"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                    <label
                                        className="text-sm px-2 cursor-pointer"
                                        htmlFor="vehicle3"
                                    >
                                        Term & conditions
                                    </label>
                                </div>

                                <div
                                    onClick={navigateToForgot}
                                    className="text-sm dark:text-text-placeholder cursor-pointer "
                                >
                                    Forgot Password ?
                                </div>
                            </div>
                            <button
                                className="w-full rounded text-sm p-2 text-white bg-primary"
                                type="submit"
                            >
                                Register here
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Signup;
