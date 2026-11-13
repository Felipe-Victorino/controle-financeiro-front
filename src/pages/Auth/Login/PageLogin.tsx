import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import {
    Button,
    Fieldset, Heading,
    Link as ChakraLink,

} from "@chakra-ui/react";
import React, {useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import type {LoginValues} from "@/types/Auth/AuthRequests.ts";

import {toaster} from "@/components/ui/toaster.tsx";
import FormContainer from "@/components/ui/Containers/FormContainer.tsx";
import AuthService from "@/services/AuthService.ts";
import {BigLogo} from "@/components/ui/BigLogo/BigLogo.tsx";
import {AuthContainer} from "@/components/ui/Containers/AuthContainer.tsx";
import {findEmptyFields} from "@/hooks/validation.ts";
import {useFormState} from "@/hooks/useFormState.ts";
import {useRequest} from "@/hooks/useRequest.ts";

import {FormFieldset} from "@/components/ui/Containers/FormFieldset.tsx";
import {TextField} from "@/components/ui/Fields/TextField.tsx";
import {PasswordField} from "@/components/ui/Fields/PasswordField.tsx";


const PageLogin = () => {
    return (
        <PageContainer>
            <AuthContainer>
                <BigLogo/>
                <FormContainer backButton={false}>
                    <Fieldset.Root>
                        <Fieldset.Content>
                            <PageLoginForm/>
                        </Fieldset.Content>
                    </Fieldset.Root>
                </FormContainer>
            </AuthContainer>
        </PageContainer>
    )
}

const PageLoginForm = () => {
    const navigate = useNavigate();
    const REQUIRED_FIELDS = ["email", "passwd"] as const;
    const {values, handleChange} = useFormState<LoginValues>({
        email: "", passwd: ""
    });
    const [emptyFields, setEmptyFields] = useState<(keyof LoginValues)[]>([]);

    const {loading, run, error} = useRequest((err) =>
        toaster.create({type: "error", title: err.message, duration: 3000}),
    );


    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const empty = findEmptyFields(values, [...REQUIRED_FIELDS]);
        setEmptyFields(empty);

        await run(async () => {
            const created
                = await AuthService.instance.login(values);
            if (created) {
                navigate("/home");
            }
        });

    }

    return (
        <FormFieldset
            legend={<Heading>Login</Heading>}
            helperText="Preencha os campos abaixo para entrar na sua conta"
            errorText="Preencha todos os campos"
            invalid={!!error}
            onSubmit={onSubmit}
        >

            <TextField
                label="Email" name="email" type="email" required
                value={values.email} onChange={handleChange}
                invalid={emptyFields.includes("email")}
                errorText="Email necessário"
            />
            <PasswordField
                label="Senha" name="passwd" required
                value={values.passwd} onChange={handleChange}
                invalid={emptyFields.includes("passwd")}
                errorText="Senha necessária"
            />

            <Button w="100%" type="submit" loading={loading}>
                Entrar
            </Button>
            <ChakraLink asChild>
                <Link to={"/forgot"}>Esqueci minha senha</Link>
            </ChakraLink>
            <ChakraLink asChild>
                <Link to={"/signin"}>Criar uma conta</Link>
            </ChakraLink>
        </FormFieldset>


    )
}

export default PageLogin;