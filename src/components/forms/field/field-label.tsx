import { FieldLabel as UiFieldLabel } from "@/shared/components/ui/field.tsx";
import { Fragment } from "react";

type Props = {
  field:     string,
  label:     string,
  required?: boolean,
};

export default function FieldLabel({ field, label, required = false}: Props) {
  return (
    <Fragment>
      <UiFieldLabel htmlFor={field}>
        {label}
        {required && (
          <span className="-mx-1 text-red-500">*</span>
        )}
      </UiFieldLabel>
    </Fragment>
  );
}
