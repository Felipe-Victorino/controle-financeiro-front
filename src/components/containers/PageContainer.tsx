import {Box, VStack} from "@chakra-ui/react";
import type {ReactNode} from "react";
import PageHeader from "@/components/Header.tsx";


const PageContainer = ({children}: { children: ReactNode }) => {

    return (
        <VStack h={"100%"}>
            <PageHeader/>
            <Box w={"100%"} h={"100%"}>
                {children}
            </Box>

        </VStack>
    )
};

export default PageContainer;