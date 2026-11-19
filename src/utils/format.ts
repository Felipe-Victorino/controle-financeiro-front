export const formatDate = (dateText?: string) => {
    if (!dateText) return "-";
    return new Intl.DateTimeFormat("pt-BR").format(new Date(dateText));
};

// utils/format.ts
export const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value);

// "2026-11-12" -> "12/11/2026". Don't use new Date("2026-11-12"): a date-only string is read
// as UTC midnight, which displays as the previous day in UTC-3.
export const formatDateOnly = (text?: string) => {
    if (!text) return "-";
    const [y, m, d] = text.split("-").map(Number);
    return new Intl.DateTimeFormat("pt-BR").format(new Date(y, m - 1, d));
};