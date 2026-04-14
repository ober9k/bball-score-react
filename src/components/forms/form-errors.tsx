import { FieldError } from "@/shared/components/ui/field.tsx";
import { Fragment } from "react";

type Props = {
  errors: string[],
};

export default function FormErrors({ errors }: Props) {
  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  if (hasErrors()) {
    return (
      <Fragment>
        <FieldError>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </FieldError>
      </Fragment>
    );
  }

  return (
    <Fragment />
  );
}
