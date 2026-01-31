import { getRouteApi } from "@tanstack/react-router";
import GamesList from "../components/GamesList.tsx";
import { Paths } from "../routes/paths.ts";

export default function Games() {
  const { games } = getRouteApi(Paths.Games).useLoaderData();

  return (
    <>
      <h2>Games</h2>
      <GamesList games={games} />
    </>
  )
}
