import FieldDescription from "@/components/forms/field/field-description.tsx";
import FieldErrors from "@/components/forms/field/field-errors.tsx";
import FieldLabel from "@/components/forms/field/field-label.tsx";
import { Field as UiField } from "@/shared/components/ui/field.tsx";
import { Input as UiInput } from "@/shared/components/ui/input.tsx";
import { Fragment } from "react";

export type InputFieldState = {
  name:         string,
  type:         "text" | "date" | "email" | "password",
  label:        string,
  required?:    boolean,
  description?: string,
  value:        string,
  errors:       string[],
}

type Props = {
  fieldState: InputFieldState,
}

/**
 * This is being created for a basic usage for now and will be extended later.
 * Initial version.
 * @constructor
 */
export default function InputField({ fieldState }: Props) {
  const { name, type, label, required, description, value, errors } = fieldState;

  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  return (
    <Fragment>
      <UiField>
        <FieldLabel field={name} label={label} required={required} />
        <UiInput type={type} id={name} name={name} defaultValue={value} noValidate aria-invalid={hasErrors()} />
        <FieldErrors errors={errors} />
        <FieldDescription description={description} />
      </UiField>
    </Fragment>
  );
}
