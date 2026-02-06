import { getRouteApi } from "@tanstack/react-router";
import usePageContext from "../components/hooks/usePageContext.ts";
import TeamsList from "../components/TeamsList.tsx";
import { Paths } from "../routes/paths.ts";

export default function Teams() {
  const { teams } = getRouteApi(Paths.Teams).useLoaderData();
  const { setTitle } = usePageContext();
  setTitle("Teams");

  return (
    <>
      <h2>Teams</h2>
      <TeamsList teams={teams} />
    </>
  )
}
