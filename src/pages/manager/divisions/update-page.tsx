import type { DivisionLoaderProps } from "@/apis/loaders/types.ts";
import { buildDivisionsMutationFn } from "@/apis/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/divisions/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/divisions/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
    seasonId: "",
    active: false,
    archived: false,
  },
  fieldErrors: {},
  formErrors:  [],
};

export function UpdatePage() {
  const { division }: DivisionLoaderProps = getRouteApi(managerPaths.Divisions.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Division", division.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Divisions", to: managerPaths.Divisions.Index },
    { title: "Update Division" },
  ]);

  initialFormState.fieldValues.name = division.name;
  initialFormState.fieldValues.seasonId = division.seasonId.toString();
  initialFormState.fieldValues.active = division.active;
  initialFormState.fieldValues.archived = division.archived;

  const mutation = useMutation({
    mutationFn: buildDivisionsMutationFn(division.id),
    onSuccess: async () => {
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
      <UpdateForm formAction={formAction} formState={formState} formMode={"update"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { UpdatePage as DivisionsUpdatePage };
