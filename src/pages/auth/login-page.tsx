import { loginMutationFn } from "@/apis/mutation-functions.ts";
import LoginForm, { type FormState } from "@/components/forms/login-form.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { zLogin } from "@/schemas/login.ts";
import type { LoginData } from "@/types/login.ts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import { Fragment, useActionState, useEffect } from "react";
import { z } from "zod";

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
      router.invalidate();
      router.navigate({
        to: leaguePaths.League,
        replace: true,
      });
    },
  });

  const [ formState, formAction, isPending ] = useActionState(async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      return formData.get(key).toString();
    }

    const fieldValues = {
      email:    getValue("email"),
      password: getValue("password"),
    };

    try {
      zLogin.parse(fieldValues);
      await mutation.mutateAsync<LoginData>(fieldValues);
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = z.flattenError(error);

        return {
          fieldValues,
          fieldErrors,
          formErrors: [],
        };
      }
      else if (axios.isAxiosError(error)) {
        const { formErrors } = error.response.data;

        return {
          fieldValues,
          fieldErrors: {},
          formErrors,
        };
      }

      return {
        fieldValues,
        fieldErrors: {},
        formErrors: ["Unexpected error has occurred."],
      };
    }

    return {
      fieldValues,
      fieldErrors: {},
      formErrors: [],
    };
  }, initialFormState);

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
