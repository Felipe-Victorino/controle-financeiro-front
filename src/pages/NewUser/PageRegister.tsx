import PageContainer from "@/components/containers/PageContainer.tsx";
import {Button, Field, Flex, Heading, Input, Stack, VStack} from "@chakra-ui/react";

import React, {useState} from "react";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";
import {PasswordInput} from "@/components/ui/password-input.tsx";
import {toaster, Toaster} from "@/components/ui/toaster.tsx";
import AuthService from "@/services/AuthService.ts";
import FormContainer from "@/components/containers/FormContainer.tsx";

interface RegisterValues {
    name: string,
    email: string,
    passwd: string
    passwdConfirm: string
}

const authService: AuthService = new AuthService();

const PageRegister = () => {
    return (
        <PageContainer>
            <FormContainer>

                <Flex gap={"12"} direction={"column"} justify={"center"} align={"start"} padding={"4"}>
                    <VStack>
                        <Heading size={"6xl"}>
                            FinFin
                        </Heading>
                        <Heading>
                            Criar uma nova conta
                        </Heading>

                    </VStack>

                </Flex>
                <Flex gap={"3"} direction={"column"} justify={"center"} align={"start"}>
                    <PageRegisterForm/>

                </Flex>


            </FormContainer>

        </PageContainer>
    )
}

const PageRegisterForm = () => {

    const [user, setUser] = useState<RegisterValues>(
        {
            name: '',
            email: '',
            passwd: '',
            passwdConfirm: ''
        }
    )

    const [error, setError] = useState(
        {
            name: false,
            email: false,
            passwd: false,
            passwdConfirm: false
        }
    )
    const [strength, setStrength] = useState(0)
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("")
    const [errorResponse, setErrorResponse] = useState<NetworkErrorResponse>(
        {
            status: 400,
            message: "Um erro ocorreu",
            dateTime: new Date().toISOString(),
            isNetworkIssue: false
        }
    )

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (validateEmptyFields()) {
            return;
        }
        isStrongPassword(user.passwd)
        if (strength == 0) {
            return;
        }

        setLoading(true)

        setTimeout(
            async () => {
                try {
                    await authService.registerNewUser(user)
                    setSuccess('Cadastro realizado com sucesso.');

                } catch (e: unknown) {
                    const err = e as NetworkErrorResponse;
                    console.log(err)
                    setErrorResponse(err)
                    toaster.create(
                        {
                            type: "error",
                            title: errorResponse.message,
                            duration: 3000
                        }
                    )
                } finally {
                    setLoading(false);
                }
                console.log(error);
                console.log(success)
            },
            500
        )
    }

    const validateEmptyFields = () => {
        let hasError: boolean = false;
        const errors = {
            name: false,
            email: false,
            passwd: false,
            passwdConfirm: false
        }
        if (user.name == '') {
            hasError = true;
            errors.name = true;
        }

        if (user.email == "") {
            hasError = true;
            errors.email = true;
        }
        if (user.passwd == "") {
            hasError = true;
            errors.passwd = true;
        }
        if (user.passwdConfirm == "") {
            hasError = true;
            errors.passwdConfirm = true;
        }
        setError(errors);
        return hasError;
    };

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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form>
            <Stack gap="4" align="flex-start" maxW="sm">

                <Field.Root invalid={error.name} required>
                    <Field.Label>Nome:<Field.RequiredIndicator/></Field.Label>
                    <Input
                        value={user.name}
                        name={"email"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Email necessário</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={error.email} required>
                    <Field.Label>Email:<Field.RequiredIndicator/></Field.Label>
                    <Input
                        value={user.email}
                        name={"email"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Email necessário</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={error.passwd} required>
                    <Field.Label>Senha:<Field.RequiredIndicator/></Field.Label>
                    <PasswordInput
                        value={user.passwd}
                        name={"passwd"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Senha necessária</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={error.passwdConfirm} required>
                    <Field.Label>Confirme a senha: <Field.RequiredIndicator/></Field.Label>
                    <PasswordInput
                        value={user.passwdConfirm}
                        name={"passwdConfirm"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Senha necessária</Field.ErrorText>
                </Field.Root>

                <Button
                    w={"100%"}
                    loading={loading}
                    type="submit"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (onSubmit(e))}>
                    Entrar
                </Button>
            </Stack>
            <Toaster/>
        </form>
    )
}

export default PageRegister