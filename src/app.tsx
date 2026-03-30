import "./app.css";
import { routeTree } from "@/routes/route-tree.ts";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient()
  },
});

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
