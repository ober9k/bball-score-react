import type { TeamLoaderProps } from "@/apis/loaders/types.ts";
import { buildTeamsMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/teams/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/teams/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
    shortName: "",
    divisionId: "",
    active: false,
    archived: false,
  },
  fieldErrors: {},
  formErrors:  [],
};

export function UpdatePage() {
  const { team }: TeamLoaderProps = getRouteApi(managerPaths.Teams.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Team", team.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Teams", to: managerPaths.Teams.Index },
    { title: "Update Team" },
  ]);

  initialFormState.fieldValues.name = team.name;
  initialFormState.fieldValues.shortName = team.shortName;
  initialFormState.fieldValues.divisionId = team.divisionId;
  initialFormState.fieldValues.active = team.active;
  initialFormState.fieldValues.archived = team.archived;

  const mutation = useMutation({
    mutationFn: buildTeamsMutationFn(team.id),
    onSuccess: async () => {
      router.navigate({
        to: managerPaths.Teams.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), initialFormState);

  const onCancel = () => {
    router.navigate({
      to: managerPaths.Teams.Index,
      replace: true,
    });
  };

  return (
    <Fragment>
      <UpdateForm formAction={formAction} formState={formState} formMode={"update"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { UpdatePage as TeamsUpdatePage };
