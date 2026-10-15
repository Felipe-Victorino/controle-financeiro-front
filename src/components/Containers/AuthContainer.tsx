import {Flex} from "@chakra-ui/react";
import type {ReactNode} from "react";

export const AuthContainer = ({children}: { children: ReactNode }) => {
    return (
        <Flex
            h={{base: "100%", sm: "70%", md: "70%"}}
            w={{base: "100%"}}
            direction={{base: "column", lg: "row"}}
            justify={"center"}
            align={"center"}
            gap={{base: "24"}}
        >
            {children}
        </Flex>
    )
}