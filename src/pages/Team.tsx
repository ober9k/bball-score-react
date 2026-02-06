import { getRouteApi } from "@tanstack/react-router";
import usePageContext from "../components/hooks/usePageContext.ts";
import { Paths } from "../routes/paths.ts";

export default function Team() {
  const { team } = getRouteApi(Paths.Team).useLoaderData();
  const { setTitle } = usePageContext();
  setTitle("Team");

  return (
    <>
      <h2>Team</h2>
      <p>
        Team: <strong>{team.name}</strong><br/>
      </p>
    </>
  )
}
