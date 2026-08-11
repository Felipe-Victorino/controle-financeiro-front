import PageContainer from "@/components/containers/PageContainer.tsx";
import {Button, Field, Flex, Heading, Input, Link as ChakraLink, Stack, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {PasswordInput} from "@/components/ui/password-input.tsx";
import type {AxiosResponse} from "axios";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";
import {Link} from "react-router-dom";

import AuthService from "@/services/AuthService.ts";
import {Toaster, toaster} from "@/components/ui/toaster.tsx";
import FormContainer from "@/components/containers/FormContainer.tsx";

interface LoginValues {
    email: string,
    passwd: string,
}

const authService: AuthService = new AuthService();

const PageLogin = () => {
    return (
        <PageContainer>
            <FormContainer>

                <Flex gap={"12"} direction={"column"} justify={"center"} align={"start"} padding={"4"}>
                    <VStack>
                        <Heading size={"6xl"}>
                            FinFin
                        </Heading>
                        <Heading>
                            Logar no serviço
                        </Heading>
                    </VStack>

                </Flex>

                <Flex gap={"3"} direction={"column"} justify={"center"} align={"start"}>
                    <PageLoginForm/>
                    <ChakraLink asChild>
                        <Link to={"/auth/forgot"}>Esqueci minha senha</Link>
                    </ChakraLink>
                    <ChakraLink>
                        <Link to={"/auth/signin"}>Criar uma conta</Link>
                    </ChakraLink>


                </Flex>


            </FormContainer>

        </PageContainer>
    )
}

const PageLoginForm = () => {
    const [user, setUser] = useState<LoginValues>(
        {
            email: '',
            passwd: '',
        }
    )

    const [error, setError] = useState(
        {
            email: false,
            passwd: false,
        }
    )
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

    const verifyFields: () => boolean = () => {
        let hasError: boolean = false;
        const errors = {
            email: false,
            passwd: false
        }

        if (user.email == '') {
            hasError = true;
            errors.email = true
        }

        if (user.passwd == '') {
            hasError = true;
            errors.passwd = true
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
                const response = await authService.loginUser(user) as AxiosResponse;
                setSuccess(response.data)

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
                setLoading(false)
            }
        }, 500)

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form>
            <Stack gap="4" align="flex-start" maxW="sm">

                <Field.Root invalid={error.email} required>
                    <Field.Label>Email <Field.RequiredIndicator/></Field.Label>
                    <Input
                        value={user.email}
                        name={"email"}
                        onChange={(e) => {
                            handleChange(e)
                        }}/>
                    <Field.ErrorText>Email necessário</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={error.passwd} required>
                    <Field.Label>Senha <Field.RequiredIndicator/></Field.Label>
                    <PasswordInput
                        value={user.passwd}
                        name={"passwd"}
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

export default PageLogin;