import { getRouteApi } from "@tanstack/react-router";
import usePageContext from "../components/hooks/usePageContext.ts";
import PlayersList from "../components/PlayersList.tsx";
import { Paths } from "../routes/paths.ts";

export default function Players() {
  const { players } = getRouteApi(Paths.Players).useLoaderData();
  const { setTitle } = usePageContext();
  setTitle("Players");

  return (
    <>
      <h2>Players</h2>
      <PlayersList players={players} />
    </>
  )
}
