import * as styles from "@/components/layout/page/page-content.module.css";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode,
}

export default function PageContent({ children }: Props) {
  return (
    <article className={styles.content}>
      {children}
    </article>
  );
}
