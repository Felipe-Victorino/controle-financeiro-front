import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import {Button, Heading} from "@chakra-ui/react";

import React, {useMemo, useState} from "react";
import {PasswordStrengthMeter} from "@/components/ui/password-input.tsx";
import {toaster} from "@/components/ui/toaster.tsx";
import AuthService from "@/services/AuthService.ts";
import FormContainer from "@/components/ui/Containers/FormContainer.tsx";
import {useNavigate} from "react-router-dom";
import {passwordStrength} from "check-password-strength";
import {AuthContainer} from "@/components/ui/Containers/AuthContainer.tsx";
import {BigLogo} from "@/components/ui/BigLogo/BigLogo.tsx";
import {useFormState} from "@/hooks/useFormState.ts";
import {useRequest} from "@/hooks/useRequest.ts";
import {findEmptyFields} from "@/hooks/validation.ts";
import {FormFieldset} from "@/components/ui/Containers/FormFieldset.tsx";
import {TextField} from "@/components/ui/Fields/TextField.tsx";
import {PasswordField} from "@/components/ui/Fields/PasswordField.tsx";
import {strengthOptions} from "@/types/PasswordStrengthValues.ts";
import type {RegisterValues} from "@/types/Auth/AuthRequests.ts";

const PageRegister = () => {
    return (
        <PageContainer>
            <AuthContainer>
                <BigLogo/>
                <FormContainer backButton={true}>
                    <PageRegisterForm/>
                </FormContainer>
            </AuthContainer>
        </PageContainer>
    )
}


const REQUIRED_FIELDS = ["name", "email", "passwd", "passwdConfirm"] as const;
const PageRegisterForm = () => {
    const navigate = useNavigate();
    const {values, handleChange} = useFormState<RegisterValues>({
        name: "", email: "", passwd: "", passwdConfirm: "",
    });
    const [emptyFields, setEmptyFields] = useState<(keyof RegisterValues)[]>([]);
    const [mismatch, setMismatch] = useState(false);

    const {loading, run} = useRequest((err) =>
        toaster.create({type: "error", title: err.message, duration: 3000}),
    );

    const strength = useMemo(
        () => (values.passwd ? passwordStrength(values.passwd, strengthOptions).id : 0),
        [values.passwd],
    );

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const empty = findEmptyFields(values, [...REQUIRED_FIELDS]);
        const notEqual = values.passwd !== values.passwdConfirm;
        setEmptyFields(empty);
        setMismatch(notEqual);
        if (empty.length > 0 || notEqual) return;

        await run(async () => {
            const created
                = await AuthService.instance.registerNewUser(values);
            if (created) {
                toaster.create({type: "success", title: "Cadastro realizado com sucesso.", duration: 3000});
                navigate("/login");
            }
        });
    };

    return (
        <FormFieldset
            legend={<Heading>Criação de conta</Heading>}
            helperText="Preencha os campos abaixo para criar uma conta nova"
            errorText="A confirmação de senha deve ser igual à senha"
            invalid={mismatch}
            onSubmit={onSubmit}
        >
            <TextField
                label="Nome" name="name" required
                value={values.name} onChange={handleChange}
                invalid={emptyFields.includes("name")} errorText="Nome necessário"
            />
            <TextField
                label="Email" name="email" type="email" required
                value={values.email} onChange={handleChange}
                invalid={emptyFields.includes("email")} errorText="Email necessário"
            />
            <PasswordField
                label="Senha" name="passwd" required
                value={values.passwd} onChange={handleChange}
                invalid={emptyFields.includes("passwd")} errorText="Senha necessária"
            />
            <PasswordStrengthMeter value={strength} w="100%"/>
            <PasswordField
                label="Confirme a senha" name="passwdConfirm" required
                value={values.passwdConfirm} onChange={handleChange}
                invalid={emptyFields.includes("passwdConfirm")} errorText="Confirmação necessária"
            />
            <Button w="100%" type="submit" loading={loading}>
                Criar conta
            </Button>
        </FormFieldset>
    );
}

export default PageRegister