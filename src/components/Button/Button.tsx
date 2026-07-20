import "./Button.css"

interface ButtonTypes {
    type: "submit" | "reset" | "button" | undefined,
    label: string,
    onClick?: () => void,
}

const Button = ({type, label, onClick = () => undefined}: ButtonTypes) => {
    return (
        <button className={"button-main"} type={type} onClick={() => {
            onClick()
        }}>
            {label}
        </button>
    );
}

export default Button;