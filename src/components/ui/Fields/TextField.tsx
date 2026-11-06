import { Input, type InputProps } from "@chakra-ui/react";
import { FormField } from "./FormField";

type TextFieldProps = InputProps & {
    label: string;
    invalid?: boolean;
    errorText?: string;
};

export const TextField = ({ label, required, invalid, errorText, ...inputProps }: TextFieldProps) => (
    <FormField label={label} required={required} invalid={invalid} errorText={errorText}>
        <Input {...inputProps} />
    </FormField>
);