import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb.tsx";
import { Fragment } from "react"

export type Link = {
  title: string,
  to?: string,
  params?: object,
};

type LinkProps = {
  link: Link,
};

type Props = {
  breadcrumbs: Link[],
};

function BreadcrumbForLink(props: LinkProps) {
  const { link } = props;

  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={link.to}>
        {link.title}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

function BreadcrumbForPage(props: LinkProps) {
  const { link } = props;

  return (
    <BreadcrumbItem>
      <BreadcrumbPage>
        {link.title}
      </BreadcrumbPage>
    </BreadcrumbItem>
  );
}

export default function PageBreadcrumbs({ breadcrumbs }: Props) {
  const isNotFirst = (index) => index !== 0;
  const forLink = (link) => !!link.to;
  const forPage = (link) => !link.to;

  return (
    <>
      <Breadcrumb className="flex gap-2">
        <BreadcrumbList>
          {(breadcrumbs || []).map((link, index) => (
            <Fragment key={index}>
              {(isNotFirst(index) && <BreadcrumbSeparator />)}
              {(forLink(link) && <BreadcrumbForLink link={link} />)}
              {(forPage(link) && <BreadcrumbForPage link={link} />)}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
