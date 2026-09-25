import {Flex, Heading, HStack, Icon, Link as ChakraLink, LinkBox, LinkOverlay} from "@chakra-ui/react";

import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import HeaderDrawer from "@/components/HeaderDrawer/HeaderDrawer.tsx";
import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import {GiDolphin} from "react-icons/gi";

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
    const [logStatus] = useState(
        () => {
            return localStorage.getItem("login");
        }
    );

    const [homepage, setHomepage] = useState("/");


    useEffect(() => {
        function checkLogStatus() {
            if (logStatus != null) {
                setHomepage("/dashboard");
            }
        }

        checkLogStatus();
    }, [logStatus]);

    if (logStatus === null) {

        return (
            <Flex
                justify={"space-between"}
                w={"100%"}
                h={"6%"}
                padding={{base: "5%", md: "0"}}
                position={"sticky"}

                align={"center"}
            >

                <HeaderLogo homepage={homepage}/>


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
                <HeaderLogo homepage={homepage}/>

                <HStack>
                    <ColorModeButton/>
                    <HeaderDrawer/>

                </HStack>
            </Flex>
        )
    }
}

export default PageHeader;
