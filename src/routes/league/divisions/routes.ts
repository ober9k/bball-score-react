import { buildDivisionQueryOptions, divisionsQueryOptions } from "@/apis/query-options";
import DivisionPage from "@/pages/league/divisions/division-page";
import DivisionsPage from "@/pages/league/divisions/divisions-page";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";
import type { AxiosError } from "axios";

async function divisionsLoader({ context }) {
  return {
    divisions: await context.queryClient.ensureQueryData(divisionsQueryOptions)
  };
}

async function divisionLoader({ context, params }) {
  const divisionId = +params["divisionId"];

  try {
    return {
      division: await context.queryClient.ensureQueryData(buildDivisionQueryOptions(divisionId))
    };
  }
  catch (error: AxiosError) {
    throw new Error(error.message);
  }
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
  errorComponent: NotFoundPage,
  loader: divisionLoader,
}];

export const divisionsPaths = paths;
export const divisionsRoutes = routes
    .map(mapRoute);
