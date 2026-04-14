import "./app.css";
import { AuthProvider, useAuthContext } from "@/auth.tsx";
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

function InnerApp() {
  const authContext = useAuthContext();

  return (
    <RouterProvider router={router} context={{ authContext }} />
  );
}

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
