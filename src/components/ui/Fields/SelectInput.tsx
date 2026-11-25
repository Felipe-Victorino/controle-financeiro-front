import {NativeSelect} from "@chakra-ui/react";
import type {ComponentProps} from "react";
import type React from "react";

export type SelectOption = { value: string; label: string };

export type SelectInputProps = Omit<ComponentProps<typeof NativeSelect.Root>, "onChange"> & {
    name?: string;
    value: string;
    options: readonly SelectOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    "aria-label"?: string; // needed when there is no visible label, as in a table cell
};

export const SelectInput = (
    {
        name,
        value,
        options,
        onChange,
        "aria-label": ariaLabel,
        ...rootProps
    }: SelectInputProps
) => (
    <NativeSelect.Root {...rootProps}>
        <NativeSelect.Field name={name} value={value} onChange={onChange} aria-label={ariaLabel}>
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator/>
    </NativeSelect.Root>
);