import DivisionPage from "@/pages/league/divisions/division-page";
import DivisionsPage from "@/pages/league/divisions/divisions-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

const paths = {
  Divisions: "/league/divisions",
  Division:  "/league/division/$divisionId",
};

const routes: Route[] = [{
  path: paths.Divisions,
  component: DivisionsPage,
}, {
  path: paths.Division,
  component: DivisionPage,
}];

export const divisionsPaths = paths;
export const divisionsRoutes = routes
    .map(mapRoute);
