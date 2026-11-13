export interface FormProps<T> {

    title?: string
    initialValues: T;
    submitLabel: string;
    onSubmit: (values: T) => Promise<unknown>;
    onSuccess?: () => void;

}