import PageBreadcrumbs from "@/components/layout/page/page-breadcrumbs.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import * as styles from "@/components/layout/page/page-header.module.css";

export default function PageHeader() {
  const { pageTitle, pageSubTitle, pageBreadcrumbs } = usePageContext();

  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1 className={styles.title}>
          {pageTitle}
        </h1>
        {pageSubTitle && (
          <h2 className={styles.subTitle}>
            &ndash; {pageSubTitle}
          </h2>
        )}
      </div>
      <div className={styles.breadcrumbs}>
        <PageBreadcrumbs links={pageBreadcrumbs} />
      </div>
    </header>
  );
}
