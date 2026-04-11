import { Button } from "@/shared/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Fragment } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    email: string,
    password: string,
  },
  fieldErrors: {
    email?: string[],
    password?: string[],
  },
};

type FormErrorsProps = {
  formState: FormState,
};

/**
 * TBD: this (with props) can be relocated to somewhere more generic...
 */
export function FormErrors({ formState }: FormErrorsProps) {
  const { formErrors } = formState;

  const hasErrors = (): boolean => {
    return formErrors.length > 0;
  };

  const getErrors = (): string[] => {
    return (hasErrors())
      ? formErrors
      : [];
  };

  if (hasErrors()) {
    return (
      <Fragment>
        <FieldError>
          <ul>
            {getErrors().map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </FieldError>
      </Fragment>
    );
  }

  return (
    <Fragment/>
  );
}

type FormFieldErrorsProps = {
  formState: FormState,
  fieldKey: string,
};

/**
 * TBD: this (with props) can be relocated to somewhere more generic...
 */
export function FormFieldErrors({ formState, fieldKey }: FormFieldErrorsProps) {
  const { fieldErrors } = formState;

  const hasErrors = (): boolean => {
    return fieldErrors[fieldKey] && fieldErrors[fieldKey].length > 0;
  };

  const getErrors = (): string[] => {
    return (hasErrors())
      ? fieldErrors[fieldKey]
      : [];
  };

  if (hasErrors()) {
    return (
      <Fragment>
        <FieldError>
          <ul>
            {getErrors().map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </FieldError>
      </Fragment>
    );
  }

  return (
    <Fragment/>
  );
}

type LoginFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  isPending: boolean,
  onCancel: () => void,
};

export default function LoginForm({ formAction, formState, isPending, onCancel }: LoginFormProps) {
  const { fieldValues, fieldErrors } = formState;

  const hasErrors = (field: string): boolean => {
    return fieldErrors[field] && fieldErrors[field].length > 0;
  };

  return (
    <Fragment>
      <form action={formAction}>
        <FieldSet>
          <FieldLegend>
            Welcome back!
          </FieldLegend>
          <FieldDescription>
            Enter your email and password to continue.
          </FieldDescription>
          <FormErrors formState={formState}/>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">
                Email Address
              </FieldLabel>
              <Input type="email" id="email" name="email" defaultValue={fieldValues.email.toString()} noValidate aria-invalid={hasErrors("email")} />
              <FormFieldErrors formState={formState} fieldKey={"email"} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">
                Password
              </FieldLabel>
              <Input type="password" id="password" name="password" defaultValue={fieldValues.password.toString()} noValidate aria-invalid={hasErrors("password")} />
              <FormFieldErrors formState={formState} fieldKey={"password"} />
            </Field>
            <Field orientation="horizontal" className="flex justify-center">
              <Button type="reset" variant="secondary" onClick={() => onCancel()}>
                Cancel
              </Button>
              <Button type="submit">
                {isPending ? "Logging In..." : "Login"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </Fragment>
  );
}
