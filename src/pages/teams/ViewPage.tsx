import { getRouteApi } from "@tanstack/react-router";
import Content from "../../components/layout/page/Content.tsx";
import Header from "../../components/layout/page/Header.tsx";
import { Paths } from "../../routes/paths.ts";

export default function ViewPage() {
  const { team } = getRouteApi(Paths.Team).useLoaderData();
  return (
    <>
      <Header>
        Team
      </Header>
      <Content>
        <p>
          Team: <strong>{team.name}</strong>
        </p>
      </Content>
    </>
  )
}
