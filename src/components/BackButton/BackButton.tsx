import BackArrow from "../Icons/Back.tsx";
import {type NavigateOptions, useNavigate} from "react-router-dom";

interface BackButtonTypes extends NavigateOptions {
    to: string
}

const BackButton = ({to}: BackButtonTypes) => {
    const navigate = useNavigate()
    return (
        <button
            className={"flex items-center justify-center rounded-full p-3 hover:bg-slate-300 dark:hover:bg-slate-600"}
            type={"button"}
            onClick={() => {
                navigate(to)
            }}><BackArrow/></button>
    )
}

export default BackButton;