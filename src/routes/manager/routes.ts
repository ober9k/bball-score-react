import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import UnauthorizedPage from "@/pages/league/errors/unauthorized-page.tsx";
import { SeasonsCreatePage } from "@/pages/manager/seasons/create-page.tsx";
import { SeasonsIndexPage } from "@/pages/manager/seasons/index-page.tsx";
import { SeasonsUpdatePage } from "@/pages/manager/seasons/update-page.tsx";
import { seasonLoader, seasonsLoader } from "@/routes/league/seasons/routes.ts";
import { mapRoute } from "@/routes/route.ts";

const paths = {
  Seasons: {
    Index:  "/manager/seasons",
    Create: "/manager/seasons/create",
    Update: "/manager/seasons/$seasonId/update",
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
}];

export const managerPaths = paths;
export const managerRoutes = routes
  .map(mapRoute);
