import {Box, Flex, Separator, Stack} from "@chakra-ui/react"
import type {ReactNode} from "react";

interface DashStructure {
    dashHeader: ReactNode
    children: ReactNode[]

}

const DashboardContainer = ({dashHeader, children}: DashStructure) => {
    return (
        <Stack p={"1%"} justify={"stretch"} align={"stretch"}>
            <Box>
                {dashHeader}
            </Box>
            <Separator/>
            <Flex direction={{base: "column"}}>
                {children}
            </Flex>
        </Stack>
    )
}

export default DashboardContainer;