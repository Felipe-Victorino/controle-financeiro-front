import Card from "../../components/Card/Card.tsx";
import BackButton from "../../components/BackButton/BackButton.tsx";
import React, {useState} from "react";
import TextInput from "../../components/Input/TextInput.tsx";
import AsyncButton from "../../components/Button/AsyncButton.tsx";

const RequestPassword = () => {
    return (
        <div>
            <div className="h-1/1 flex flex-row justify-center items-middle">
                <div className="flex flex-col justify-center items-middle">

                    <Card className={"grid grid-cols-1 auto-rows-min md:grid-cols-2 gap-1"}>
                        <div className={"row-start-1  md:col-span-2"}><BackButton/></div>
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
        </div>
    )
}

const RequestPasswordForm = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyUser = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000)
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
                onChangeInput={(e) => handleChange(e)}
            />

            <AsyncButton type="submit" isLoading={loading} onClick={() => verifyUser()}>
                Entrar
            </AsyncButton>


        </form>


    )
}


export default RequestPassword;