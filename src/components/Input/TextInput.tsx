import type React from "react";
import "./Input.css"
import "../../styles/TextHeadings.css"

interface TextInput {
    label: string;
    id: string;
    name: string;
    value: string;
    inputtype: string;
    onChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
                       label,
                       id,
                       name,
                       value,
                       inputtype = "text",
                       onChanged = () => null,
                   }: TextInput
) => {
    return (
        <div className="input-container">
            <label
                className="input-label"
                htmlFor={id}>
                {label}:
            </label>

            <input
                type={inputtype}
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChanged(e)}
                className="input text-body"
            />

        </div>
    );
};

export default TextInput;
