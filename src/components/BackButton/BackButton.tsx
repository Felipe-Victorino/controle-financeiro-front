import BackArrow from "../Icons/Back.tsx";
import {useNavigate} from "react-router-dom";

interface BackButtonTypes {
    n?: number
}

const BackButton = ({n}: BackButtonTypes) => {
    const navigate = useNavigate()
    return (
        <button
            className={"flex items-center justify-center rounded-full p-3 hover:bg-slate-300 dark:hover:bg-slate-600"}
            type={"button"}
            onClick={() => {
                navigate(n || -1)
            }}><BackArrow/></button>
    )
}

export default BackButton;