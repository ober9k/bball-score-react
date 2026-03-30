import Navigation from "@/components/layout/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";


export default function DefaultLayout() {
  const client = new QueryClient();

  return (
    <>
      <Navigation/>
      <QueryClientProvider client={client}>
        <Outlet/>
      </QueryClientProvider>
    </>
  );
}
