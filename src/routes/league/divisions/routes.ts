import { fetchAll, fetchById } from "@/apis/api.ts";
import { buildDivisionQueryOptions, divisionsQueryOptions } from "@/apis/query-options";
import DivisionPage from "@/pages/league/divisions/division-page";
import DivisionsPage from "@/pages/league/divisions/divisions-page";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

export async function divisionsLoader({ context }) {
  return fetchAll(context.queryClient, divisionsQueryOptions);
}

export async function divisionLoader({ context, params }) {
  const divisionId = +params["divisionId"];
  return fetchById(context.queryClient, buildDivisionQueryOptions(divisionId));
}

const paths = {
  Divisions: "/league/divisions",
  Division:  "/league/divisions/$divisionId",
};

const routes: Route[] = [{
  path: paths.Divisions,
  component: DivisionsPage,
  loader: divisionsLoader,
}, {
  path: paths.Division,
  component: DivisionPage,
  notFoundComponent: NotFoundPage,
  loader: divisionLoader,
}];

export const divisionsPaths = paths;
export const divisionsRoutes = routes
    .map(mapRoute);
