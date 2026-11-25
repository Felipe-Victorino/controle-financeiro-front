import type {FormProps} from "@/types/FormProps.ts";
import type {WalletValues} from "@/types/Wallets/WalletType.ts";
import {useFormState} from "@/hooks/useFormState.ts";
import {useRequest} from "@/hooks/useRequest.ts";
import type {SubmitEvent} from "react";
import {FormFieldset} from "@/components/ui/Containers/FormFieldset.tsx";
import {TextField} from "@/components/ui/Fields/TextField.tsx";
import {Button} from "@chakra-ui/react";

type WalletsFormProps = FormProps<WalletValues>;
const WalletsForm = (
    {
        title,
        initialValues,
        submitLabel,
        onSubmit,
        onSuccess
    }: WalletsFormProps
) => {
    const {values, handleChange} = useFormState<WalletValues>(initialValues);
    const {loading, error, run} = useRequest();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await run(async () => {
            await onSubmit(values);
            onSuccess?.();
        });
    };

    return (
        <FormFieldset
            legend={title ?? ""}
            onSubmit={handleSubmit}
            invalid={!!error}
            errorText={error?.message ?? "Verifique os dados"}
        >
            <TextField
                label={"Nome"}
                name={"name"}
                value={values.name}
                onChange={handleChange}
                required
            />
            <TextField
                label={"Descrição"}
                name={"description"}
                value={values.description}
                onChange={handleChange}
            />
            <Button w="100%" type="submit" loading={loading}>{submitLabel}</Button>
        </FormFieldset>
    )
}

export default WalletsForm;