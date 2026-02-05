import { getRouteApi } from "@tanstack/react-router";
import { Paths } from "../routes/paths.ts";

export default function Team() {
  const { team } = getRouteApi(Paths.Team).useLoaderData();

  return (
    <>
      <h2>Team</h2>
      <p>
        Team: <strong>{team.name}</strong><br/>
      </p>
    </>
  )
}
