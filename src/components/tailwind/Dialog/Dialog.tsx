import Icon from "@/components/tailwind/Icons/Icon.tsx";
import "../../../styles/TextHeadings.css"

interface DialogTypes {
    message: string,
    icon?: string,
    isActive?: boolean
    className?: string

}

const Dialog = (
    {
        message,
        icon,
        isActive,
        className = "border-emerald-500 bg-emerald-900"
    }: DialogTypes
) => {

    if (isActive) {
        return (

            <div
                className={"px-4 rounded flex flex-row justify-start w-full items-center gap-2 border-2 " + className}>
                {icon && <Icon icon={icon}/>}
                <div className={"text-body text-wrap"}>{message}</div>
            </div>

        )
    }

}

export default Dialog;