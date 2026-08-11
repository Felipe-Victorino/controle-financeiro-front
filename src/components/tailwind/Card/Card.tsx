import type {ReactNode} from "react";
import "./Card.css"

interface CardTypes {
    children: ReactNode,
    className?: string,
}

const Card = ({children, className}: CardTypes) => {
    return (
        <div className={`card ${className}`}>
            {children}
        </div>
    )
}

export default Card;