import DefaultLayout from "@/layouts/default-layout.tsx";
import AboutPage from "@/pages/about-page.tsx";
import HomePage from "@/pages/home-page.tsx";
import { createRootRoute, createRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: DefaultLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
]);
