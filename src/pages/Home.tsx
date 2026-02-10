import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import { Paths } from "../routes/paths.ts";

export default function Home() {
  const { home } = getRouteApi(Paths.Home).useLoaderData();

  return (
    <>
      <Header>
        Home
      </Header>
      <Content>
        <p>
          Just experimenting with React and messing with some statistics.
        </p>
        <p>
          API result data: {home}
        </p>
      </Content>
    </>
  )
}
