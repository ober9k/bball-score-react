import { buildPlayersMutationFn } from "@/apis/manage/mutation-functions.ts";
import type { ManagePlayersByIdLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/players/forms/actions.tsx";
import UpdateForm, { buildInitialState } from "@/pages/manager/players/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

export function UpdatePage() {
  const { player }: ManagePlayersByIdLoaderProps = getRouteApi(managerPaths.Players.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Player", player.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Players", to: managerPaths.Players.Index },
    { title: "Update Player" },
  ]);

  const mutation = useMutation({
    mutationFn: buildPlayersMutationFn(player.id),
    onSuccess: async () => {
      router.navigate({
        to: managerPaths.Players.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState(player));

  const onCancel = () => {
    router.navigate({
      to: managerPaths.Players.Index,
      replace: true,
    });
  };

  return (
    <Fragment>
      <UpdateForm formAction={formAction} formState={formState} formMode={"update"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { UpdatePage as PlayersUpdatePage };
