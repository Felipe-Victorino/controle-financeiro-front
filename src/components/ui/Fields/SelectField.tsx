import { Field, NativeSelect } from "@chakra-ui/react";
import type React from "react";

type SelectFieldProps = {
    label: string;
    name: string;
    value: string;
    options: readonly { value: string; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
};

export const SelectField = ({ label, options, required, ...fieldProps }: SelectFieldProps) => (
    <Field.Root required={required}>
        <Field.Label>
            {label}: <Field.RequiredIndicator />
        </Field.Label>
        <NativeSelect.Root>
            <NativeSelect.Field {...fieldProps}>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
        </NativeSelect.Root>
    </Field.Root>
);