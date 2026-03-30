import "./app.css";
import { routeTree } from "@/routes/route-tree.ts";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
});

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
