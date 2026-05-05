import { buildDivisionsMutationFn } from "@/apis/manage/mutation-functions.ts";
import type { ManageDivisionsByIdLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/manager/divisions/forms/actions.tsx";
import UpdateForm, { buildInitialState } from "@/pages/manager/divisions/forms/update-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

export function UpdatePage() {
  const { division }: ManageDivisionsByIdLoaderProps = getRouteApi(managerPaths.Divisions.Update).useLoaderData();
  const router = useRouter();

  useTitle("Update Division", division.name);
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Divisions", to: managerPaths.Divisions.Index },
    { title: "Update Division" },
  ]);

  const mutation = useMutation({
    mutationFn: buildDivisionsMutationFn(division.id),
    onSuccess: async () => {
      router.navigate({
        to: managerPaths.Divisions.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState(division));

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
