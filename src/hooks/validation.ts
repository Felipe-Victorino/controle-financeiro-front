export const findEmptyFields = <T extends object>(values: T, fields: (keyof T)[]) =>
    fields.filter((f) => !String(values[f] ?? "").trim());