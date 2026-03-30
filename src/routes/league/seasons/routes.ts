import SeasonPage from "@/pages/league/seasons/season-page";
import SeasonsPage from "@/pages/league/seasons/seasons-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

const paths = {
  Seasons: "/league/seasons",
  Season:  "/league/season/$seasonId",
};

const routes: Route[] = [{
  path: paths.Seasons,
  component: SeasonsPage,
}, {
  path: paths.Season,
  component: SeasonPage,
}];

export const seasonsPaths = paths;
export const seasonsRoutes = routes
    .map(mapRoute);
