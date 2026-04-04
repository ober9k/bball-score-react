import { buildSeasonQueryOptions, seasonsQueryOptions } from "@/apis/query-options.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import SeasonPage from "@/pages/league/seasons/season-page";
import SeasonsPage from "@/pages/league/seasons/seasons-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";
import type { AxiosError } from "axios";

async function seasonsLoader({ context }) {
  return {
    seasons: await context.queryClient.ensureQueryData(seasonsQueryOptions)
  };
}

async function seasonLoader({ context, params }) {
  const seasonId = +params["seasonId"];

  try {
    return {
      season: await context.queryClient.ensureQueryData(buildSeasonQueryOptions(seasonId))
    };
  }
  catch (error: AxiosError) {
    throw new Error(error.message);
  }
}

const paths = {
  Seasons: "/league/seasons",
  Season:  "/league/seasons/$seasonId",
};

const routes: Route[] = [{
  path: paths.Seasons,
  component: SeasonsPage,
  loader: seasonsLoader,
}, {
  path: paths.Season,
  component: SeasonPage,
  errorComponent: NotFoundPage,
  loader: seasonLoader,
}];

export const seasonsPaths = paths;
export const seasonsRoutes = routes
    .map(mapRoute);
