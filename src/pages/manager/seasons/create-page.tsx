import { buildSeasonsMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/seasons/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/seasons/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
    activated: false,
    archived: false,
  },
  fieldErrors: {},
  formErrors:  [],
};

export function CreatePage() {
  const router = useRouter();

  useTitle("Create Season");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Seasons", to: managerPaths.Seasons.Index },
    { title: "Create Season" },
  ]);

  const mutation = useMutation({
    mutationFn: buildSeasonsMutationFn(),
    onSuccess: () => {
      router.navigate({
        to: managerPaths.Seasons.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), initialFormState);

  const onCancel = () => {
    router.navigate({
      to: managerPaths.Seasons.Index,
      replace: true,
    });
  };

  return (
    <Fragment>
      <UpdateForm formAction={formAction} formState={formState} formMode={"create"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { CreatePage as SeasonsCreatePage };
