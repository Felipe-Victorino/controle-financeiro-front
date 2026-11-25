import {FormField} from "./FormField";
import {SelectInput} from "./SelectInput";
import React from "react";

type SelectFieldProps = React.ComponentProps<typeof SelectInput> & {
    label: string;
    required?: boolean;
    invalid?: boolean;
    errorText?: string;
};

export const SelectField = ({label, required, invalid, errorText, ...selectProps}: SelectFieldProps) => (
    <FormField label={label} required={required} invalid={invalid} errorText={errorText}>
        <SelectInput {...selectProps} />
    </FormField>
);