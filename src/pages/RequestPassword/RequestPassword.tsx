import Card from "../../components/Card/Card.tsx";
import BackButton from "../../components/BackButton/BackButton.tsx";
import React, {useState} from "react";
import TextInput from "../../components/Input/TextInput.tsx";
import AsyncButton from "../../components/Button/AsyncButton.tsx";
import ErrorMessage from "../../components/Warning/ErrorMessage.tsx";
import "../../styles/Pages.css"
import AuthService from "../../services/AuthService.ts";
import type {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

const authService: AuthService = new AuthService();

const RequestPassword = () => {
    return (

        <div className="page-fixed-center-start">
            <div className="flex flex-col justify-center items-middle">

                <Card className={"grid grid-cols-1 auto-rows-min md:grid-cols-2 gap-1"}>
                    <div className={"row-start-1  md:col-span-2"}><BackButton to={"/"}/></div>
                    <div
                        className={"row-start-2 md:col-start-1 md:row-start-2 flex flex-col justify-center items-start gap-20"}>
                        <h2 className="header-title">Esqueci <br/> a senha</h2>
                    </div>
                    <div className={"row-start-3 md:col-start-2 md:row-start-2"}>
                        <RequestPasswordForm/>
                    </div>

                </Card>
            </div>
        </div>

    )
}

const RequestPasswordForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyEmail = async (event: React.MouseEvent) => {
        event.preventDefault()
        setLoading(true);
        setTimeout(
            async () => {
                try {
                    const response = await authService.requestResetCode(email)
                    setSuccess(response.data)
                    console.log(success);
                    if (response.status == 200) {
                        navigate("auth/reset")
                    }
                } catch (e: unknown) {
                    const err = e as AxiosError;
                    const message = err.message || "Não foi possível realizar essa ação";
                    setError(message)
                } finally {
                    setLoading(false)
                }
            },
            500)

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    return (

        <form className="flex flex-col">
            <TextInput
                label={"Confirme seu e-mail"}
                id="email"
                name="email"
                value={email}
                inputtype="text"
                onChanged={(e) => handleChange(e)}
            />

            <AsyncButton type="submit" isLoading={loading}
                         onClick={(e: React.MouseEvent<Element, MouseEvent>) => verifyEmail(e)}>
                Entrar
            </AsyncButton>
            <ErrorMessage>{error}</ErrorMessage>


        </form>


    )
}


export default RequestPassword;