import {Flex, Heading, HStack, Link as ChakraLink} from "@chakra-ui/react";

import {Link} from "react-router-dom";
import {useState} from "react";

const PageHeader = () => {
    const [isLoggedIn] = useState(
        () => {
            const loggedIn = localStorage.getItem("login")
            return loggedIn;
        }
    );

    if (isLoggedIn == null) {
        return (
            <Flex justify={"space-between"} w={"100%"} h={"5%"} p={"4"}>
                <Heading>
                    FinFin
                </Heading>
                <HStack>
                    <ChakraLink asChild>
                        <Link to={"/auth/login"}>Logar</Link>
                    </ChakraLink>

                    <ChakraLink asChild>
                        <Link to={"/auth/signin"}>Registrar</Link>
                    </ChakraLink>
                </HStack>
            </Flex>
        )
    } else {
        return (
            <Flex justify={"space-between"} w={"100%"} h={"5%"} p={"4"}>
                <Heading>
                    FinFin
                </Heading>
                <HStack>

                </HStack>
            </Flex>
        )
    }
}

export default PageHeader;
