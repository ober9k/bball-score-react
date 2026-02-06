import { getRouteApi } from "@tanstack/react-router";
import GamesList from "../components/GamesList.tsx";
import usePageContext from "../components/hooks/usePageContext.ts";
import { Paths } from "../routes/paths.ts";

export default function Games() {
  const { games } = getRouteApi(Paths.Games).useLoaderData();
  const { setTitle } = usePageContext();
  setTitle("Games");

  return (
    <>
      <h2>Games</h2>
      <GamesList games={games} />
    </>
  )
}
