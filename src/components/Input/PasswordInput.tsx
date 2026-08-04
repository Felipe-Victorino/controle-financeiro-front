import React, {useState} from "react";
import "./input.css"
import "../../styles/inputs.css"

interface PasswordInputType extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    id: string,
    name: string,
    value: string,
    onChanged: (e: React.ChangeEvent<HTMLInputElement>) => void,


}

const PasswordInput: React.FC<PasswordInputType> = ({label, id, name, value, onChanged}) => {
    const [inputType, setInputType] = useState("password");

    const togglePassword = () => {
        if (inputType == "password") {
            setInputType("text");
        } else {
            setInputType(
                "password"
            )
        }
    }


    return (
        <div className="input-container">
            <label
                className="input-label"
                htmlFor={id}>
                {label}:
            </label>

            <input
                type={inputType}
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChanged(e)}
                className="input text-body"
            />
            <span className={"flex flex-row items-center justify-end "}>

                <input
                    id={"visibility"}
                    type={"checkbox"}
                    className={"w-4 h-4 accent-emerald-500 select-none"}
                    onClick={togglePassword}
                />
                <label
                    htmlFor={"visibility"}
                    className={"input-label"}
                >
                Mostrar senha
                </label>
            </span>

        </div>
    )
}

export default PasswordInput;