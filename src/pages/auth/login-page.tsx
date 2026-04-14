import { loginMutationFn } from "@/apis/mutation-functions.ts";
import usePageContext from "@/hooks/use-page-context.ts";
import { buildFormAction } from "@/pages/auth/forms/actions.tsx";
import LoginForm, { type FormState } from "@/pages/auth/forms/login-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useActionState, useEffect } from "react";

const initialFormState: FormState = {
  fieldValues: {
    email:    "",
    password: "",
  },
  fieldErrors: {},
  formErrors:  [],
};

export default function LoginPage() {
  const { setPageHeader } = usePageContext();
  const router = useRouter();

  useEffect(() => {
    setPageHeader("Login");
  }, []);

  const mutation = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: () => {
      router.navigate({
        to: leaguePaths.League,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), initialFormState);

  const onCancel = () => {
    router.navigate({
      to: leaguePaths.League,
      replace: true,
    });
  };

  return (
    <>
      <LoginForm formAction={formAction} formState={formState} isPending={isPending} onCancel={onCancel} />
    </>
  );
}
