import {Flex, Heading, HStack, Icon, VStack} from "@chakra-ui/react";
import {GiDolphin} from "react-icons/gi";


export const BigLogo = () => {
    return (
        <Flex gap={"12"} direction={"column"} justify={"center"} align={"start"} padding={"4"}>
            <VStack>
                <HStack>
                    <Icon asChild size={"2xl"}>
                        <GiDolphin/>
                    </Icon>
                    <Heading size={"6xl"}>
                        FinFin
                    </Heading>
                </HStack>

            </VStack>

        </Flex>
    )
}