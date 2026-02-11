import { getRouteApi } from "@tanstack/react-router";
import GamesList from "../components/GamesList.tsx";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import { Paths } from "../routes/paths.ts";

export default function GamesPage() {
  const { games } = getRouteApi(Paths.Games).useLoaderData();

  return (
    <>
      <Header>
        Games
      </Header>
      <Content>
        <GamesList games={games} />
      </Content>
    </>
  )
}
