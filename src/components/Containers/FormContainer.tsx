import type {ReactNode} from "react";
import {Box, Center, Flex} from "@chakra-ui/react";

const FormContainer = ({children}: { children: ReactNode }) => {
    return (
        <Center w={"100%"} h={"100%"}>
            <Box
                h={{base: "95%", sm: "70%", md: "70%"}}
                w={{base: "95%", sm: "85%", md: "70%", lg: "60%"}}
                padding={"12"}
                rounded={"md"}
                shadow={"lg"}
                backgroundColor={"bg.panel"}
            >
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