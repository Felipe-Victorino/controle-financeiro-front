import {Link} from "react-router-dom";

const AuthNavbar = () => {


    return (
        <nav className={"flex flex-row gap-8"}>
            <Link className={"text-sky-50 font-medium text-pretty p-1 hover:underline"}
                  to={"auth/login"}>Logar</Link>
            <Link className={"text-sky-50 font-medium text-pretty p-1 hover:underline"}
                  to={"auth/signin"}>Cadastrar</Link>
        </nav>
    )
}
export default AuthNavbar;