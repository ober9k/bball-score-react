import FieldDescription from "@/components/forms/field/field-description.tsx";
import FieldErrors from "@/components/forms/field/field-errors.tsx";
import FieldLabel from "@/components/forms/field/field-label.tsx";
import { Checkbox as UiCheckbox } from "@/shared/components/ui/checkbox.tsx";
import { Field as UiField, FieldContent as UiFieldContent } from "@/shared/components/ui/field.tsx";
import { Fragment, useState } from "react";

export type CheckboxFieldState = {
  name:         string,
  label:        string,
  required?:    boolean,
  description?: string,
  value:        boolean,
  errors:       string[],
}

type Props = {
  fieldState: CheckboxFieldState,
}

/**
 * This is being created for a basic usage for now and will be extended later.
 * Initial version.
 * @constructor
 */
export default function CheckboxField({ fieldState }: Props) {
  const { name, label, required, description, value, errors } = fieldState;

  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  const [ checked, setChecked ] = useState<boolean | "indeterminate">(value);

  return (
    <Fragment>
      <UiField orientation="horizontal">
        <UiCheckbox id={name} name={name} checked={checked} onCheckedChange={setChecked} aria-invalid={hasErrors()} />
        <UiFieldContent>
          <FieldLabel field={name} label={label} required={required} />
          <FieldErrors errors={errors} />
          <FieldDescription description={description} />
        </UiFieldContent>
      </UiField>
    </Fragment>
  );
}
