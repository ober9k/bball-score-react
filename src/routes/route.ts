import { rootRoute } from "@/routes/route-tree.ts";
import { createRoute } from "@tanstack/react-router";

/**
 * Proper type handling TBD.
 */
export type Route = {
  path: any,
  component: any,
};

export const mapRoute = (route: Route) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: route.path,
    component: route.component,
  });
};
