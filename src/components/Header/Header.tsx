import {Flex, Heading, HStack, Icon, Link as ChakraLink, LinkBox, LinkOverlay} from "@chakra-ui/react";

import {Link} from "react-router-dom";
import {useState} from "react";
import HeaderDrawer from "@/components/HeaderDrawer/HeaderDrawer.tsx";
import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {GiDolphin} from "react-icons/gi";

const HeaderLogo = () => {
    return (
        <LinkBox>
            <HStack align={"center"} justify={"center"}>
                <Icon>
                    <GiDolphin/>
                </Icon>
                <Heading>
                    <LinkOverlay asChild>
                        <Link to={"/"}>
                            FinFin
                        </Link>
                    </LinkOverlay>
                </Heading>
            </HStack>

        </LinkBox>
    )
}


const PageHeader = () => {
    const [isLoggedIn] = useState(
        () => {
            const loggedIn = sessionStorage.getItem("login");
            return loggedIn;
        }
    );

    if (isLoggedIn == null) {
        return (
            <Flex
                justify={"space-between"}
                w={"100%"}
                h={"6%"}
                paddingX={"6"}
                backgroundColor={"bg.panel"}
                align={"center"}
            >

                <HeaderLogo/>


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
            <Flex
                justify={"space-between"}
                w={"100%"}
                h={"6%"}
                p={{base: "2", sm: "4"}}
                backgroundColor={"bg.panel"}
                align={"center"}
            >
                <HeaderLogo/>

                <HStack>
                    <ColorModeButton/>
                    <HeaderDrawer/>

                </HStack>
            </Flex>
        )
    }
}

export default PageHeader;
