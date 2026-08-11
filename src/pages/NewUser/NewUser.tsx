import TextInput from "@/components/tailwind/Input/TextInput";
import Card from "@/components/tailwind/Card/Card";
import "../../styles/TextHeadings.css"
import React, {useState} from "react";
import AsyncButton from "@/components/tailwind/Button/AsyncButton.tsx";
import Divider from "@/components/tailwind/Divider/Divider.tsx";
import "../../styles/Pages.css"
import AuthService from "../../services/AuthService.ts";
import PasswordInput from "@/components/tailwind/Input/PasswordInput.tsx";
import ErrorDialog from "@/components/tailwind/Dialog/ErrorDialog.tsx";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";

const authService: AuthService = new AuthService();

const NewUser = () => {

    return (

        <div className="page-fixed-center-start">
            <div className="page-content">

                <Card className={"grid grid-cols-1 auto-rows-min min-w-0 md:grid-cols-2 gap-1"}>
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
    const [dialog, setDialog] = useState(false);
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [strength, setStrength] = useState(0);

    const isStrongPassword = (password: string) => {

        let strength: number = 0;

        if (password.length >= 8) {
            strength++;
        }

        if (/[A-Z]+/.test(password)) {
            strength++;
        }

        if (/[0-9]+/.test(password)) {
            strength++;
        }

        if (/[!@#$&*%]+/.test(password)) {
            strength++;
        }

        if (password.length < 8) {
            strength = 0;
        }

        setStrength(strength)
        return strength
    };

    const validateFields = () => {
        if (user.name == "" || user.email == "" || user.passwd == "" || user.passwdConfirm == "") {
            setError("Um ou mais campos estão vazios, por favor preenchê-los")
            return false;
        }
        return true;
    };


    const createRegistration = async (event: React.MouseEvent) => {
        event.preventDefault();
        setDialog(false)
        setError('');

        setSuccess('');
        isStrongPassword(user.passwd);
        console.log("password strength: " + strength)

        if (!validateFields()) {
            setDialog(true);
            return;
        }

        if (strength == 0) {
            setError("Senha é muito fraca, por favor inserir números, letras maiúsculas e caracters especiais")
            setDialog(true)
            return
        }

        if (user.passwd !== user.passwdConfirm) {
            setError('As senhas devem ser iguais.');
            setDialog(true)
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
                    const err = e as NetworkErrorResponse;
                    const message =
                        err.message ||
                        'Nao foi possivel realizar o cadastro.';
                    setError(message);
                    setDialog(true)
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
        <form className="flex flex-col gap-4 grow-0">
            <ErrorDialog message={error} isActive={dialog}/>
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


        </form>


    );
};

export default NewUser;
