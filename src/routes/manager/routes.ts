import { SeasonsCreatePage, SeasonsIndexPage, SeasonsUpdatePage } from "@/pages/manager/seasons";
import { mapRoute } from "@/routes/route.ts";

const paths = {
  Seasons: {
    Index:  "/manager/seasons",
    Create: "/manager/seasons/create",
    Update: "/manager/seasons/$seasonId/update",
  },
};

const isManagerGuard = ({ context }) => {
  return;
}

const routes = [{
  path: paths.Seasons.Index,
  beforeLoad: isManagerGuard,
  component: SeasonsIndexPage,
},{
  path: paths.Seasons.Create,
  beforeLoad: isManagerGuard,
  component: SeasonsCreatePage,
},{
  path: paths.Seasons.Update,
  beforeLoad: isManagerGuard,
  component: SeasonsUpdatePage,
}];

export const managerPaths = paths;
export const managerRoutes = routes
  .map(mapRoute);
