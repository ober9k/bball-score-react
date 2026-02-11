import { getRouteApi } from "@tanstack/react-router";
import Content from "../../components/layout/page/Content.tsx";
import Header from "../../components/layout/page/Header.tsx";
import PlayersList from "../../components/PlayersList.tsx";
import { Paths } from "../../routes/paths.ts";

export default function IndexPage() {
  const { players } = getRouteApi(Paths.Players).useLoaderData();

  return (
    <>
      <Header>
        Players
      </Header>
      <Content>
        <PlayersList players={players} />
      </Content>
    </>
  )
}
