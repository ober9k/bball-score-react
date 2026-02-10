import { QueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes/routes.ts";

/* todo: relocate later */
const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
