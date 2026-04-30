import type { ManageGamesByIdLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { buildGamesMutationFn } from "@/apis/manage/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { mapPhase } from "@/lib/game-utils.ts";
import { buildFormAction } from "@/pages/manager/games/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/games/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    date:       new Date(),
    phase:      "",
    round:      "",
    seasonId:   "",
    divisionId: "",
    active:     false,
    archived:   false,
  },
  fieldErrors: {},
  formErrors:  [],
};

export function UpdatePage() {
  const { game }: ManageGamesByIdLoaderProps = getRouteApi(managerPaths.Games.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Game", game.id.toString());
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Games", to: managerPaths.Games.Index },
    { title: "Update Game" },
  ]);

  initialFormState.fieldValues.date = game.date;
  initialFormState.fieldValues.phase = mapPhase(game.phase);
  initialFormState.fieldValues.round = game.round.toString();
  initialFormState.fieldValues.seasonId = game.seasonId.toString();
  initialFormState.fieldValues.divisionId = game.divisionId.toString();
  initialFormState.fieldValues.activated = game.activated;
  initialFormState.fieldValues.archived = game.archived;

  const mutation = useMutation({
    mutationFn: buildGamesMutationFn(game.id),
    onSuccess: async () => {
      router.navigate({
        to: managerPaths.Games.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), initialFormState);

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
