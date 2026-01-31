import './App.css'
import GamesList from "./components/GamesList.tsx";
import PlayersList from "./components/PlayersList.tsx";
import TeamsList from "./components/TeamsList.tsx";

function App() {
  return (
    <>
      <h2>Players</h2>
      <PlayersList />
      <h2>Teams</h2>
      <TeamsList />
    </>
  )
}

export default App
