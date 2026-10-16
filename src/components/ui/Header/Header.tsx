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
                padding={{base: "5%", md: "0"}}
                position={"sticky"}

                align={"center"}
            >

                <HeaderLogo homepage={"/login"}/>


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
                padding={{base: "5%", md: "0"}}
                position={"sticky"}

                align={"center"}
            >
                <HeaderLogo homepage={"/dash"}/>

                <HStack>
                    <ColorModeButton/>
                    <HeaderDrawer/>

                </HStack>
            </Flex>
        )
    }
}

export default PageHeader;
