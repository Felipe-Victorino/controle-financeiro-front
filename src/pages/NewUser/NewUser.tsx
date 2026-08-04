import TextInput from "../../components/Input/TextInput";
import Card from "../../components/Card/Card";
import "../../styles/TextHeadings.css"
import React, {useState} from "react";
import type {AxiosError} from "axios";
import AsyncButton from "../../components/Button/AsyncButton.tsx";
import Divider from "../../components/Divider/Divider.tsx";
import BackButton from "../../components/BackButton/BackButton.tsx";
import ErrorMessage from "../../components/Warning/ErrorMessage.tsx";
import "../../styles/Pages.css"
import AuthService from "../../services/AuthService.ts";
import PasswordInput from "../../components/Input/PasswordInput.tsx";

const authService: AuthService = new AuthService();

const NewUser = () => {

    return (

        <div className="page-fixed-center-start">
            <div className="flex flex-col justify-center items-middle">

                <Card className={"grid grid-cols-1 auto-rows-min md:grid-cols-2 gap-1"}>
                    <div className={"row-start-1  md:col-span-2"}><BackButton to={"/"}/></div>
                    <div
                        className={"row-start-2 md:col-start-1 md:row-start-2 flex flex-col justify-center items-start gap-20"}>
                        <h2 className="header-title">Cadastrar <br/> nova conta</h2>
                    </div>
                    <div className={"row-start-3 md:col-start-2 md:row-start-2"}>
                        <NewUserForm/>
                    </div>

                </Card>
            </div>
        </div>

    );
};

const NewUserForm = () => {
    const [user, setUser] = useState({name: "", email: "", passwd: "", passwdConfirm: ""},);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    /*
    const verifyLogin () => {
        Navigate()
    }

    */

    const createRegistration = async (event: React.MouseEvent) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (user.passwd !== user.passwdConfirm) {
            setError('As senhas devem ser iguais.');
            console.log(error)
            return;
        }

        setLoading(true);

        setTimeout(
            async () => {
                try {
                    await authService.registerNewUser(user)
                    setSuccess('Cadastro realizado com sucesso.');

                } catch (e: unknown) {
                    const err = e as AxiosError;
                    const message =
                        err.message ||
                        'Nao foi possivel realizar o cadastro.';
                    setError(message);
                } finally {
                    setLoading(false);
                }
                console.log(error);
                console.log(success)
            },
            500
        )


    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form className="flex flex-col gap-4">
            <TextInput
                label={"Nome"}
                id="name"
                name="name"
                value={user.name}
                inputtype="text"
                onChanged={(e) => handleChange(e)}
            />
            <TextInput
                label={"Email"}
                id="email"
                name="email"
                value={user.email}
                inputtype="text"
                onChanged={(e) => handleChange(e)}
            />

            <Divider/>

            <PasswordInput
                label={"Senha"}
                id="passwd"
                name="passwd"
                value={user.passwd}
                onChanged={(e) => handleChange(e)}
            />
            <PasswordInput
                label={"Confirmação da Senha"}
                id="confirm"
                name="passwdConfirm"
                value={user.passwdConfirm}
                onChanged={(e) => handleChange(e)}
            />

            <AsyncButton
                type={"submit"}
                onClick={(e: React.MouseEvent<Element, MouseEvent>) => createRegistration(e)}
                isLoading={loading}
            >
                Cadastrar
            </AsyncButton>

            <ErrorMessage> {error}</ErrorMessage>
        </form>


    );
};

export default NewUser;
