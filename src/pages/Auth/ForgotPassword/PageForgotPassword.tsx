import PageContainer from "@/components/Containers/PageContainer.tsx";
import FormContainer from "@/components/Containers/FormContainer.tsx";
import {Button, Field, Fieldset, Flex, Heading, Input, Stack} from "@chakra-ui/react";
import React, {useState} from "react";
import type {ForgotValues} from "@/types/Requests.ts";
import type {AxiosResponse} from "axios";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";
import {Toaster, toaster} from "@/components/ui/toaster.tsx";
import AuthService from "@/services/AuthService.ts";
import {useNavigate} from "react-router-dom";
import type {AuthForgotResponse} from "@/types/ServerResponse.ts";


const PageForgotPassword = () => {
    return (
        <PageContainer>
            <FormContainer>

                <Flex gap={"3"} direction={"column"} justify={"center"} align={"start"}>
                    <Fieldset.Root>
                        <Fieldset.Legend>
                            <Heading>
                                Esqueci minha senha:
                            </Heading>

                        </Fieldset.Legend>
                        <Fieldset.HelperText>
                            Por favor, insira no campo abaixo o email associado a sua conta, para podermos verificar sua
                            identidade
                        </Fieldset.HelperText>
                        <Fieldset.Content>
                            <ForgotPasswordForm/>
                        </Fieldset.Content>
                    </Fieldset.Root>


                </Flex>


            </FormContainer>
        </PageContainer>
    )
}

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<ForgotValues>(
        {
            email: "",
        }
    )

    const [error, setError] = useState(
        {
            email: false,
        }
    )
    const [loading, setLoading] = useState(false)
    const [errorResponse, setErrorResponse] = useState<NetworkErrorResponse>(
        {
            status: 400,
            message: "Um erro ocorreu",
            dateTime: new Date().toISOString(),
            isNetworkIssue: false
        }
    )

    const verifyFields = () => {
        let hasError: boolean = false;
        const errors = {
            email: false
        }
        if (user.email == "") {
            errors.email = true
            hasError = true;
        }
        setError(errors)
        return hasError;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (verifyFields()) {
            return;
        }

        setLoading(true);

        try {
            const response = await AuthService.instance.requestResetCode(user.email) as AxiosResponse;
            const message = response.data as AuthForgotResponse
            console.log(message)
            if (response) {
                navigate("/auth/reset")
            }

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

    }


    return (
        <form>
            <Stack gap="4" align="flex-start" maxW="100%">
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

export default PageForgotPassword