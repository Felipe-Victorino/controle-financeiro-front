import "../../styles/Pages.css"
import Card from "../../components/Card/Card.tsx";
import BackButton from "../../components/BackButton/BackButton.tsx";
import React, {useState} from "react";
import ErrorMessage from "../../components/Warning/ErrorMessage.tsx";
import AsyncButton from "../../components/Button/AsyncButton.tsx";
import PasswordInput from "../../components/Input/PasswordInput.tsx";
import AuthService from "../../services/AuthService.ts";
import TextInput from "../../components/Input/TextInput.tsx";
import type {AxiosError} from "axios";

const authService: AuthService = new AuthService();

const ChangePassword = () => {
    return (
        <div className={"page-fixed-center-start"}>
            <div className="flex flex-col justify-center items-middle">

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

    const verifyUser = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await authService.resetPassword(change)
                setSuccess(response.data)
            } catch (e: unknown) {
                const err = e as AxiosError;
                const message = err.message || "Não foi possível realizar essa ação";
                setError(message)
            }
            setLoading(false)
            console.log(success)
        }, 500)
        setError("Unimplemented")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChange({...change, [e.target.name]: e.target.value});
    }
    return (

        <form className="flex flex-col">

            <TextInput
                label={"Insira o token"}
                id={"token"}
                name={"token"}
                value={change.token}
                inputtype={"text"}
                onChanged={(e) => handleChange(e)}/>
            <PasswordInput
                label={"Insira a nova senha"}
                id="password"
                name="password"
                value={change.passwd}
                onChanged={(e) => handleChange(e)}
            />

            <PasswordInput
                label={"Confirmer a nova senha"}
                id="password"
                name="password"
                value={change.passwdConfirm}
                onChanged={(e) => handleChange(e)}
            />
            <ErrorMessage>{error}</ErrorMessage>
            <AsyncButton type="submit" isLoading={loading} onClick={() => verifyUser()}>
                Entrar
            </AsyncButton>


        </form>
    )
}

export default ChangePassword;