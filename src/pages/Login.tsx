import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Icon from "../components/utils/Icon";
import CryptoJS from "crypto-js";
import { useAuth } from "../AuthContext";
interface FormDataType {
    email: string;
    password: string;
}

const Login = (props: any) => {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const theme = localStorage.getItem("theme") || "light";

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/chat");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        document.documentElement.classList.add(theme);
    }, [theme]);

    const schema = yup.object().shape({
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
                "Password must contain at least 8 characters, one uppercase, one number, and one special character"
            ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(schema),
    });

    const secretKey = import.meta.env.VITE_CRYPTO_ENCRYPTION_KEY;

    // Function to encrypt data
    const encryptData = (data: any) => {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    };

    // // Function to decrypt data
    // const decryptData = (cipherText: any) => {
    //     const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    //     return bytes.toString(CryptoJS.enc.Utf8);
    // };

    const onSubmit = async (data: FormDataType) => {
        try {
            const encryptedPassword = encryptData(data.password);
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/users/login`,
                {
                    ...data,
                    password: encryptedPassword,
                }
            );
            const { token } = response.data;
            localStorage.setItem("token", token);
            login(token);
            toast.success("Login successful!", {
                theme: theme === "dark" ? "dark" : "light",
            });
            navigate("/chat");
        } catch (error: any) {
            console.error("Login failed:", error);

            // Show error toast
            if (error.response && error.response.status === 401) {
                toast.error("Invalid username or password.", {
                    theme: theme === "dark" ? "dark" : "light",
                });
            } else {
                toast.error("Login failed. Please try again.", {
                    theme: theme === "dark" ? "dark" : "light",
                });
            }
        }
    };

    return (
        <>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row bg-primary h-screen items-center justify-between p-3 gap-3">
                    <div className="flex flex-col flex-grow">
                        <div className="hidden absolute md:flex px-7 top-0 py-7">
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
                    <div className="px-5 md:px-24 w-full md:w-[520px] h-full gap-5 md:gap-9 flex flex-col justify-center dark:bg-bgc-dark rounded-md bg-white">
                        <div className="flex flex-col gap-3 md:gap-5">
                            <h3 className=" text-center font-semibold text-[32px]">
                                Sign in
                            </h3>
                            <div className="text-base">
                                <span className="text-base font-semibold text-primary gap-x-2">
                                    <Link to="/Signup">Register here</Link>
                                </span>
                                &nbsp;If you don’t have an account.
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 md:gap-6">
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
                            <div className="relative">
                                <Input
                                    preIcon="lock-closed"
                                    name={"password"}
                                    label={"Password"}
                                    type={"password"}
                                    placeholder={"Enter your Password"}
                                    error={errors?.password?.message}
                                    register={register}
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
                                        Remember me
                                    </label>
                                </div>
                                <div
                                    onClick={() => navigate("/forgot-password")}
                                    className="text-sm dark:text-text-placeholder cursor-pointer"
                                >
                                    Forgot Password ?
                                </div>
                            </div>
                            <button
                                className="w-full rounded p-2 text-white bg-primary"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Login;
