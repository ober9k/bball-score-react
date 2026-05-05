import { buildGamesMutationFn } from "@/apis/manage/mutation-functions.ts";
import type { ManageGamesByIdLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/games/forms/actions.tsx";
import UpdateForm, { buildInitialState } from "@/pages/manager/games/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

export function UpdatePage() {
  const { game }: ManageGamesByIdLoaderProps = getRouteApi(managerPaths.Games.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Game", game.id.toString());
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Games", to: managerPaths.Games.Index },
    { title: "Update Game" },
  ]);

  const mutation = useMutation({
    mutationFn: buildGamesMutationFn(game.id),
    onSuccess: async () => {
      router.navigate({
        to: managerPaths.Games.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState(game));

  const onCancel = () => {
    router.navigate({
      to: managerPaths.Games.Index,
      replace: true,
    });
  };

  return (
    <Fragment>
      <UpdateForm formAction={formAction} formState={formState} formMode={"update"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { UpdatePage as GamesUpdatePage };
