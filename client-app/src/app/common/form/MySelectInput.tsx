import { useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

interface Props {
    name: string,
    placeholder: string,
    options: { text: string, value: string }[]
    label?: string,
}
function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable
                options={props.options}
                value={field.value || null}
                placeholder={props.placeholder}
                onChange={(_, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
            />
            {meta.touched && meta.error
                ? <Label basic color='red'>{meta.error}</Label>
                : null
            }
        </FormField>
    )
}

export default MySelectInput;