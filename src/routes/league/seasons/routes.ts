import { fetchAll, fetchById } from "@/apis/api.ts";
import { buildSeasonQueryOptions, seasonsQueryOptions } from "@/apis/query-options.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import SeasonPage from "@/pages/league/seasons/season-page";
import SeasonsPage from "@/pages/league/seasons/seasons-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

export async function seasonsLoader({ context }) {
  return fetchAll(context.queryClient, seasonsQueryOptions);
}

export async function seasonLoader({ context, params }) {
  const seasonId = +params["seasonId"];
  return fetchById(context.queryClient, buildSeasonQueryOptions(seasonId));
}

const paths = {
  Seasons: "/league/seasons",
  Season:  "/league/seasons/$seasonId",
};

const routes: Route[] = [{
  path: paths.Seasons,
  component: SeasonsPage,
  loader: seasonsLoader,
},{
  path: paths.Season,
  component: SeasonPage,
  notFoundComponent: NotFoundPage,
  loader: seasonLoader,
}];

export const seasonsPaths = paths;
export const seasonsRoutes = routes
    .map(mapRoute);
