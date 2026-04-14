import { buildTeamsMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/teams/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/teams/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { TeamDataWithId } from "@/types/team.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
    shortName: "",
    divisionId: "",
  },
  fieldErrors: {},
  formErrors:  [],
};

type LoaderProps = {
  team: TeamDataWithId, /* temp */
}

export function UpdatePage() {
  const { team }: LoaderProps = getRouteApi(managerPaths.Teams.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Team", team.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League },
    { title: "Teams", to: managerPaths.Teams.Index },
    { title: "Update Team" },
  ]);

  initialFormState.fieldValues.name = team.name;
  initialFormState.fieldValues.shortName = team.shortName;
  initialFormState.fieldValues.divisionId = team.divisionId;

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
