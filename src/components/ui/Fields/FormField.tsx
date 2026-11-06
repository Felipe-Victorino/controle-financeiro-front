import { Field } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FormFieldProps = {
    label: string;
    required?: boolean;
    invalid?: boolean;
    errorText?: string;
    children: ReactNode;
};

export const FormField = ({ label, required, invalid, errorText, children }: FormFieldProps) => (
    <Field.Root required={required} invalid={invalid}>
        <Field.Label>
            {label}: <Field.RequiredIndicator />
        </Field.Label>
        {children}
        {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
);