import { useState, useEffect } from "react";
import Input from "../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Icon from "../components/utils/Icon";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

interface FormDataType {
    email: string;
}

interface OtpFormDataType {
    otp: string;
}

interface ResetPasswordFormDataType {
    newPassword: string;
    confirmPassword: string;
}

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const theme = localStorage.getItem("theme") || "light";

    useEffect(() => {
        document.documentElement.classList.add(theme);
    }, [theme]);

    const navigateToLogin = () => {
        navigate("/login");
    };

    const emailSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid Email.")
            .required("Email is required")
            .matches(
                /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Email is not in criteria"
            ),
    });

    const otpSchema = yup.object().shape({
        otp: yup.string().required("OTP is required"),
    });

    const passwordSchema = yup.object().shape({
        newPassword: yup
            .string()
            .required("Password is required")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        confirmPassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("newPassword")], "Your passwords do not match."),
    });

    const {
        register: emailRegister,
        handleSubmit: handleEmailSubmit,
        formState: { errors: emailErrors },
    } = useForm<FormDataType>({
        resolver: yupResolver(emailSchema),
    });

    const {
        register: otpRegister,
        handleSubmit: handleOtpSubmit,
        formState: { errors: otpErrors },
    } = useForm<OtpFormDataType>({
        resolver: yupResolver(otpSchema),
    });

    const {
        register: passwordRegister,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
    } = useForm<ResetPasswordFormDataType>({
        resolver: yupResolver(passwordSchema),
    });
    const secretKey = import.meta.env.VITE_CRYPTO_ENCRYPTION_KEY;
    // Function to encrypt data
    const encryptData = (data: any) => {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    };

    const onEmailSubmit = async (data: FormDataType) => {
        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/users/forgot-password`,
                {
                    email: data.email,
                }
            );
            setUserEmail(data.email);
            setShowOtpForm(true);
            toast.success("OTP send your Email Id.", {
                theme: theme === "dark" ? "dark" : "light",
            });
        } catch (error) {
            console.error("Error requesting OTP:", error);
            toast.error("Failed to send OTP. Please try again.", {
                theme: theme === "dark" ? "dark" : "light",
            });
        } finally {
            setLoading(false);
        }
    };

    const onOtpSubmit = async (data: OtpFormDataType) => {
        setLoading(true);
        try {
            // Verify OTP
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/users/verify-otp`,
                {
                    email: userEmail,
                    otp: data.otp,
                }
            );
            setShowOtpForm(false);
            setShowPasswordForm(true);
            toast.success("OTP varified successfuly.", {
                theme: theme === "dark" ? "dark" : "light",
            });
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Invalid OTP. Please try again.", {
                theme: theme === "dark" ? "dark" : "light",
            });
        } finally {
            setLoading(false);
        }
    };

    const onPasswordSubmit = async (data: ResetPasswordFormDataType) => {
        setLoading(true);
        const encryptedPassword = encryptData(data.newPassword);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/users/reset-password`,
                {
                    email: userEmail,
                    newPassword: encryptedPassword,
                }
            );
            toast.success("Password has been reset successfully!", {
                theme: theme === "dark" ? "dark" : "light",
            });
            navigate("/login");
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("Failed to reset password. Please try again.", {
                theme: theme === "dark" ? "dark" : "light",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!showOtpForm && !showPasswordForm && (
                <form onSubmit={handleEmailSubmit(onEmailSubmit)}>
                    <div className="flex flex-row bg-primary items-center justify-between p-3 gap-3 h-screen">
                        <div className="flex flex-col flex-grow">
                            <div className="hidden absolute md:flex top-0 px-7 py-7">
                                <div className="flex items-center justify-center">
                                    <Icon
                                        icon="chat-logo"
                                        className="h-16 w-16"
                                    />
                                </div>
                                <div className="flex items-center justify-center text-lg">
                                    Nexus Chat
                                </div>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <img
                                    src="./images/read-image.svg"
                                    alt="images"
                                />
                            </div>
                        </div>
                        <div className="px-5 md:px-24 w-full md:w-[520px] h-full gap-5 md:gap-9 flex flex-col justify-center dark:bg-bgc-dark rounded-md bg-white">
                            <h3 className="text-center font-semibold text-4xl">
                                Recover
                            </h3>
                            <div className="font-normal text-sm">
                                Enter your email to receive an OTP for password
                                reset.
                            </div>
                            <div className="relative">
                                <Input
                                    preIcon="mail"
                                    name={"email"}
                                    label={"Email"}
                                    type={"text"}
                                    placeholder={"Enter your Email"}
                                    error={emailErrors?.email?.message}
                                    register={emailRegister}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    className="w-full p-2 dark:text-text-dark text-white bg-primary rounded text-center"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Sending OTP..." : "Send OTP"}
                                </button>
                                <div
                                    onClick={navigateToLogin}
                                    className="w-full p-2 text-center cursor-pointer"
                                >
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* OTP Form */}
            {showOtpForm && !showPasswordForm && (
                <form onSubmit={handleOtpSubmit(onOtpSubmit)}>
                    <div className="flex flex-row bg-primary items-center justify-between p-3 gap-3 h-screen">
                        <div className="flex flex-col flex-grow">
                            <div className="hidden absolute md:flex top-0 px-7 py-7">
                                <div className="flex items-center justify-center">
                                    <Icon
                                        icon="chat-logo"
                                        className="h-16 w-16"
                                    />
                                </div>
                                <div className="flex items-center justify-center text-lg">
                                    Nexus Chat
                                </div>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <img
                                    src="./images/read-image.svg"
                                    alt="images"
                                />
                            </div>
                        </div>
                        <div className="px-5 md:px-24 w-full md:w-[520px] h-full gap-5 md:gap-9 flex flex-col justify-center dark:bg-bgc-dark rounded-md bg-white">
                            <h3 className="text-center font-semibold text-4xl">
                                Verify OTP
                            </h3>
                            <div className="font-normal text-sm">
                                Enter the OTP sent to your email.
                            </div>
                            <div className="relative">
                                <Input
                                    preIcon="key"
                                    name={"otp"}
                                    label={"OTP"}
                                    type={"text"}
                                    placeholder={"Enter your OTP"}
                                    error={otpErrors?.otp?.message}
                                    register={otpRegister}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    className="w-full p-2 dark:text-text-dark text-white bg-primary rounded text-center"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Verifying OTP..."
                                        : "Verify OTP"}
                                </button>
                                <div
                                    onClick={navigateToLogin}
                                    className="w-full p-2 text-center cursor-pointer"
                                >
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* Password Reset Form */}
            {showPasswordForm && (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                    <div className="flex flex-row bg-primary items-center justify-between p-3 gap-3 h-screen">
                        <div className="flex flex-col flex-grow">
                            <div className="hidden absolute md:flex top-0 px-7 py-7">
                                <div className="flex items-center justify-center">
                                    <Icon
                                        icon="chat-logo"
                                        className="h-16 w-16"
                                    />
                                </div>
                                <div className="flex items-center justify-center text-lg">
                                    Nexus Chat
                                </div>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <img
                                    src="./images/read-image.svg"
                                    alt="images"
                                />
                            </div>
                        </div>
                        <div className="px-5 md:px-24 w-full md:w-[520px] h-full gap-5 md:gap-9 flex flex-col justify-center dark:bg-bgc-dark rounded-md bg-white">
                            <h3 className="text-center font-semibold text-4xl">
                                Reset Password
                            </h3>
                            <div className="font-normal text-sm">
                                Enter your new password and confirm it.
                            </div>
                            <div className="relative">
                                <Input
                                    preIcon="lock"
                                    name={"newPassword"}
                                    label={"New Password"}
                                    type={"password"}
                                    placeholder={"Enter your new password"}
                                    error={passwordErrors?.newPassword?.message}
                                    register={passwordRegister}
                                />
                                <Input
                                    preIcon="lock"
                                    name={"confirmPassword"}
                                    label={"Confirm Password"}
                                    type={"password"}
                                    placeholder={"Confirm your new password"}
                                    error={
                                        passwordErrors?.confirmPassword?.message
                                    }
                                    register={passwordRegister}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    className="w-full p-2 dark:text-text-dark text-white bg-primary rounded text-center"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Resetting Password..."
                                        : "Reset Password"}
                                </button>
                                <div
                                    onClick={navigateToLogin}
                                    className="w-full p-2 text-center cursor-pointer"
                                >
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default ForgotPassword;
