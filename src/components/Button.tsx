const Button = (props: any) => {
    return (
        <button
            type={props.type || "button"}
            className={`shadow-sm rounded-md bg-primary px-3 py-2 text-text-dark text-sm font-semibold  ring-1 ring-inset ring-primary dark:ring-primary hover:bg-primary dark:bg-primary-dark ${props.class}`}
            onClick={() => props.onClick && props.onClick()}
            disabled={props.disabled || false}
        >
            {props.children}
        </button>
    );
};

export default Button;
