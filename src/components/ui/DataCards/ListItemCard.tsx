import {HStack, Card, IconButton, Icon} from "@chakra-ui/react";
import type {ReactNode} from "react";
import {MdEdit, MdRemove} from "react-icons/md";

export interface ItemCardProps {
    children: ReactNode
    data?: object[]
    onEdit: () => void | Promise<void>;
    onDelete: () => void | Promise<void>;
}

const ListItemCard = ({
                          children,
                          onEdit,
                          onDelete
                      }: ItemCardProps) => {
    return (
        <Card.Root>
            <Card.Body>
                <HStack w={"100%"} justify={"space-between"}>
                    <HStack>
                        {children}

                    </HStack>
                    <HStack>
                        {onEdit && <IconButton onClick={() => onEdit()}>
                            <Icon asChild>
                                <MdEdit/>
                            </Icon>
                        </IconButton>}

                        {onDelete && <IconButton
                            onClick={() => onDelete()}
                            colorPalette={"red"}
                        >
                            <Icon asChild>
                                <MdRemove/>
                            </Icon>
                        </IconButton>}

                    </HStack>
                </HStack>
            </Card.Body>

        </Card.Root>
    )
}

export default ListItemCard;