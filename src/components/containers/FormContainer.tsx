import type {ReactNode} from "react";
import {Box, Center, Flex} from "@chakra-ui/react";

const FormContainer = ({children}: { children: ReactNode }) => {
    return (
        <Center w={"100%"} h={"100%"}>
            <Box h={{base: "75%", md: "60%"}} w={{base: "95%", md: "40%"}} padding={"12"} borderColor={"teal.500"}
                 rounded={"md"} shadow={"md"}
                 borderWidth={"1px"}>
                <Center w={"100%"} h={"100%"}>
                    <Flex direction={{base: "column", lg: "row"}} gap={{base: "24"}}>
                        {children}
                    </Flex>

                </Center>

            </Box>
        </Center>
    )
}

export default FormContainer;