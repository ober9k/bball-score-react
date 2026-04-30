import type { ManageSeasonsByIdLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { buildSeasonsMutationFn } from "@/apis/manage/mutation-functions.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/seasons/forms/actions.tsx";
import UpdateForm, { type FormState } from "@/pages/manager/seasons/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
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

export function UpdatePage() {
  const { season }: ManageSeasonsByIdLoaderProps = getRouteApi(managerPaths.Seasons.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Season", season.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Seasons", to: managerPaths.Seasons.Index },
    { title: "Update Season" },
  ]);

  initialFormState.fieldValues.name = season.name;
  initialFormState.fieldValues.activated = season.activated;
  initialFormState.fieldValues.archived = season.archived;

  const mutation = useMutation({
    mutationFn: buildSeasonsMutationFn(season.id),
    onSuccess: async () => {
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
      <UpdateForm formAction={formAction} formState={formState} formMode={"update"} isPending={isPending} onCancel={onCancel} />
    </Fragment>
  );
}

export { UpdatePage as SeasonsUpdatePage };
