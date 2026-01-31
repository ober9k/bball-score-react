import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "../App.tsx";
import RootLayout from "../layouts/DefaultLayout.tsx";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

/**
 * Test route.
 */
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

/**
 * Test route.
 */
const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teams',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Teams!</h3>
      </div>
    )
  },
});

const routeTree = rootRoute.addChildren([homeRoute, teamsRoute]);

export const router = createRouter({ routeTree });


