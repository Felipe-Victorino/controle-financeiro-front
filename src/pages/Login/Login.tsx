import TextInput from "@/components/tailwind/Input/TextInput";
import Card from "@/components/tailwind/Card/Card";
import "../../styles/TextHeadings.css";
import "./Login.css";
import "../../styles/Pages.css"

import React, {useState} from "react";
import {Link} from "react-router-dom";
import AsyncButton from "@/components/tailwind/Button/AsyncButton.tsx";
import PasswordInput from "@/components/tailwind/Input/PasswordInput.tsx";
import AuthService from "../../services/AuthService.ts";
import type {AxiosResponse} from "axios";
import Dialog from "@/components/tailwind/Dialog/Dialog.tsx";
import ErrorDialog from "@/components/tailwind/Dialog/ErrorDialog.tsx";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";

const authService: AuthService = new AuthService();

const Login = () => {
    return (

        <div className="page-fixed-center-start">
            <div className="page-content">
                <Card className={"grid grid-cols-1 auto-rows-min min-w-0 md:grid-cols-2 gap-6"}>
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
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [dialog, setDialog] = useState(false);


    const requestLogin = async (event: React.MouseEvent) => {
        event.preventDefault();
        setLoading(true)
        setError("")
        setDialog(false)

        if (user.login == "" || user.passwd == "") {
            setError("Preencha os campos")
            setDialog(true);
            setLoading(false);
            return;
        }

        setTimeout(async () => {
            try {
                const response = await authService.loginUser(user) as AxiosResponse;
                setSuccess(response.data)

            } catch (e: unknown) {
                const err = e as NetworkErrorResponse;
                console.log(err)
                setError(err.message)
                setDialog(true)
            } finally {
                setLoading(false)
            }
        }, 500)

        console.log(success)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form className="flex flex-col">
            <Dialog message={"Test Dialog"} icon={"warning"}/>
            <ErrorDialog message={error} isActive={dialog}/>
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
            <AsyncButton
                type="submit"
                onClick={(e: React.MouseEvent) => requestLogin(e)}
                isLoading={loading}
            >
                Entrar
            </AsyncButton>

        </form>
    );
};

export default Login;
