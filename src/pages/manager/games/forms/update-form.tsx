import { queryKeys } from "@/apis/query-keys.ts";
import { buildOptionsQueryOptions } from "@/apis/query-options.ts";
import type { CheckboxFieldState } from "@/components/forms/checkbox-field.tsx";
import CheckboxField from "@/components/forms/checkbox-field.tsx";
import FormButtons from "@/components/forms/form-buttons.tsx";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import type { SelectFieldState } from "@/components/forms/select-field.tsx";
import SelectField from "@/components/forms/select-field.tsx";
import { formatYMD } from "@/lib/date-utils.ts";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Separator } from "@/shared/components/ui/separator.tsx";
import { Phase } from "@/types/game.ts";
import type { Option } from "@/types/option.ts";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    date: Date,
    phase: string,
    round: string,
    seasonId: string,
    divisionId: string,
    activated: boolean,
    archived: boolean,
  },
  fieldErrors: {
    date?: string[],
    phase?: string[],
    round?: string[],
    seasonId?: string[],
    divisionId?: string[],
    activated?: string[],
    archived?: string[],
  },
};

type GameFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update", /* todo: make into type */
  isPending: boolean,
  onCancel: () => void,
};

const phaseOptions: Option[] = [
  { value: Phase.PRE_SEASON,     label: "Pre Season" },
  { value: Phase.REGULAR_SEASON, label: "Regular Season" },
  { value: Phase.POST_SEASON,    label: "Post Season" },
] as const;

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: GameFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;
  const [ seasonsOptions, setSeasonsOptions ] = useState<Option[]>([]);
  const [ divisionsOptions, setDivisionsOptions ] = useState<Option[]>([]);
  const { data: seasonsData } = useQuery(buildOptionsQueryOptions(queryKeys.Seasons));
  const { data: divisionsData } = useQuery(buildOptionsQueryOptions(queryKeys.Divisions));

  useEffect(() => {
    if (seasonsData) {
      setSeasonsOptions(seasonsData as Option[]);
    }
    if (divisionsData) {
      setDivisionsOptions(divisionsData as Option[]);
    }
  }, [seasonsData, divisionsData]);

  const dateFieldState: InputFieldState = {
    name:     "date",
    type:     "date",
    label:    "Date",
    description: "Enter a date and time for when the game occurred.",
    required: true,
    value:    formatYMD(fieldValues.date),
    errors:   fieldErrors.date || [],
  };

  const phaseFieldState: SelectFieldState = {
    name:     "phase",
    label:    "Phase",
    description: "Select a phase for when the game occurred.",
    required: true,
    value:    fieldValues.phase.toString(),
    values:   phaseOptions,
    errors:   fieldErrors.phase || [],
  };

  const roundFieldState: InputFieldState = {
    name:     "round",
    type:     "text",
    label:    "Round",
    description: "Enter a round for when the game occurred during the current season.",
    required: true,
    value:    fieldValues.round.toString(),
    errors:   fieldErrors.round || [],
  };

  const seasonIdFieldState: SelectFieldState = {
    name:     "seasonId",
    label:    "Season",
    required: true,
    value:    fieldValues.seasonId.toString(),
    values:   seasonsOptions,
    errors:   fieldErrors.seasonId || [],
  };

  const divisionIdFieldState: SelectFieldState = {
    name:     "divisionId",
    label:    "Division",
    required: true,
    value:    fieldValues.divisionId.toString(),
    values:   divisionsOptions,
    errors:   fieldErrors.divisionId || [],
  };

  const activatedFieldState: CheckboxFieldState = {
    name:     "activated",
    label:    "Activated",
    description: "An activated Team is available for selection and be displayed across the league.",
    value:    fieldValues.activated,
    errors:   fieldErrors.activated || [],
  };

  const archivedFieldState: CheckboxFieldState = {
    name:     "archived",
    label:    "Archived",
    description: "An archived Team is no longer accessible for selection, however will still be displayed for historic results.",
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
              A game...
            </FieldDescription>
            <InputField fieldState={dateFieldState} />
            <SelectField fieldState={phaseFieldState}></SelectField>
            <InputField fieldState={roundFieldState} />
            <SelectField fieldState={seasonIdFieldState}></SelectField>
            <SelectField fieldState={divisionIdFieldState}></SelectField>
          </FieldSet>
          <Separator />
          <FieldSet>
            <FieldLegend>
              Configuration
            </FieldLegend>
            <FieldDescription>
              A game...
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
