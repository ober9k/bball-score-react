import { rootRoute } from "@/routes/route-tree.ts";
import { createRoute, type RouteComponent } from "@tanstack/react-router";

/**
 * Proper type handling TBD.
 */
export type Route = {
  path: string,
  component: RouteComponent,
  errorComponent?: RouteComponent,
  notFoundComponent?: RouteComponent,
  loader?: any,
};

export const mapRoute = (route: Route) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: route.path,
    component: route.component,
    errorComponent: route.errorComponent,
    notFoundComponent: route.notFoundComponent,
    loader: route.loader,
  });
};
