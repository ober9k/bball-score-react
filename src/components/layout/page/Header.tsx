import type { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode,
}

export default function Header(props: HeaderProps) {
  return (
    <header className="relative bg-white shadow-sm">
      <div className="mx-auto max-w-2xl p-4 py-6">
        <h1 className="text-3xl font-medium tracking-tight text-gray-900 text-left">
          {props.children}
        </h1>
      </div>
    </header>
  );
}
