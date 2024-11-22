import Input from "../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Icon from "../components/utils/Icon";

interface FormDataType {
    password: string;
    confirmpassword: string;
}

const ResetPassword = (props: any) => {
    const navigate = useNavigate();

    const theme = localStorage.getItem("theme") || "light";

    useEffect(() => {
        document.documentElement.classList.add(theme);
    }, [theme]);

    const navigateToForgot = () => {
        // 👇️ navigate to /contacts
        navigate("/forgot-password");
    };
    // const navigateToChange = () => {
    //     // 👇️ navigate to /contacts
    //     navigate("/change-password");
    // };
    const schema = yup.object().shape({
        password: yup.string().required("Password is required"),
        confirmpassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("password")], "Your passwords do not match."),
    });
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: FormDataType) => {};
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
                            Set Password
                        </h3>

                        <div className="flex flex-col gap-6">
                            <div className="relative">
                                <Input
                                    preIcon="lock-closed"
                                    name={"password"}
                                    type={"password"}
                                    label={"New Password"}
                                    placeholder={"Password"}
                                    error={errors?.password?.message}
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
                                Set Password
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
export default ResetPassword;
