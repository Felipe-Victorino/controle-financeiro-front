import PageContainer from "@/components/containers/PageContainer.tsx";
import FormContainer from "@/components/containers/FormContainer.tsx";
import {Button, Field, Flex, Heading, Input, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import type {ForgotValues} from "@/types/Requests.ts";


const PageForgotPassword = () => {
    return (
        <PageContainer>
            <FormContainer>
                <Flex gap={"12"} direction={"column"} justify={"center"} align={"start"} padding={"4"}>
                    <VStack>
                        <Heading size={"6xl"}>
                            Esqueci minha senha
                        </Heading>
                        <Heading>
                            Por favor insira o email associado a sua conta
                        </Heading>
                    </VStack>

                </Flex>
                <ForgotPasswordForm/>
                <Flex gap={"3"} direction={"column"} justify={"center"} align={"start"}>


                </Flex>
            </FormContainer>
        </PageContainer>
    )
}

const ForgotPasswordForm = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()


        setLoading(true)
    }


    return (
        <form>
            <Field.Root invalid={error.email} required>
                <Field.Label>Token:<Field.RequiredIndicator/></Field.Label>
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
        </form>
    )
}

export default PageForgotPassword