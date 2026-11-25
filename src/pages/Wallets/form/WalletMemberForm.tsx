// features/wallets/MemberForm.tsx
import {Button} from "@chakra-ui/react";
import type {SubmitEvent} from "react";
import type {FormProps} from "@/types/FormProps.ts";
import {FormFieldset} from "@/components/ui/Containers/FormFieldset.tsx";
import {TextField} from "@/components/ui/Fields/TextField.tsx";
import {SelectField} from "@/components/ui/Fields/SelectField.tsx";
import {useFormState} from "@/hooks/useFormState.ts";
import {useRequest} from "@/hooks/useRequest.ts";
import {WALLET_MEMBER_ROLES, type WalletMemberValues} from "@/types/Wallets/WalletType.ts";


type WalletMemberFormProps = FormProps<WalletMemberValues>;
const MemberForm = ({title, initialValues, submitLabel, onSubmit, onSuccess}: WalletMemberFormProps) => {
    const {values, handleChange, reset} = useFormState<WalletMemberValues>(initialValues);
    const {loading, error, run} = useRequest();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await run(async () => {
            await onSubmit(values);
            reset();          // only reached on success, so errors keep what was typed
            onSuccess?.();
        });
    };

    return (
        <FormFieldset
            onSubmit={handleSubmit}
            invalid={!!error}
            errorText={error?.message ?? "Verifique os dados"}
            legend={title ?? ""}
        >
            <TextField
                label="Email do usuário" name="userEmail" type="email"
                value={values.userEmail} onChange={handleChange} required
            />
            <SelectField
                label="Permissão" name="role" value={values.role}
                options={WALLET_MEMBER_ROLES} onChange={handleChange} required
            />
            <Button w="100%" type="submit" loading={loading}>{submitLabel}</Button>
        </FormFieldset>
    );
};

export default MemberForm;