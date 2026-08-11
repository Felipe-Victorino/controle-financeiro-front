import PageContainer from "@/components/containers/PageContainer.tsx";
import FormContainer from "@/components/containers/FormContainer.tsx";
import {Button, Field, Flex, Heading, Input, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import type {ResetValues} from "@/types/Requests.ts";
import {PasswordInput} from "@/components/ui/password-input.tsx";


const PageResetPassword = () => {
    return (
        <PageContainer>
            <FormContainer>
                <Flex gap={"12"} direction={"column"} justify={"center"} align={"start"} padding={"4"}>
                    <VStack>
                        <Heading size={"6xl"}>
                            Criar nova senha
                        </Heading>
                        <Heading>
                            Resetar a senha para recuperação de conta
                        </Heading>
                    </VStack>

                </Flex>
                <ResetPasswordForm/>
                <Flex gap={"3"} direction={"column"} justify={"center"} align={"start"}>


                </Flex>
            </FormContainer>
        </PageContainer>
    )
}

const ResetPasswordForm = () => {
    const [user, setUser] = useState<ResetValues>(
        {
            token: "",
            newPasswd: ""
        }
    )

    const [error, setError] = useState(
        {
            token: false,
            newPasswd: false
        }
    )
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()


        setLoading(true)
    }


    return (
        <form>
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

            <Button
                w={"100%"}
                loading={loading}
                type="submit"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (onSubmit(e))}>
                Entrar
            </Button>
        </form>
    )
}

export default PageResetPassword;