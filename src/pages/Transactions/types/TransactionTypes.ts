export type TransactionValues = {
    type: "RECEIPT" | "EXPENSE";
    categoryId: string; // text, because it comes from a <select>
    value: string;      // text, because it comes from an <input>
    description: string;
    dateTransaction: string; // yyyy-MM-dd
};

export const todayLocal = () => new Date().toLocaleDateString("sv-SE");

export const EMPTY_TRANSACTION: TransactionValues = {
    type: "EXPENSE", categoryId: "", value: "", description: "", dateTransaction: todayLocal(),
};