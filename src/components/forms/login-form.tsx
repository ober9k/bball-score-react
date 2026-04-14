import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import { Button } from "@/shared/components/ui/button";
import { Field as UiField, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
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

type LoginFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  isPending: boolean,
  onCancel: () => void,
};

export default function LoginForm({ formAction, formState, isPending, onCancel }: LoginFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;

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
          <FormErrors errors={formErrors} />
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
