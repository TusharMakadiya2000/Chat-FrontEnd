import Input from "../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Icon from "../components/utils/Icon";
import axios from "axios";
import ProfileUserListProvider from "../components/ProfileUserList";
import CryptoJS from "crypto-js";

interface FormDataType {
    currentPassword: string;
    newPassword: string;
    confirmpassword: string;
}

const ChangePassword = (props: any) => {
    const navigate = useNavigate();
    const ProfileUser = ProfileUserListProvider();
    const loggedInUserId = ProfileUser?.id;
    const theme = localStorage.getItem("theme") || "light";

    useEffect(() => {
        document.documentElement.classList.add(theme);
    }, [theme]);

    const navigateToForgot = () => {
        // 👇️ navigate to /contacts
        navigate("/chat");
    };
    const schema = yup.object().shape({
        currentPassword: yup
            .string()
            .required("Password is required")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        newPassword: yup
            .string()
            .required("Password is required")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        confirmpassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("newPassword")], "Your passwords do not match."),
    });
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(schema),
    });

    const secretKey = import.meta.env.VITE_CRYPTO_ENCRYPTION_KEY;

    const encryptData = (data: any) => {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    };
    const onSubmit = async (data: FormDataType) => {
        const encryptedCurrentPassword = encryptData(data.currentPassword);
        const encryptedNewPassword = encryptData(data.newPassword);
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/users/change-password/${loggedInUserId}`,
                {
                    userId: loggedInUserId,
                    currentPassword: encryptedCurrentPassword,
                    newPassword: encryptedNewPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`, // Assuming JWT is stored in localStorage
                    },
                }
            );

            if (response.status === 200) {
                alert("Password changed successfully");
                navigate("/chat");
            }
        } catch (error: any) {
            console.error("Error changing password:", error);
            alert(error.response?.data?.error || "Failed to change password.");
        }
    };

    // const onSubmit = (data: FormDataType) => {};
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
                    <div className="px-5 md:px-24 w-full md:w-[520px] h-full gap-5 md:gap-9 flex flex-col justify-center rounded-md bg-white dark:bg-bgc-dark ">
                        <h3 className="text-center font-semibold text-4xl">
                            Change Password
                        </h3>

                        <div className="flex flex-col gap-4 md:gap-6">
                            <div className="relative">
                                <Input
                                    preIcon="lock-closed"
                                    name={"currentPassword"}
                                    type={"password"}
                                    label={"Current Password"}
                                    placeholder={"Current Password"}
                                    error={errors?.currentPassword?.message}
                                    register={register}
                                    trigger={trigger}
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    preIcon="lock-closed"
                                    name={"newPassword"}
                                    type={"newPassword"}
                                    label={"New Password"}
                                    placeholder={"New Password"}
                                    error={errors?.newPassword?.message}
                                    register={register}
                                    trigger={trigger}
                                />
                            </div>
                            <div className="relative">
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
                        <div className="flex flex-col gap-3">
                            <button
                                className="w-full p-2 rounded text-white bg-primary"
                                type="submit"
                            >
                                Change Password
                            </button>
                            <div
                                onClick={navigateToForgot}
                                className="w-full p-2 text-center cursor-pointer"
                            >
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default ChangePassword;
