import type { ReactNode } from "react";

type SubHeadingProps = {
  children: ReactNode,
}

export default function SubHeading({ children }: SubHeadingProps) {
  return (
    <h2 className="mt-1 mb-3 py-1 text-lg font-medium border-b border-gray-200">
      {children}
    </h2>
  )
}