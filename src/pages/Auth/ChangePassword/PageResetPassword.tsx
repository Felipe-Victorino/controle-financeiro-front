import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import FormContainer from "@/components/ui/Containers/FormContainer.tsx";
import {Button, Heading,} from "@chakra-ui/react";
import React, {useMemo, useState} from "react";
import type {ResetValues} from "@/types/Auth/AuthRequests.ts";
import {PasswordStrengthMeter} from "@/components/ui/password-input.tsx";

import {toaster} from "@/components/ui/toaster.tsx";
import AuthService from "@/services/AuthService.ts";
import {useNavigate} from "react-router-dom";

import {AuthContainer} from "@/components/ui/Containers/AuthContainer.tsx";
import {BigLogo} from "@/components/ui/BigLogo/BigLogo.tsx";
import {useFormState} from "@/hooks/useFormState.ts";
import {useRequest} from "@/hooks/useRequest.ts";
import {passwordStrength} from "check-password-strength";
import {strengthOptions} from "@/types/PasswordStrengthValues.ts";
import {findEmptyFields} from "@/hooks/validation.ts";
import {FormFieldset} from "@/components/ui/Containers/FormFieldset.tsx";
import {TextField} from "@/components/ui/Fields/TextField.tsx";
import {PasswordField} from "@/components/ui/Fields/PasswordField.tsx";


const PageResetPassword = () => {
    return (
        <PageContainer>
            <AuthContainer>
                <BigLogo/>
                <FormContainer backButton={true}>


                    <ResetPasswordForm/>


                </FormContainer>
            </AuthContainer>


        </PageContainer>
    )
}

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const REQUIRED_FIELDS = ["token", "newPasswd", "confirmPasswd"] as const;
    const {values, handleChange} = useFormState<ResetValues>({
        token: "",
        newPasswd: "",
        confirmPasswd: ""
    })

    const [emptyFields, setEmptyFields] = useState<(keyof ResetValues)[]>([]);
    const [mismatch, setMismatch] = useState(false);

    const {loading, run} = useRequest((err) =>
        toaster.create({type: "error", title: err.message, duration: 3000}),
    );

    const strength = useMemo(
        () => (values.newPasswd ? passwordStrength(values.newPasswd, strengthOptions).id : 0),
        [values.newPasswd],
    );

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const empty = findEmptyFields(values, [...REQUIRED_FIELDS]);
        const notEqual = values.newPasswd !== values.confirmPasswd;
        setEmptyFields(empty);
        setMismatch(notEqual);
        if (empty.length > 0 || notEqual) return;

        await run(async () => {
            const response
                = await AuthService.instance.resetPassword(values)
            if (response) {

                toaster.create({type: "success", title: "Senha alterada com sucesso.", duration: 3000});

                navigate("/login")
            }
        })

    }


    return (
        <FormFieldset
            legend={<Heading>Crie uma nova senha:</Heading>}
            helperText="Insira o token de recuperação enviado no seu email para criar uma nova senha"
            errorText="A confirmação de senha deve ser igual à senha"
            invalid={mismatch}
            onSubmit={onSubmit}
        >
            <TextField
                label="Token de recuperação" name="token" required
                value={values.token} onChange={handleChange}
                invalid={emptyFields.includes("token")} errorText="Token necessário"
            />
            <PasswordField
                label="Senha" name="passwd" required
                value={values.newPasswd} onChange={handleChange}
                invalid={emptyFields.includes("newPasswd")} errorText="Senha necessária"
            />
            <PasswordStrengthMeter value={strength} w="100%"/>
            <PasswordField
                label="Confirme a senha" name="confirmPassword" required
                value={values.confirmPasswd} onChange={handleChange}
                invalid={emptyFields.includes("confirmPasswd")} errorText="Confirmação necessária"
            />
            <Button w="100%" type="submit" loading={loading}>
                Alterar senha
            </Button>
        </FormFieldset>
    )
}

export default PageResetPassword;