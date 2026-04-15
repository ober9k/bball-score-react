import { divisionLoader, divisionsLoader, playerLoader, playersLoader, seasonLoader, seasonsLoader, teamLoader, teamsLoader } from "@/apis/loaders.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import UnauthorizedPage from "@/pages/league/errors/unauthorized-page.tsx";
import { DivisionsCreatePage } from "@/pages/manager/divisions/create-page.tsx";
import { DivisionsIndexPage } from "@/pages/manager/divisions/index-page.tsx";
import { DivisionsUpdatePage } from "@/pages/manager/divisions/update-page.tsx";
import { PlayersCreatePage } from "@/pages/manager/players/create-page.tsx";
import { PlayersIndexPage } from "@/pages/manager/players/index-page.tsx";
import { PlayersUpdatePage } from "@/pages/manager/players/update-page.tsx";
import { SeasonsCreatePage } from "@/pages/manager/seasons/create-page.tsx";
import { SeasonsIndexPage } from "@/pages/manager/seasons/index-page.tsx";
import { SeasonsUpdatePage } from "@/pages/manager/seasons/update-page.tsx";
import { TeamsCreatePage } from "@/pages/manager/teams/create-page.tsx";
import { TeamsIndexPage } from "@/pages/manager/teams/index-page.tsx";
import { TeamsUpdatePage } from "@/pages/manager/teams/update-page.tsx";
import { mapRoute } from "@/routes/route.ts";

const paths = {
  Seasons: {
    Index:  "/manager/seasons",
    Create: "/manager/seasons/create",
    Update: "/manager/seasons/$seasonId/update",
  },
  Divisions: {
    Index:  "/manager/divisions",
    Create: "/manager/divisions/create",
    Update: "/manager/divisions/$divisionId/update",
  },
  Teams: {
    Index:  "/manager/teams",
    Create: "/manager/teams/create",
    Update: "/manager/teams/$teamId/update",
  },
  Players: {
    Index:  "/manager/players",
    Create: "/manager/players/create",
    Update: "/manager/players/$playerId/update",
  },
};

const isManagerGuard = ({ context }) => {
  const { isAuthenticated } = context.authContext;

  if (!isAuthenticated()) {
    throw Error("Unauthorized");
  }

  return;
}

const defaultOptions = {
  beforeLoad: isManagerGuard,
  errorComponent: UnauthorizedPage,
};

const routes = [{
  path: paths.Seasons.Index,
  component: SeasonsIndexPage,
  loader: seasonsLoader,
  ...defaultOptions,
},{
  path: paths.Seasons.Create,
  component: SeasonsCreatePage,
  ...defaultOptions,
},{
  path: paths.Seasons.Update,
  component: SeasonsUpdatePage,
  notFoundComponent: NotFoundPage,
  loader: seasonLoader,
  ...defaultOptions,
},{
  path: paths.Divisions.Index,
  component: DivisionsIndexPage,
  loader: divisionsLoader,
  ...defaultOptions,
},{
  path: paths.Divisions.Create,
  component: DivisionsCreatePage,
  ...defaultOptions,
},{
  path: paths.Divisions.Update,
  component: DivisionsUpdatePage,
  notFoundComponent: NotFoundPage,
  loader: divisionLoader,
  ...defaultOptions,
},{
  path: paths.Teams.Index,
  component: TeamsIndexPage,
  loader: teamsLoader,
  ...defaultOptions,
},{
  path: paths.Teams.Create,
  component: TeamsCreatePage,
  ...defaultOptions,
},{
  path: paths.Teams.Update,
  component: TeamsUpdatePage,
  notFoundComponent: NotFoundPage,
  loader: teamLoader,
  ...defaultOptions,
},{
  path: paths.Players.Index,
  component: PlayersIndexPage,
  loader: playersLoader,
  ...defaultOptions,
},{
  path: paths.Players.Create,
  component: PlayersCreatePage,
  ...defaultOptions,
},{
  path: paths.Players.Update,
  component: PlayersUpdatePage,
  notFoundComponent: NotFoundPage,
  loader: playerLoader,
  ...defaultOptions,
}];

export const managerPaths = paths;
export const managerRoutes = routes
  .map(mapRoute);
