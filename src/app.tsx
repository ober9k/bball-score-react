import "./app.css";
import { routeTree } from "@/routes/route-tree.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import axios from "axios";

/* pass with all requests */
axios.defaults.withCredentials = true;

const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient()
  },
});

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
