import { FieldDescription as UiFieldDescription } from "@/shared/components/ui/field.tsx";
import { Fragment } from "react";

type Props = {
  description?: string,
};

export default function FieldDescription({ description }: Props) {
  const hasDescription = (): boolean => {
    return description !== undefined;
  };

  if (hasDescription()) {
    return (
      <Fragment>
        <UiFieldDescription>
          {description}
        </UiFieldDescription>
      </Fragment>
    );
  }

  return (
    <Fragment />
  );
}
