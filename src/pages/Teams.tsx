import { getRouteApi } from "@tanstack/react-router";
import TeamsList from "../components/TeamsList.tsx";
import { Paths } from "../routes/paths.ts";

export default function Teams() {
  const { teams } = getRouteApi(Paths.Teams).useLoaderData();

  return (
    <>
      <h2>Teams</h2>
      <TeamsList teams={teams} />
    </>
  )
}
