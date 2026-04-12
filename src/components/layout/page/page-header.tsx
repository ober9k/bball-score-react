import PageBreadcrumbs from "@/components/layout/page/page-breadcrumbs.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import * as styles from "@/components/layout/page/page-header.module.css";

export default function PageHeader() {
  const { title, subTitle, breadcrumbs } = usePageContext();

  const hasBreadcrumbs = () => breadcrumbs.length > 0;

  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1 className={styles.title}>
          {title}
        </h1>
        {subTitle && (
          <h2 className={styles.subTitle}>
            &ndash; {subTitle}
          </h2>
        )}
      </div>
      {(hasBreadcrumbs()) && (
        <div className={styles.breadcrumbs}>
          <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      )}
    </header>
  );
}
