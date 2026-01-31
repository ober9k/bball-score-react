import { getRouteApi } from "@tanstack/react-router";
import PlayersList from "../components/PlayersList.tsx";
import { Paths } from "../routes/paths.ts";

export default function Players() {
  const { players } = getRouteApi(Paths.Players).useLoaderData();

  return (
    <>
      <h2>Players</h2>
      <PlayersList players={players} />
    </>
  )
}
