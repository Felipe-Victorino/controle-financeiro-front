import "../../styles/Pages.css"
import Card from "@/components/tailwind/Card/Card.tsx";
import BackButton from "@/components/tailwind/BackButton/BackButton.tsx";
import React, {useState} from "react";

import AsyncButton from "@/components/tailwind/Button/AsyncButton.tsx";
import PasswordInput from "@/components/tailwind/Input/PasswordInput.tsx";
import AuthService from "../../services/AuthService.ts";
import TextInput from "@/components/tailwind/Input/TextInput.tsx";
import type {AxiosResponse} from "axios";
import ErrorDialog from "@/components/tailwind/Dialog/ErrorDialog.tsx";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";

const authService: AuthService = new AuthService();

const ChangePassword = () => {
    return (
        <div className={"page-fixed-center-start"}>
            <div className="page-content">

                <Card className={"grid grid-cols-1 auto-rows-min md:grid-cols-2 gap-1"}>
                    <div className={"row-start-1  md:col-span-2"}><BackButton to={"/"}/></div>
                    <div
                        className={"row-start-2 md:col-start-1 md:row-start-2 flex flex-col justify-center items-start gap-20"}>
                        <h2 className="header-title">Confirmar <br/> a senha</h2>
                    </div>
                    <div className={"row-start-3 md:col-start-2 md:row-start-2"}>
                        <ChangePasswordForm/>
                    </div>

                </Card>
            </div>
        </div>
    )
}

const ChangePasswordForm = () => {
    const [change, setChange] = useState({token: "", passwd: "", passwdConfirm: ""},)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);

    const verifyUser = async (event: React.MouseEvent) => {
        event.preventDefault()
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await authService.resetPassword(change) as AxiosResponse;
                setSuccess(response.data)
            } catch (e: unknown) {
                const err = e as NetworkErrorResponse;
                const message =
                    err.message ||
                    'Nao foi possivel realizar o cadastro.';
                setError(message);
                setDialog(true)
            }
            setLoading(false)
            console.log(success)
        }, 500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChange({...change, [e.target.name]: e.target.value});
    }
    return (

        <form className="flex flex-col">
            <ErrorDialog message={error} isActive={dialog}/>
            <TextInput
                label={"Insira o token"}
                id={"token"}
                name={"token"}
                value={change.token}
                inputtype={"text"}
                onChanged={(e) => handleChange(e)}/>
            <PasswordInput
                label={"Insira a nova senha"}
                id="passwd"
                name="passwd"
                value={change.passwd}
                onChanged={(e) => handleChange(e)}
            />

            <PasswordInput
                label={"Confirmar a nova senha"}
                id="passwdConfirm"
                name="passwdConfirm"
                value={change.passwdConfirm}
                onChanged={(e) => handleChange(e)}
            />
            <AsyncButton type="submit" isLoading={loading} onClick={(e: React.MouseEvent) => verifyUser(e)}>
                Entrar
            </AsyncButton>


        </form>
    )
}

export default ChangePassword;