import {Card, HStack, Button} from "@chakra-ui/react";
import {InfoList, type InfoField} from "./InfoList";
import type {ReactNode} from "react";

interface DataCardProps<T> {
    item: T;
    title: (item: T) => ReactNode;
    fields: InfoField<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

export const DataCard = <T, >({item, title, fields, onEdit, onDelete}: DataCardProps<T>) => (
    <Card.Root w="100%">
        <Card.Header>
            <HStack justify="space-between">
                <Card.Title>{title(item)}</Card.Title>
                <HStack>
                    {onEdit && <Button size="xs" variant="outline" onClick={() => onEdit(item)}>Editar</Button>}
                    {onDelete && (
                        <Button size="xs" variant="outline" colorPalette="red" onClick={() => onDelete(item)}>
                            Excluir
                        </Button>
                    )}
                </HStack>
            </HStack>
        </Card.Header>
        <Card.Body>
            <InfoList item={item} fields={fields}/>
        </Card.Body>
    </Card.Root>
);