import { PasswordInput, type PasswordInputProps } from "@/components/ui/password-input.tsx";
import { FormField } from "./FormField";

type PasswordFieldProps = PasswordInputProps & {
    label: string;
    invalid?: boolean;
    errorText?: string;
};

export const PasswordField = ({ label, required, invalid, errorText, ...inputProps }: PasswordFieldProps) => (
    <FormField
        label={label}
        required={required}
        invalid={invalid}
        errorText={errorText}
    >
        <PasswordInput {...inputProps} />
    </FormField>
);