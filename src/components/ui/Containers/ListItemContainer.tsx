import {HStack, Card, IconButton, Icon} from "@chakra-ui/react";
import type {ReactNode} from "react";
import {MdEdit, MdRemove} from "react-icons/md";

const ListItemContainer = ({children}: {children: ReactNode}) => {
    return (
        <Card.Root>
            <Card.Body>
                <HStack w={"100%"} justify={"space-between"}>
                    <HStack>
                        {children}
                    </HStack>
                    <HStack>
                        <IconButton>
                            <Icon asChild>
                                <MdEdit/>
                            </Icon>
                        </IconButton>
                        <IconButton colorPalette={"red"}>
                            <Icon asChild>
                                <MdRemove/>
                            </Icon>
                        </IconButton>
                    </HStack>
                </HStack>
            </Card.Body>

        </Card.Root>
        )
}

export default  ListItemContainer;