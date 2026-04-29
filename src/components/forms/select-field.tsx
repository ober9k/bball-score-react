import FieldErrors from "@/components/forms/field/field-errors.tsx";
import FieldLabel from "@/components/forms/field/field-label.tsx";
import { Field as UiField, FieldDescription as UiFieldDescription } from "@/shared/components/ui/field.tsx";
import {
  Select as UiSelect,
  SelectContent as UiSelectContent,
  SelectGroup as UiSelectGroup,
  SelectItem as UiSelectItem,
  SelectTrigger as UiSelectTrigger,
  SelectValue as UiSelectValue
} from "@/shared/components/ui/select.tsx";
import type { Option } from "@/types/option.ts";
import { Fragment } from "react";

export type SelectFieldState = {
  name:         string,
  label:        string,
  required?:    boolean,
  description?: string,
  value:        string,
  values:       Option[],
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
  const { name, label, required, description, value, values, errors } = fieldState;

  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  const selectLabel = `Select ${label}`;

  return (
    <Fragment>
      <UiField>
        <FieldLabel field={name} label={label} required={required} />
        <UiSelect name={name} defaultValue={value}>
          <UiSelectTrigger aria-invalid={hasErrors()}>
            <UiSelectValue placeholder={selectLabel} />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup>
              {values.map(({ label, value }) => (
                <UiSelectItem key={value} value={value.toString()}>{label}</UiSelectItem>
              ))}
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
        <FieldErrors errors={errors} />
        <UiFieldDescription>
          {description}
        </UiFieldDescription>
      </UiField>
    </Fragment>
  );
}
