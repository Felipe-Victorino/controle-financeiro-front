// features/transactions/TransactionForm.tsx
import {Button} from "@chakra-ui/react";
import type {SubmitEvent} from "react";
import {FormFieldset} from "@/components/ui/Containers/FormFieldset";
import {TextField} from "@/components/ui/Fields/TextField";
import {SelectField} from "@/components/ui/Fields/SelectField";

import {useFormState} from "@/hooks/useFormState";
import {useRequest} from "@/hooks/useRequest";
import {todayLocal, type TransactionValues} from "@/pages/Transactions/types/TransactionTypes.ts";
import {CATEGORY_TYPES} from "@/pages/Category/types/CategoryTypes.ts";
import type {FormProps} from "@/types/FormProps.ts";
import type {CategoryResponseValues} from "@/types/ServerResponseDTO.ts";


type TransactionFormProps = FormProps<TransactionValues> & {
    categories: CategoryResponseValues[];
};

export const TransactionForm = ({
                                    title, categories, initialValues, submitLabel, onSubmit, onSuccess,
                                }: TransactionFormProps) => {
    const {values, setField, handleChange} = useFormState<TransactionValues>(initialValues);
    const {loading, error, run} = useRequest();

    // only the categories of the chosen type (the backend rejects a mismatch)
    const categoryOptions = [
        {value: "", label: "Selecione..."},
        ...categories
            .filter((c) => c.type === values.type && c.isActive)
            .map((c) => ({value: String(c.id), label: c.name})),
    ];

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await run(async () => {
            await onSubmit(values);
            onSuccess?.();
        });
    };

    return (
        <FormFieldset
            errorText={error?.message ?? "Verifique os dados"}
            invalid={!!error}
            onSubmit={handleSubmit}
            legend={title ?? ""}
        >
            <SelectField
                label="Tipo" name="type" value={values.type} options={CATEGORY_TYPES} required
                onChange={(e) => {
                    handleChange(e);
                    setField("categoryId", "");
                }} // old category may not fit the new type
            />
            <SelectField
                label="Categoria" name="categoryId" value={values.categoryId}
                options={categoryOptions} onChange={handleChange} required
            />
            <TextField
                label="Valor" name="value" type="number" step="0.01" min="0.01"
                value={values.value} onChange={handleChange} required
            />
            <TextField
                label="Data" name="dateTransaction" type="date" max={todayLocal()}
                value={values.dateTransaction} onChange={handleChange} required
            />
            <TextField
                label="Descrição" name="description" maxLength={255}
                value={values.description} onChange={handleChange}
            />
            <Button w="100%" type="submit" loading={loading}>{submitLabel}</Button>
        </FormFieldset>
    );
};