export const CATEGORY_TYPES = [
    {value: "RECEIPT", label: "Recibo"},
    {value: "EXPENSE", label: "Despesa"},
] as const;

export type CategoryType = (typeof CATEGORY_TYPES)[number]["value"];

export type CategoryValues = {
    name: string;
    color: string;
    icon: string;
    type: CategoryType;
};

export const EMPTY_CATEGORY: CategoryValues = {
    name: "",
    color: "#ff0022",
    icon: "",
    type: "RECEIPT",
};