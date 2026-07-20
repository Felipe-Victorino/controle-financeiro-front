import type React from "react";
import "../TextHeadings/TextHeadings.css"

interface TextInput {
    label: string;
    id: string;
    name: string;
    value: string;
    inputtype: string;
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
                       label,
                       id,
                       name,
                       value,
                       inputtype = "text",
                       onChangeInput = () => null,
                   }: TextInput
) => {
    return (
        <div className="flex-col justify-center rounded px-2 py-3">
            <label
                className="block w-4/4 font-normal dark:text-sky-50 p-1"
                htmlFor={id}>
                {label}:
            </label>

            <input
                type={inputtype}
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChangeInput(e)}
                className="w-full dark:bg-white/5 bg-black/5 rounded p-3 text-body border-2 border-gray-200 dark:border-emerald-800 hover:border-gray-400"
            />
        </div>
    );
};

export default TextInput;
