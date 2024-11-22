import { useState } from "react";
import Icon from "./utils/Icon";

const Input = (props: any) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="">
            {props.label && (
                <label
                    htmlFor={props.id}
                    className="block text-sm font-medium leading-6"
                >
                    {props.label}
                </label>
            )}
            <div className="relative">
                {props.preIcon && (
                    <Icon
                        icon={props.preIcon}
                        className="h-6 w-6 absolute top-5 transform -translate-y-3.5 left-2.5 text-text dark:text-icon"
                    />
                )}
                <input
                    type={
                        (props.type === "password"
                            ? !showPassword
                                ? props.type
                                : "text"
                            : props.type) || "text"
                    }
                    name={props.name}
                    className={`w-full p-2 rounded-md border ring-0 border-border dark:border-border-dark outline-none text-gray-900 placeholder:text-gray-400 sm:text-sm dark:ring-border-dark dark:bg-transparent dark:text-white ${
                        props.class ? props.class : ""
                    } ${props.preIcon ? "pl-10" : ""}`}
                    placeholder={props.placeholder || ""}
                    {...(props.register &&
                        props.register(props.name, {
                            onChange: (e: any) => {
                                props.setValue &&
                                    props.setValue(props.name, e.target.value);

                                props.trigger && props.trigger(props.name);
                            },
                        }))}
                />
                {props.type === "password" && (
                    <Icon
                        icon={showPassword ? "eye" : "eye-off"}
                        className="h-5 w-5 absolute top-2.5 right-2 cursor-pointer text-text dark:text-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}
                {props.error && (
                    <div className="text-red-600">{props.error}</div>
                )}
            </div>
        </div>
    );
};

export default Input;
