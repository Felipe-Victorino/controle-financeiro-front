// features/transactions/transactionColumns.tsx
import {Badge, Text} from "@chakra-ui/react";
import type {DataColumn} from "@/components/ui/DataTable/DataTable";
import type {CategoryResponseValues, TransactionResponseValues} from "@/types/ServerResponseDTO.ts";
import {CATEGORY_TYPES} from "@/types/Category/CategoryTypes";
import {formatCurrency, formatDateOnly} from "@/utils/format";

// a function because the category names come from a list loaded at runtime
export const buildTransactionColumns = (categories: CategoryResponseValues[]): DataColumn<TransactionResponseValues>[] => {
    const names = new Map(categories.map((c) => [c.id, c.name]));
    return [
        {header: "Data", cell: (t) => formatDateOnly(t.dateTransaction)},
        {header: "Descrição", cell: (t) => <Text maxW="xs" truncate>{t.description || "-"}</Text>},
        {header: "Categoria", cell: (t) => names.get(t.categoryId) ?? "-"},
        {
            header: "Tipo",
            hideBelow: "md",
            cell: (t) => (
                <Badge colorPalette={t.type === "RECEIPT" ? "green" : "red"}>
                    {CATEGORY_TYPES.find((x) => x.value === t.type)?.label}
                </Badge>
            ),
        },
        {
            header: "Valor",
            align: "end",
            cell: (t) => (
                <Text
                    fontWeight="semibold"
                    fontVariantNumeric="tabular-nums"
                    color={t.type === "RECEIPT" ? "green.600" : "red.600"}
                >
                    {t.type === "RECEIPT" ? "+ " : "- "}{formatCurrency(t.value)}
                </Text>
            ),
        },
        {header: "Criado por", hideBelow: "lg", cell: (t) => t.createdBy},
    ];
};