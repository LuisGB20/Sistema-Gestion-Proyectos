export interface FieldsForm {
    id: string,
    label: string,
    typeField: string,
    placeholder: string,
    options?: Array<{
        label: string,
        value: number,
    }>
}