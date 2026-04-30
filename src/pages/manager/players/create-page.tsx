import { buildPlayersMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/players/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/players/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
    position: "",
    number: "",
    height: "",
    activated: false,
    archived: false,
  },
  fieldErrors: {},
  formErrors:  [],
};

export function CreatePage() {
  const router = useRouter();

  useTitle("Create Player");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Players", to: managerPaths.Players.Index },
    { title: "Create Player" },
  ]);

  const mutation = useMutation({
    mutationFn: buildPlayersMutationFn(),
    onSuccess: () => {
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
      <UpdateForm formAction={formAction} formState={formState} formMode={"create"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { CreatePage as PlayersCreatePage };
