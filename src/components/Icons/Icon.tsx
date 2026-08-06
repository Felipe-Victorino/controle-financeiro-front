import 'material-symbols/outlined.css';
import "./Icons.css"

interface IconTypes {
    icon: string,
    color?: string
}

const Icon = ({icon}: IconTypes) => {
    return (
        <span className={"material-symbols-outlined icons"}>{icon}</span>
    )
}
export default Icon;