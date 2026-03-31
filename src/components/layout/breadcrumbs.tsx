import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbList, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb";
import { Fragment } from "react"

export type Link = {
  title: string,
  to?: string,
  params?: object,
}

type Props = {
  links: Link[],
};

function BreadcrumbForLink({ link }: Link) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={link.to}>
        {link.title}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

function BreadcrumbForPage({ link }: Link) {
  return (
    <BreadcrumbItem>
      <BreadcrumbPage>
        {link.title}
      </BreadcrumbPage>
    </BreadcrumbItem>
  );
}

export default function Breadcrumbs({ links }: Props) {
  const isNotFirst = (index) => index !== 0;
  const forLink = (link) => !!link.to;
  const forPage = (link) => !link.to;

  return (
    <>
      <Breadcrumb className="flex gap-2 p-2">
        <BreadcrumbList>
          {links.map((link, index) => (
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
