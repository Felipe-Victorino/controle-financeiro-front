import Card from "@/components/tailwind/Card/Card.tsx";
import BackButton from "@/components/tailwind/BackButton/BackButton.tsx";
import React, {useState} from "react";
import TextInput from "@/components/tailwind/Input/TextInput.tsx";
import AsyncButton from "@/components/tailwind/Button/AsyncButton.tsx";
import "../../styles/Pages.css"
import AuthService from "../../services/AuthService.ts";
import {useNavigate} from "react-router-dom";
import ErrorDialog from "@/components/tailwind/Dialog/ErrorDialog.tsx";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";

const authService: AuthService = new AuthService();

const RequestPassword = () => {
    return (

        <div className="page-fixed-center-start">
            <div className="page-content">

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
    const [dialog, setDialog] = useState(false);

    const verifyEmail = async (event: React.MouseEvent) => {
        event.preventDefault()
        setLoading(true);
        setDialog(false)
        setTimeout(
            async () => {
                try {
                    const response = await authService.requestResetCode(email)
                    setSuccess(response.data)
                    console.log(success);
                    if (response.status == 200) {
                        navigate("/auth/reset")
                    } else {
                        setError(response.data)
                        setDialog(true)
                    }
                } catch (e: unknown) {
                    const err = e as NetworkErrorResponse;
                    const message =
                        err.message ||
                        'Nao foi possivel realizar o cadastro.';
                    setError(message);
                    setDialog(true)
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
            <ErrorDialog message={error} isActive={dialog}/>
            <TextInput
                label={"Confirme seu e-mail"}
                id="email"
                name="email"
                value={email}
                inputtype="text"
                onChanged={(e) => handleChange(e)}
            />

            <AsyncButton
                type="submit" isLoading={loading}
                onClick={(e: React.MouseEvent<Element, MouseEvent>) => verifyEmail(e)}
            >
                Restaurar senha
            </AsyncButton>


        </form>


    )
}


export default RequestPassword;