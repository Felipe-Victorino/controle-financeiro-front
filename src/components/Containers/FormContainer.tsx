import type {ReactNode} from "react";
import {Center, Flex} from "@chakra-ui/react";

const FormContainer = ({children}: { children: ReactNode }) => {
    return (
        <Flex h={"full"}>
            <Center
                h={{base: "100%", sm: "70%", md: "70%"}}
                w={{base: "100%"}}
                rounded={"md"}
                shadow={"lg"}
                backgroundColor={"bg.panel"}
            >
                <Flex direction={{base: "column", lg: "row"}} gap={{base: "24"}}>
                    {children}
                </Flex>
            </Center>
        </Flex>
    )
}

export default FormContainer;