import { teamsQueryOptions } from "@/apis/query-options.ts";
import FormButtons from "@/components/forms/form-buttons.tsx";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import type { SelectFieldState } from "@/components/forms/select-field.tsx";
import SelectField from "@/components/forms/select-field.tsx";
import { i18n } from "@/lib/phrases.ts";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Position } from "@/types/player/position.ts";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    position: string,
    number: string,
    height: string,
  },
  fieldErrors: {
    name?: string[],
    position?: string[],
    number?: string[],
    height?: string[],
  },
};

type TeamFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update", /* todo: make into type */
  isPending: boolean,
  onCancel: () => void,
};

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: TeamFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;
  const [ positions, setPositions ] = useState<{ id: string, name: string }[]>([]);
  const { data } = useQuery(teamsQueryOptions);

  useEffect(() => {
    if (data) {
      setPositions([
        { id: Position.PointGuard,    name: i18n("position.type.label.pointGuard") },
        { id: Position.ShootingGuard, name: i18n("position.type.label.shootingGuard") },
        { id: Position.SmallForward,  name: i18n("position.type.label.smallForward") },
        { id: Position.PowerForward,  name: i18n("position.type.label.powerForward") },
        { id: Position.Center,        name: i18n("position.type.label.center") },
      ]);
    }
  }, [data]);

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
    values:   positions.map((position) => ({ label: position.name, value: position.id })),
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

  const isCreate = () => formMode === "create";

  const buttonLabels = (isCreate())
    ? ["Create", "Creating..."]
    : ["Update", "Updating..."];

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
          <FieldSet>
            <FormButtons formMode={formMode} isPending={isPending} onCancel={onCancel} />
          </FieldSet>
        </FieldGroup>
      </form>
    </Fragment>
  );
}
