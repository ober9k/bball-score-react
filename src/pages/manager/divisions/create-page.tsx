import { buildDivisionsMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/divisions/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/divisions/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
    seasonId: "",
    activated: false,
    archived: false,
  },
  fieldErrors: {},
  formErrors:  [],
};

export function CreatePage() {
  const router = useRouter();

  useTitle("Create Division");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Divisions", to: managerPaths.Divisions.Index },
    { title: "Create Division" },
  ]);

  const mutation = useMutation({
    mutationFn: buildDivisionsMutationFn(),
    onSuccess: () => {
      router.navigate({
        to: managerPaths.Divisions.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), initialFormState);

  const onCancel = () => {
    router.navigate({
      to: managerPaths.Divisions.Index,
      replace: true,
    });
  };

  return (
    <Fragment>
      <UpdateForm formAction={formAction} formState={formState} formMode={"create"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { CreatePage as DivisionsCreatePage };
