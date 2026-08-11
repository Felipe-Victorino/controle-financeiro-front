import "./Button.css";
import React from "react";
import LoadingThrobber from "@/components/tailwind/LoadingThrobber/LoadingThrobber.tsx";

interface AsyncButtonTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: "submit" | "reset" | "button" | undefined,
    onClick: (e: React.MouseEvent<Element, MouseEvent>) => Promise<void>
    isLoading?: boolean;

}

const AsyncButton: React.FC<AsyncButtonTypes> = (
    {
        children,
        disabled,
        type,
        onClick = async () => undefined,
        isLoading = false,
        ...props
    }: AsyncButtonTypes) => {
    return (
        <button
            disabled={disabled}
            className={"button-main"}
            type={type}
            onClick={
                (e: React.MouseEvent<Element, MouseEvent>) => {
                    onClick(e)
                }
            }
            {...props}
        >

            {isLoading ? (<LoadingThrobber/>) : (children)}

        </button>
    )
}

export default AsyncButton;