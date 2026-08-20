import PageContainer from "@/components/Containers/PageContainer.tsx";
import FormContainer from "@/components/Containers/FormContainer.tsx";
import {Button, Field, Fieldset, Flex, Heading, Input, Stack} from "@chakra-ui/react";
import React, {useState} from "react";
import type {ResetValues} from "@/types/Requests.ts";
import {PasswordInput} from "@/components/ui/password-input.tsx";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";
import {Toaster, toaster} from "@/components/ui/toaster.tsx";
import {authService} from "@/services/AuthService.ts";
import {useNavigate} from "react-router-dom";


const PageResetPassword = () => {
    return (
        <PageContainer>
            <FormContainer>


                <Flex gap={"3"} direction={"column"} justify={"center"} align={"start"}>
                    <Fieldset.Root>
                        <Fieldset.Legend>
                            <Heading>
                                Um token de recuperação de senha foi enviado ao seu email
                            </Heading>

                        </Fieldset.Legend>
                        <Fieldset.HelperText>
                            Por favor, insira o token de 32 dígitos abaixo e altere a sua senha
                        </Fieldset.HelperText>
                        <Fieldset.Content>
                            <ResetPasswordForm/>
                        </Fieldset.Content>
                    </Fieldset.Root>


                </Flex>


            </FormContainer>
        </PageContainer>
    )
}

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<ResetValues>(
        {
            token: "",
            newPasswd: "",
            confirmPasswd: ""
        }
    )

    const [error, setError] = useState(
        {
            token: false,
            newPasswd: false,
            confirmPasswd: false
        }
    )
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const verifyFields = () => {
        let hasError: boolean = false
        const errors = {
            token: false,
            newPasswd: false,
            confirmPasswd: false
        }

        if (user.token == "") {
            errors.token = true
            hasError = true;
        }

        if (user.token == "") {
            errors.newPasswd = true
            hasError = true;
        }

        if (user.newPasswd != user.confirmPasswd) {
            errors.confirmPasswd = true
            hasError = true;
        }
        setError(errors)
        return hasError;
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (verifyFields()) {
            return;
        }

        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await authService.loginUser(user);
                setSuccess(response.data)
                toaster.create({
                    type: "success",
                    title: success,
                    duration: 3000
                })
                setTimeout(() => {
                    navigate("/auth/login")
                }, 3500)
            } catch (e: unknown) {
                const err = e as NetworkErrorResponse;
                console.log(err)

                toaster.create(
                    {
                        type: "error",
                        title: err.message,
                        duration: 3000
                    }
                )

            } finally {
                setLoading(false)
            }
        }, 500)
    }


    return (
        <form>
            <Stack gap="4" align="flex-start" maxW="100%">
                <Field.Root invalid={error.token} required>
                    <Field.Label>Token:<Field.RequiredIndicator/></Field.Label>
                    <Input
                        value={user.token}
                        name={"token"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Token de recuperação de senha necessário</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={error.newPasswd} required>
                    <Field.Label>Senha nova: <Field.RequiredIndicator/></Field.Label>
                    <PasswordInput
                        value={user.newPasswd}
                        name={"newPasswd"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Senha necessária</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={error.confirmPasswd} required>
                    <Field.Label>Confirme a senha: <Field.RequiredIndicator/></Field.Label>
                    <PasswordInput
                        value={user.confirmPasswd}
                        name={"confirmPasswd"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Confirme a sua senha</Field.ErrorText>
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

export default PageResetPassword;