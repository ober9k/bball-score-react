import type { ReactNode } from "react";

type ContentProps = {
  children?: ReactNode,
}

export default function Content(props: ContentProps) {
  return (
    <article className="mx-auto bg-white shadow-sm max-w-2xl mt-8 p-6 sm:rounded-lg">
      {props.children}
    </article>
  );
}
