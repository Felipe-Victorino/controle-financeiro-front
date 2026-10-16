import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import {
    Button,
    Field,
    Fieldset,
    Input,
    Link as ChakraLink,
    Stack,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {PasswordInput} from "@/components/ui/password-input.tsx";
import type {AxiosResponse} from "axios";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";
import {Link, useNavigate} from "react-router-dom";
import type {LoginValues} from "@/types/Requests.ts";

import {Toaster, toaster} from "@/components/ui/toaster.tsx";
import FormContainer from "@/components/ui/Containers/FormContainer.tsx";
import AuthService from "@/services/AuthService.ts";
import type {AuthLoginResponse} from "@/types/ServerResponse.ts";
import {BigLogo} from "@/components/ui/BigLogo/BigLogo.tsx";
import {AuthContainer} from "@/components/ui/Containers/AuthContainer.tsx";


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
                const response = await AuthService.instance.loginUser(user) as AxiosResponse;

                const data = response.data as AuthLoginResponse;

                if (response) {
                    localStorage.setItem("name", data.name)
                    localStorage.setItem("login", "true")
                    navigate("/dashboard");
                }

            } catch (e: unknown) {
                const err = e as NetworkErrorResponse;
                console.log(err);
                toaster.create(
                    {
                        type: "error",
                        title: err.message,
                        duration: 3000
                    }
                );

            } finally {
                setLoading(false);
            }
        }, 500)

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <Fieldset.Root>
            <Fieldset.Content>
                <form>
                    <Stack gap="4" align="center" maxW="sm">

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

                        <ChakraLink asChild>
                            <Link to={"/auth/forgot"}>Esqueci minha senha</Link>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <Link to={"/auth/signin"}>Criar uma conta</Link>
                        </ChakraLink>
                    </Stack>
                    <Toaster/>
                </form>
            </Fieldset.Content>
        </Fieldset.Root>


    )
}

export default PageLogin;