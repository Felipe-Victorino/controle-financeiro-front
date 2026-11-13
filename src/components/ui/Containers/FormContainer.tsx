import type {ReactNode} from "react";
import {Flex, Icon, IconButton} from "@chakra-ui/react";
import {MdArrowBack} from "react-icons/md";
import {useNavigate} from "react-router-dom";

interface FormContainerTypes{
    children: ReactNode,
    backButton: boolean,

}

const FormContainer = ({children, backButton}: FormContainerTypes) => {
    const navigate = useNavigate();

    if(backButton){
        return (

            <Flex
                h={{base: "fit-content"}}
                w={{base: "90%", sm: "80%", md: "30em"}}
                rounded={"md"}
                shadow={"lg"}
                padding={"8"}
                backgroundColor={"bg.panel"}
                direction={"column"}
                alignItems={"flex-start"}
                justifyContent={"center"}
            >
                <IconButton variant={"ghost"} onClick={() => (navigate(-1))}>
                    <Icon>
                        <MdArrowBack/>
                    </Icon>
                </IconButton>

                <Flex gap={"2"} direction={"column"} justify={"center"} align={"start"} padding={"8"}>

                    {children}
                </Flex>
            </Flex>

        )
    } else {
        return (

            <Flex
                h={{base: "fit-content"}}
                w={{base: "90%", sm: "80%", md: "30em"}}
                rounded={"md"}
                shadow={"lg"}
                p={"16"}
                backgroundColor={"bg.panel"}
                direction={"column"}

            >
                <Flex gap={"2"} direction={"column"} justify={"center"} align={"center"}>

                    {children}
                </Flex>
            </Flex>

        )
    }

}

export default FormContainer;