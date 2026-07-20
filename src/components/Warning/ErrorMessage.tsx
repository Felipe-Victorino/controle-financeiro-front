import React, {type ReactNode} from "react";
import "./warning.css"

interface ErrorMessageTypes {
    children: ReactNode,
}

const ErrorMessage: React.FC<ErrorMessageTypes> = ({children}: ErrorMessageTypes) => {
    return (
        <div className={"error-message"}>
            {children}
        </div>
    )
}

export default ErrorMessage;