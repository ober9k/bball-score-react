import { i18n } from "@/lib/phrases.ts";
import { Button } from "@/shared/components/ui/button.tsx";
import { Field as UiField } from "@/shared/components/ui/field.tsx";
import { Fragment } from "react";

type Props = {
  formMode: "create" | "update", /* todo: make into type */
  isPending: boolean,
  onCancel: () => void,
}

export default function FormButtons({ formMode, isPending, onCancel }: Props) {
  const isCreate = () => {
    return formMode === "create";
  }

  const buttonLabels = (isCreate())
    ? [i18n("button.create"), i18n("button.create.inProgress") + "..."]
    : [i18n("button.update"), i18n("button.update.inProgress") + "..."];

  return (
    <Fragment>
      <UiField orientation="horizontal" className="flex justify-center">
        <Button type="reset" variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button type="submit">
          {!isPending ? buttonLabels[0] : buttonLabels[1]}
        </Button>
      </UiField>
    </Fragment>
  );
}
