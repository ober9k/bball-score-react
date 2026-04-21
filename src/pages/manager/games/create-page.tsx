import { buildGamesMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/games/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/games/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    date:       "",
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

export function CreatePage() {
  const router = useRouter();

  useTitle("Create Game");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Games", to: managerPaths.Games.Index },
    { title: "Create Game" },
  ]);

  const mutation = useMutation({
    mutationFn: buildGamesMutationFn(),
    onSuccess: () => {
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
      <UpdateForm formAction={formAction} formState={formState} formMode={"create"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { CreatePage as GamesCreatePage };
