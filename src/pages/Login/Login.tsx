import TextInput from "../../components/Input/TextInput";
import Card from "../../components/Card/Card";
import "../../styles/TextHeadings.css";
import "./Login.css";
import "../../styles/Pages.css"

import {useState} from "react";
import {Link} from "react-router-dom";
import AsyncButton from "../../components/Button/AsyncButton.tsx";
import ErrorMessage from "../../components/Warning/ErrorMessage.tsx";
import PasswordInput from "../../components/Input/PasswordInput.tsx";


const Login = () => {
    return (

        <div className="page-fixed-center-start">
            <div className="flex flex-col justify-center items-middle">
                <Card className={"grid grid-cols-1 auto-rows-min md:grid-cols-2 gap-6"}>
                    <div
                        className={"row-start-2 md:col-start-1 md:row-start-2 flex flex-col justify-center items-stretch gap-6"}>
                        <div>
                            <h1 className="header-title">FinFin</h1>
                            <h2 className="header-subtitle ">Logar no serviço</h2>
                        </div>
                    </div>

                    <div className={"row-start-3 md:col-start-2 md:row-start-2 flex flex-col gap-6"}>
                        <LoginForm/>
                        <div className={"flex flex-col gap-1"}>
                            <Link to={"/auth/signin"} className="link">
                                Registrar novo usuário
                            </Link>
                            <Link to={"/auth/forgot"} className="link">
                                Esqueci minha senha
                            </Link>

                        </div>
                    </div>

                </Card>

            </div>
        </div>

    );
};

const LoginForm = () => {
    const [user, setUser] = useState({login: "", passwd: ""});
    const [error, setError] = useState("");

    const verifyLogin = async () => {
        console.log("Login");
        setError("Não Implementado")
    }
    /*
   makeLogin() => {

   }
   */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form className="flex flex-col">

            <TextInput
                label={"Login"}
                id="login"
                name="login"
                value={user.login}
                inputtype="text"
                onChanged={(e) => handleChange(e)}
            />

            <PasswordInput
                label={"Senha"}
                id="senha"
                name="passwd"
                value={user.passwd}
                onChanged={(e) => handleChange(e)}
            />
            <AsyncButton type="submit" onClick={() => verifyLogin()}>
                Entrar
            </AsyncButton>
            <ErrorMessage>{error}</ErrorMessage>

        </form>
    );
};

export default Login;
