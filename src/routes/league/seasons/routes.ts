import { buildSeasonQueryOptions, seasonsQueryOptions } from "@/apis/query-options.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import SeasonPage from "@/pages/league/seasons/season-page";
import SeasonsPage from "@/pages/league/seasons/seasons-page";
import UpdatePage from "@/pages/league/seasons/update-page.tsx";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";
import { notFound } from "@tanstack/react-router";
import type { AxiosError } from "axios";

export async function seasonsLoader({ context }) {
  return {
    seasons: await context.queryClient.ensureQueryData(seasonsQueryOptions)
  };
}

export async function seasonLoader({ context, params }) {
  const seasonId = +params["seasonId"];

  try {
    return {
      season: await context.queryClient.ensureQueryData(buildSeasonQueryOptions(seasonId))
    };
  }
  catch (error: AxiosError) {
    throw notFound();
  }
}

const paths = {
  Seasons: "/league/seasons",
  Season:  "/league/seasons/$seasonId",
  SeasonUpdate:  "/league/seasons/$seasonId/update",
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
}, {
  path: paths.SeasonUpdate,
  component: UpdatePage,
  errorComponent: NotFoundPage,
  loader: seasonLoader,
}];

export const seasonsPaths = paths;
export const seasonsRoutes = routes
    .map(mapRoute);
