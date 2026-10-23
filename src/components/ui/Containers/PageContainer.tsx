import {Box, VStack} from "@chakra-ui/react";
import type {ReactNode} from "react";
import PageHeader from "@/components/ui/Header/Header.tsx";


const PageContainer = ({children}: { children: ReactNode }) => {

    return (
        <VStack
            justify={"center"}
            align={"center"}
            w={{base: "100%"}}
            h={"100%"}
        >
            <VStack w={{base: "100%", md: "70%"}} h={"100%"} gap={"5%"}>
                <PageHeader/>
                <Box h={"100%"} w={"100%"} paddingY={"6%"}>
                    {children}
                </Box>


            </VStack>


        </VStack>
    )
};

export default PageContainer;