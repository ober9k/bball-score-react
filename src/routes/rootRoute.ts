import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../layouts/DefaultLayout.tsx";

export const rootRoute = createRootRoute({
  component: RootLayout,
});
