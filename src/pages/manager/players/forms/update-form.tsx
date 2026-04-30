import CheckboxField, { type CheckboxFieldState } from "@/components/forms/checkbox-field.tsx";
import FormButtons from "@/components/forms/form-buttons.tsx";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import type { SelectFieldState } from "@/components/forms/select-field.tsx";
import SelectField from "@/components/forms/select-field.tsx";
import { i18n } from "@/lib/phrases.ts";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Separator } from "@/shared/components/ui/separator.tsx";
import type { Option } from "@/types/option.ts";
import { Position } from "@/types/player.ts";
import { Fragment } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    position: string,
    number: string,
    height: string,
    activated: boolean,
    archived: boolean,
  },
  fieldErrors: {
    name?: string[],
    position?: string[],
    number?: string[],
    height?: string[],
    activated?: string[],
    archived?: string[],
  },
};

type TeamFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update", /* todo: make into type */
  isPending: boolean,
  onCancel: () => void,
};

const positionsOptions: Option[] = [
  { value: Position.PointGuard,    label: i18n("position.type.label.pointGuard") },
  { value: Position.ShootingGuard, label: i18n("position.type.label.shootingGuard") },
  { value: Position.SmallForward,  label: i18n("position.type.label.smallForward") },
  { value: Position.PowerForward,  label: i18n("position.type.label.powerForward") },
  { value: Position.Center,        label: i18n("position.type.label.center") },
] as const;

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: TeamFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;

  const nameFieldState: InputFieldState = {
    name:     "name",
    type:     "text",
    label:    "Name",
    description: "Enter a name between 1 and 20 characters which can be used to identify the player.",
    required: true,
    value:    fieldValues.name.toString(),
    errors:   fieldErrors.name || [],
  };

  const positionFieldState: SelectFieldState = {
    name:     "position",
    label:    "Position",
    required: true,
    value:    fieldValues.position.toString(),
    values:   positionsOptions,
    errors:   fieldErrors.position || [],
  };

  const numberFieldState: InputFieldState = {
    name:     "number",
    type:     "text",
    label:    "Number",
    description: "Enter a number for the player. (use of 00 is a valid number too)",
    required: true,
    value:    fieldValues.number.toString(),
    errors:   fieldErrors.number || [],
  };

  const heightFieldState: InputFieldState = {
    name:     "height",
    type:     "text",
    label:    "Height",
    description: "Enter a height for the player. (the format is in feet and inches, for example 5'10\")",
    required: true,
    value:    fieldValues.height.toString(),
    errors:   fieldErrors.height || [],
  };

  const activatedFieldState: CheckboxFieldState = {
    name:     "activated",
    label:    "Activated",
    description: "An activated Player is available for selection and be displayed across the league.",
    value:    fieldValues.activated,
    errors:   fieldErrors.activated || [],
  };

  const archivedFieldState: CheckboxFieldState = {
    name:     "archived",
    label:    "Archived",
    description: "An archived Player is no longer accessible for selection, however will still be displayed for historic results.",
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
              A player is used as the parent for players within a league.
            </FieldDescription>
            <InputField fieldState={nameFieldState} />
            <SelectField fieldState={positionFieldState} />
            <InputField fieldState={numberFieldState} />
            <InputField fieldState={heightFieldState} />
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
