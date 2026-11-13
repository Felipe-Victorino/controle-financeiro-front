import {Button} from "@chakra-ui/react";
import type React from "react";
import {FormFieldset} from "@/components/ui/Containers/FormFieldset.tsx";
import {TextField} from "@/components/ui/Fields/TextField";
import {SelectField} from "@/components/ui/Fields/SelectField";
import {ColorField} from "@/components/ui/Fields/ColorField";
import {CATEGORY_TYPES, type CategoryValues} from "../types/CategoryTypes.ts";
import {useFormState} from "@/hooks/useFormState";
import {useRequest} from "@/hooks/useRequest.ts";
import type {FormProps} from "@/types/FormProps.ts";


type CategoryFormProps = FormProps<CategoryValues>;

const CategoryForm = ({title, initialValues, submitLabel, onSubmit, onSuccess}: CategoryFormProps) => {
    const {values, setField, handleChange} = useFormState<CategoryValues>(initialValues);
    const {loading, error, run} = useRequest()

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await run(async () => {
            await onSubmit(values);
            onSuccess?.();
        })
    };

    return (
        <FormFieldset
            legend={title ?? ""}
            errorText={error?.message ?? "Verifique os dados"}
            invalid={!!error}
            onSubmit={handleSubmit}
        >
            <TextField
                label="Nome"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
            />
            <SelectField
                label="Tipo da categoria"
                name="type"
                value={values.type}
                options={CATEGORY_TYPES}
                onChange={handleChange}
                required
            />
            <ColorField
                label="Cor"
                value={values.color}
                onChange={(hex) => {
                    console.log(hex);
                    setField("color", hex)
                }}
            />
            <Button w="100%" type="submit" loading={loading}>
                {submitLabel}
            </Button>
        </FormFieldset>
    );
};

export default CategoryForm;