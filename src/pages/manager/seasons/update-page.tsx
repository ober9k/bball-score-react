import { buildSeasonMutationFn } from "@/apis/mutation-functions.ts";
import type { FormState } from "@/components/forms/season-form.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/seasons/forms/actions.tsx";
import UpdateForm from "@/pages/manager/seasons/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { SeasonDataWithId } from "@/types/season.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    name: "",
  },
  fieldErrors: {},
  formErrors:  [],
};

type LoaderProps = {
  season: SeasonDataWithId, /* temp */
}

export default function UpdatePage() {
  const { season }: LoaderProps = getRouteApi(managerPaths.Seasons.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Season", season.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League },
    { title: "Seasons", to: managerPaths.Seasons.Index },
    { title: "Update Season" },
  ]);

  initialFormState.fieldValues.name = season.name;

  const mutation = useMutation({
    mutationFn: buildSeasonMutationFn(season.id),
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
