import TextInput from "../../components/Input/TextInput";
import Card from "../../components/Card/Card";
import "../../components/TextHeadings/TextHeadings.css";
import "./Login.css";


import {useState} from "react";
import {useNavigate} from "react-router-dom";
import AsyncButton from "../../components/Button/AsyncButton.tsx";


const Login = () => {
    const navigator = useNavigate();
    return (
        <div>
            <div className="h-1/1 flex flex-row justify-center items-middle">
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
                                <a href="" className="forgot-passwd" onClick={() => {
                                    navigator("/signin")
                                }}>Registrar novo usuário</a>
                                <a href="" className="forgot-passwd" onClick={() => {
                                    navigator("/forgot")
                                }}>Esqueci minha senha</a>
                            </div>
                        </div>

                    </Card>

                </div>
            </div>
        </div>
    );
};

const LoginForm = () => {
    const [user, setUser] = useState({login: "", passwd: ""});


    const verifyLogin = async () => {
        console.log("Login");
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
                onChangeInput={(e) => handleChange(e)}
            />

            <TextInput
                label={"Senha"}
                id="senha"
                name="passwd"
                value={user.passwd}
                inputtype="password"
                onChangeInput={(e) => handleChange(e)}
            />
            <AsyncButton type="submit" onClick={() => verifyLogin()}>
                Entrar
            </AsyncButton>


        </form>
    );
};

export default Login;
