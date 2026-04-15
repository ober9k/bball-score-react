import { seasonLoader, seasonsLoader } from "@/apis/loaders.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import SeasonPage from "@/pages/league/seasons/season-page";
import SeasonsPage from "@/pages/league/seasons/seasons-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

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
