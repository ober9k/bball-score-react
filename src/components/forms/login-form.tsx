import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import { Button } from "@/shared/components/ui/button";
import { Field as UiField, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
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

type LoginFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  isPending: boolean,
  onCancel: () => void,
};

export default function LoginForm({ formAction, formState, isPending, onCancel }: LoginFormProps) {
  const { fieldValues, fieldErrors } = formState;

  const emailFieldState: InputFieldState = {
    name:     "email",
    type:     "email",
    label:    "Email",
    required: true,
    value:    fieldValues.email.toString(),
    errors:   fieldErrors.email || [],
  };

  const passwordFieldState: InputFieldState = {
    name:     "password",
    type:     "password",
    label:    "Password",
    required: true,
    value:    fieldValues.password.toString(), /* this will be empty later with mock data removed */
    errors:   fieldErrors.password || [],
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
            <InputField fieldState={emailFieldState} />
            <InputField fieldState={passwordFieldState} />
            <UiField orientation="horizontal" className="flex justify-center">
              <Button type="reset" variant="secondary" onClick={() => onCancel()}>
                Cancel
              </Button>
              <Button type="submit">
                {isPending ? "Logging In..." : "Login"}
              </Button>
            </UiField>
          </FieldGroup>
        </FieldSet>
      </form>
    </Fragment>
  );
}
