import type { CheckboxFieldState } from "@/components/forms/checkbox-field.tsx";
import CheckboxField from "@/components/forms/checkbox-field.tsx";
import FormButtons from "@/components/forms/form-buttons.tsx";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Separator } from "@/shared/components/ui/separator.tsx";
import { Fragment } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    activated: boolean,
    archived: boolean,
  },
  fieldErrors: {
    name?: string[],
    activated?: string[],
    archived?: string[],
  },
};

type SeasonFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update", /* todo: make into type */
  isPending: boolean,
  onCancel: () => void,
};

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: SeasonFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;

  const nameFieldState: InputFieldState = {
    name:     "name",
    type:     "text",
    label:    "Name",
    description: "Enter a name between 1 and 20 characters which can be used to identify the season.",
    required: true,
    value:    fieldValues.name.toString(),
    errors:   fieldErrors.name || [],
  };

  const activatedFieldState: CheckboxFieldState = {
    name:     "activated",
    label:    "Activated",
    description: "An activated Season is available for selection and be displayed across the league.",
    value:    fieldValues.activated,
    errors:   fieldErrors.activated || [],
  };

  const archivedFieldState: CheckboxFieldState = {
    name:     "archived",
    label:    "Archived",
    description: "An archived Season is no longer accessible for selection, however will still be displayed for historic results.",
    value:    fieldValues.archived,
    errors:   fieldErrors.archived || [],
  };

  return (
    <Fragment>
      <form action={formAction}>
        <FieldGroup>
          <FieldSet>
            <FormErrors errors={formErrors} />
          </FieldSet>
          <FieldSet>
            <FieldLegend>
              Details
            </FieldLegend>
            <FieldDescription>
              A season is used as the parent for divisions, teams and games for within a league.
            </FieldDescription>
            <InputField fieldState={nameFieldState} />
          </FieldSet>
          <Separator />
          <FieldSet>
            <FieldLegend>
              Configuration
            </FieldLegend>
            <FieldDescription>
              Set the state of the Season and any additional configurations.
            </FieldDescription>
            <CheckboxField fieldState={activatedFieldState} />
            <CheckboxField fieldState={archivedFieldState} />
          </FieldSet>
          <FieldSet>
            <FormButtons formMode={formMode} isPending={isPending} onCancel={onCancel} />
          </FieldSet>
        </FieldGroup>
      </form>
    </Fragment>
  );
}
