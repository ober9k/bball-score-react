import { buildTeamsMutationFn } from "@/apis/manage/mutation-functions.ts";
import type { ManageTeamsByIdLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/teams/forms/actions.tsx";
import UpdateForm, { buildInitialState } from "@/pages/manager/teams/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

export function UpdatePage() {
  const { team }: ManageTeamsByIdLoaderProps = getRouteApi(managerPaths.Teams.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Team", team.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Teams", to: managerPaths.Teams.Index },
    { title: "Update Team" },
  ]);

  const mutation = useMutation({
    mutationFn: buildTeamsMutationFn(team.id),
    onSuccess: async () => {
      router.navigate({
        to: managerPaths.Teams.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState(team));

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
