import {Fieldset} from "@chakra-ui/react";
import type {ReactNode, SubmitEventHandler} from "react";

interface FormFieldsetProps {
    legend: ReactNode;
    helperText?: string;
    errorText?: string;
    invalid?: boolean;
    noValidate?: boolean;
    onSubmit?: SubmitEventHandler<HTMLFormElement>;
    children: ReactNode;
}

export const FormFieldset = ({
                                 legend,
                                 helperText,
                                 errorText,
                                 invalid,
                                 noValidate,
                                 onSubmit,
                                 children,
                             }: FormFieldsetProps) => (
    <form
        onSubmit={onSubmit}
        noValidate={noValidate}
    >
        <Fieldset.Root invalid={invalid}>
            <Fieldset.Legend>
                {legend}
            </Fieldset.Legend>
            {helperText && <Fieldset.HelperText>
                {helperText}
            </Fieldset.HelperText>}
            <Fieldset.Content>
                {children}
            </Fieldset.Content>
            {errorText && <Fieldset.ErrorText>
                {errorText}
            </Fieldset.ErrorText>
            }
        </Fieldset.Root>
    </form>
);