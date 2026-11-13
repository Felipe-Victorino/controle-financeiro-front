import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import FormContainer from "@/components/ui/Containers/FormContainer.tsx";
import {Button, Heading} from "@chakra-ui/react";
import React, {useState} from "react";
import type {ForgotValues} from "@/types/Auth/AuthRequests.ts";

import {toaster} from "@/components/ui/toaster.tsx";
import AuthService from "@/services/AuthService.ts";
import {useNavigate} from "react-router-dom";

import {AuthContainer} from "@/components/ui/Containers/AuthContainer.tsx";
import {BigLogo} from "@/components/ui/BigLogo/BigLogo.tsx";
import {FormFieldset} from "@/components/ui/Containers/FormFieldset.tsx";
import {TextField} from "@/components/ui/Fields/TextField.tsx";
import {useFormState} from "@/hooks/useFormState.ts";
import {useRequest} from "@/hooks/useRequest.ts";
import {findEmptyFields} from "@/hooks/validation.ts";


const PageForgotPassword = () => {
    return (
        <PageContainer>
            <AuthContainer>
                <BigLogo/>
                <FormContainer backButton={true}>
                    <ForgotPasswordForm/>
                </FormContainer>
            </AuthContainer>


        </PageContainer>
    )
}

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const REQUIRED_FIELDS = ["email"] as const;
    const {values, handleChange} = useFormState<ForgotValues>({
        email: ""
    });
    const [emptyFields, setEmptyFields] = useState<(keyof ForgotValues)[]>([]);

    const {loading, run, error} = useRequest((err) =>
        toaster.create({type: "error", title: err.message, duration: 3000}),
    );


    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const empty = findEmptyFields(values, [...REQUIRED_FIELDS]);
        setEmptyFields(empty);

        await run(async () => {
            const response
                = await AuthService.instance.requestResetCode(values);
            if (response) {
                navigate("/login");
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
            <Button w="100%" type="submit" loading={loading}>
                Recuperar senha
            </Button>
        </FormFieldset>
    )
}

export default PageForgotPassword