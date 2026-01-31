import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from "./routes/routes.tsx";

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
