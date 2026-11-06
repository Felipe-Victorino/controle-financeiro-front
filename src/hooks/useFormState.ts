import { useState } from "react";
import type React from "react";
import type { UserInput } from "@/types/Inputs.ts";

export const useFormState = <T extends object>(initial: T) => {
    const [values, setValues] = useState(initial);

    const setField = <K extends keyof T>(key: K, value: T[K]) =>
        setValues((prev) => ({ ...prev, [key]: value }));

    const handleChange = (e: React.ChangeEvent<UserInput>) =>
        setField(e.target.name as keyof T, e.target.value as T[keyof T]);

    const reset = () => setValues(initial);

    return { values, setField, handleChange, reset };
};