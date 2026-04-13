import { Field as UiField, FieldDescription as UiFieldDescription, FieldError, FieldLabel as UiFieldLabel } from "@/shared/components/ui/field.tsx";
import { Input } from "@/shared/components/ui/input.tsx";
import { Fragment } from "react";

export type FieldState = {
  name:         string,
  type:         "text" | "email" | "password",
  label:        string,
  required?:    boolean,
  description?: string,
  value:        string,
  errors:       string[],
}

type FieldLabelProps = {
  field:     string,
  label:     string,
  required?: boolean,
};

export function FieldLabel({ field, label, required = false}: FieldLabelProps) {
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

type FieldErrorsProps = {
  errors: string[],
};

/**
 * TBD: this (with props) can be relocated to somewhere more generic...
 */
function FieldErrors({ errors }: FieldErrorsProps) {
  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  if (hasErrors()) {
    return (
      <Fragment>
        <FieldError>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </FieldError>
      </Fragment>
    );
  }

  return (
    <Fragment />
  );
}

type FieldDescriptionProps = {
  description?: string,
};

function FieldDescription({ description }: FieldDescriptionProps) {
  const hasDescription = (): boolean => {
    return description !== undefined;
  };

  if (hasDescription()) {
    return (
      <Fragment>
        <UiFieldDescription>
          {description}
        </UiFieldDescription>
      </Fragment>
    );
  }

  return (
    <Fragment />
  );

}

type FieldProps = {
  fieldState: FieldState,
}

/**
 * This is being created for a basic usage for now and will be extended later.
 * Initial version.
 * @constructor
 */
export default function Field({ fieldState }: FieldProps) {
  const { name, type, label, required, description, value, errors } = fieldState;

  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  return (
    <Fragment>
      <UiField>
        <FieldLabel field={name} label={label} required={required} />
        <Input type={type} id={name} name={name} defaultValue={value} noValidate aria-invalid={hasErrors()} />
        <FieldErrors errors={errors} />
        <FieldDescription description={description} />
      </UiField>
    </Fragment>
  );
}
