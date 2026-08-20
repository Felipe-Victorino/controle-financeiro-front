import PageContainer from "@/components/Containers/PageContainer.tsx";
import {Button, Field, Fieldset, Flex, Heading, Input, VStack} from "@chakra-ui/react";

import React, {useMemo, useState} from "react";
import type {NetworkErrorResponse} from "@/types/ServerErrors.ts";
import {PasswordInput, PasswordStrengthMeter} from "@/components/ui/password-input.tsx";
import {toaster, Toaster} from "@/components/ui/toaster.tsx";
import {authService} from "@/services/AuthService.ts";
import FormContainer from "@/components/Containers/FormContainer.tsx";
import {useNavigate} from "react-router-dom";
import {type Options, passwordStrength} from "check-password-strength";

interface RegisterValues {
    name: string,
    email: string,
    passwd: string
    passwdConfirm: string
}

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
                    <Fieldset.Root>
                        <Fieldset.Legend>

                            Criação de conta
                        </Fieldset.Legend>
                        <Fieldset.HelperText>
                            Preencha os campos abaixo para realizar o cadastro.
                        </Fieldset.HelperText>
                        <Fieldset.Content>
                            <PageRegisterForm/>
                        </Fieldset.Content>
                    </Fieldset.Root>


                </Flex>


            </FormContainer>

        </PageContainer>
    )
}


const strengthOptions: Options<string> = [
    {
        id: 1,
        value: "Fraca",
        minDiversity: 0,
        minLength: 0
    },
    {
        id: 2,
        value: "Medíocre",
        minDiversity: 2,
        minLength: 6
    },
    {
        id: 3,
        value: "Forte",
        minDiversity: 3,
        minLength: 8
    },
    {
        id: 4,
        value: "Muito forte",
        minDiversity: 4,
        minLength: 10
    },
]


const PageRegisterForm = () => {
    const navigate = useNavigate()
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

    const strength = useMemo(() => {
        if (!user.passwd) return 0
        const result = passwordStrength(user.passwd, strengthOptions)
        return result.id
    }, [user.passwd])

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

        if (strength == 0) {
            return;
        }

        setLoading(true)

        setTimeout(
            async () => {
                try {
                    const success = await authService.registerNewUser(user)

                    if (success) {
                        navigate("/auth/login");
                    }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form>
            <Flex gap="4" align="flex-start" justify={"stretch"} direction={"column"}>

                <Field.Root invalid={error.name} required>
                    <Field.Label>Nome:<Field.RequiredIndicator/></Field.Label>
                    <Input
                        value={user.name}
                        name={"name"}
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

                <PasswordStrengthMeter value={strength} w={"100%"}/>

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
            </Flex>
            <Toaster/>
        </form>
    )
}

export default PageRegister