import {useState, type ReactNode} from "react";
import {ButtonGroup, HStack, IconButton, Pagination, Table, VStack} from "@chakra-ui/react";
import {LuChevronLeft, LuChevronRight, LuPencil, LuTrash2} from "react-icons/lu";

export type DataColumn<T> = {
    header: string;
    cell: (item: T) => ReactNode;
    align?: "start" | "center" | "end";
    hideBelow?: "sm" | "md" | "lg" | "xl"; // hides the column on narrow screens
};

interface DataTableProps<T> {
    items: T[];
    columns: DataColumn<T>[];
    rowKey: (item: T) => string | number;
    empty: ReactNode; // shown instead of the table when there are no rows
    pageSize?: number;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

const DataTable = <T, >(
    {
        items,
        columns,
        rowKey,
        empty,
        pageSize = 10,
        onEdit,
        onDelete,
    }: DataTableProps<T>
) => {
    const [page, setPage] = useState(1);

    const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(page, pageCount); // the list can shrink after a delete
    const visible = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const hasActions = !!(onEdit || onDelete);

    if (items.length === 0) return <>{empty}</>;

    return (
        <VStack align="stretch" gap="4">
            <Table.ScrollArea borderWidth="1px" rounded="md">
                <Table.Root size="sm" interactive>
                    <Table.Header>
                        <Table.Row>
                            {columns.map((c) => (
                                <Table.ColumnHeader key={c.header} textAlign={c.align} hideBelow={c.hideBelow}>
                                    {c.header}
                                </Table.ColumnHeader>
                            ))}
                            {hasActions && <Table.ColumnHeader textAlign="end">Ações</Table.ColumnHeader>}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {visible.map((item) => (
                            <Table.Row key={rowKey(item)}>
                                {columns.map((c) => (
                                    <Table.Cell key={c.header} textAlign={c.align} hideBelow={c.hideBelow}>
                                        {c.cell(item)}
                                    </Table.Cell>
                                ))}
                                {hasActions && (
                                    <Table.Cell textAlign="end">
                                        <HStack justify="flex-end" gap="1">
                                            {onEdit && (
                                                <IconButton aria-label="Editar" size="xs" variant="ghost"
                                                            onClick={() => onEdit(item)}>
                                                    <LuPencil/>
                                                </IconButton>
                                            )}
                                            {onDelete && (
                                                <IconButton
                                                    aria-label="Excluir" size="xs" variant="ghost" colorPalette="red"
                                                    onClick={() => onDelete(item)}
                                                >
                                                    <LuTrash2/>
                                                </IconButton>
                                            )}
                                        </HStack>
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>

            {pageCount > 1 && (
                <Pagination.Root
                    count={items.length}
                    pageSize={pageSize}
                    page={currentPage}
                    onPageChange={(e) => setPage(e.page)}
                >
                    <HStack justify="center">
                        <ButtonGroup variant="ghost" size="sm">
                            <Pagination.PrevTrigger asChild>
                                <IconButton aria-label="Página anterior"><LuChevronLeft/></IconButton>
                            </Pagination.PrevTrigger>
                            <Pagination.Items
                                render={(p) => (
                                    <IconButton variant={{base: "ghost", _selected: "outline"}}>{p.value}</IconButton>
                                )}
                            />
                            <Pagination.NextTrigger asChild>
                                <IconButton aria-label="Próxima página"><LuChevronRight/></IconButton>
                            </Pagination.NextTrigger>
                        </ButtonGroup>
                    </HStack>
                </Pagination.Root>
            )}
        </VStack>
    );
};

export default DataTable;







