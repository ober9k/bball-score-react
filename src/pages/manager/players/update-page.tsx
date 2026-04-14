import { buildPlayersMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/players/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/players/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { PlayerDataWithId } from "@/types/player.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
    position: "",
    number: "",
    height: "",
  },
  fieldErrors: {},
  formErrors:  [],
};

type LoaderProps = {
  player: PlayerDataWithId, /* temp */
}

export function UpdatePage() {
  const { player }: LoaderProps = getRouteApi(managerPaths.Players.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Player", player.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League },
    { title: "Players", to: managerPaths.Players.Index },
    { title: "Update Player" },
  ]);

  initialFormState.fieldValues.name = player.name;
  initialFormState.fieldValues.position = player.position;
  initialFormState.fieldValues.number = player.number;
  initialFormState.fieldValues.height = player.height;

  const mutation = useMutation({
    mutationFn: buildPlayersMutationFn(player.id),
    onSuccess: async () => {
      router.navigate({
        to: managerPaths.Players.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), initialFormState);

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
