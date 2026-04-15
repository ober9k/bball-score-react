import { divisionLoader, divisionsLoader } from "@/apis/loaders.ts";
import DivisionPage from "@/pages/league/divisions/division-page";
import DivisionsPage from "@/pages/league/divisions/divisions-page";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

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
