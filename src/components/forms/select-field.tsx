import FieldErrors from "@/components/forms/field/field-errors.tsx";
import FieldLabel from "@/components/forms/field/field-label.tsx";
import { Field as UiField, FieldDescription } from "@/shared/components/ui/field.tsx";
import { Input } from "@/shared/components/ui/input.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select.tsx";
import { Fragment } from "react";

export type SelectFieldState = {
  name:         string,
  label:        string,
  required?:    boolean,
  description?: string,
  value:        string,
  values:       { label: string, value: string }[],
  errors:       string[],
}

type Props = {
  fieldState: SelectFieldState,
}

/**
 * This is being created for a basic usage for now and will be extended later.
 * Initial version.
 * @constructor
 */
export default function SelectField({ fieldState }: Props) {
  const { name, type, label, required, description, value, values, errors } = fieldState;

  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  const selectLabel = `Select ${label}`;

  return (
    <Fragment>
      <UiField>
        <FieldLabel field={name} label={label} required={required} />
        <Select name={name} defaultValue={value}>
          <SelectTrigger aria-invalid={hasErrors()}>
            <SelectValue placeholder={selectLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {values.map(({ label, value }) => (
                <SelectItem key={value} value={value.toString()}>{label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldErrors errors={errors} />
        <FieldDescription description={description} />
      </UiField>
    </Fragment>
  );
}
