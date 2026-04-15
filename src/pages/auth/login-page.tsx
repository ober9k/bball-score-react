import { loginMutationFn } from "@/apis/mutation-functions.ts";
import { useTitle } from "@/hooks/page.ts";
import { buildFormAction } from "@/pages/auth/forms/actions.tsx";
import LoginForm, { type FormState } from "@/pages/auth/forms/login-form.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useActionState } from "react";

const initialFormState: FormState = {
  fieldValues: {
    email:    "",
    password: "",
  },
  fieldErrors: {},
  formErrors:  [],
};

export default function LoginPage() {
  const router = useRouter();

  useTitle("Login");

  const mutation = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: () => {
      router.navigate({
        to: leaguePaths.League.Index,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), initialFormState);

  const onCancel = () => {
    router.navigate({
      to: leaguePaths.League.Index,
      replace: true,
    });
  };

  return (
    <>
      <LoginForm formAction={formAction} formState={formState} isPending={isPending} onCancel={onCancel} />
    </>
  );
}
