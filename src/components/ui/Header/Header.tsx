import {Flex, Heading, HStack, Icon, Link as ChakraLink, LinkBox, LinkOverlay} from "@chakra-ui/react";

import {Link} from "react-router-dom";
import HeaderDrawer from "@/components/ui/HeaderDrawer/HeaderDrawer.tsx";
import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {GiDolphin} from "react-icons/gi";
import authService from "@/services/AuthService.ts";

const HeaderLogo = ({homepage}: { homepage: string }) => {


    return (
        <LinkBox>
            <HStack align={"center"} justify={"center"}>
                <Icon>
                    <GiDolphin/>
                </Icon>
                <Heading>
                    <LinkOverlay asChild>
                        <Link to={homepage}>
                            FinFin
                        </Link>
                    </LinkOverlay>
                </Heading>
            </HStack>

        </LinkBox>
    )
}


const PageHeader = () => {

    if (!authService.instance.isAuthenticated()) {

        return (
            <Flex
                justify={"space-between"}
                w={"100%"}
                h={"6%"}
                paddingX={"5%"}
                position={"fixed"}

                align={"center"}
            >

                <HeaderLogo homepage={"/login"}/>


                <HStack>
                    <ChakraLink asChild>
                        <Link to={"/login"}>Logar</Link>
                    </ChakraLink>

                    <ChakraLink asChild>
                        <Link to={"/signin"}>Registrar</Link>
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
                paddingX={"5%"}
                position={"fixed"}

                align={"center"}
            >
                <HeaderLogo homepage={"/home" +
                    ""}/>

                <HStack>
                    <ColorModeButton/>
                    <HeaderDrawer/>

                </HStack>
            </Flex>
        )
    }
}

export default PageHeader;
