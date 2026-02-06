import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import TeamsList from "../components/TeamsList.tsx";
import { Paths } from "../routes/paths.ts";

export default function Teams() {
  const { teams } = getRouteApi(Paths.Teams).useLoaderData();

  return (
    <>
      <Header>
        Teams
      </Header>
      <Content>
        <TeamsList teams={teams} />
      </Content>
    </>
  )
}
