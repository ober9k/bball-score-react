import './App.css'
import PlayerList from "./components/PlayerList.tsx";

function App() {
  return (
    <>
      <h1>bball-score</h1>
      <div>
        <p>
          built using React
        </p>
      </div>
      <h2>Players</h2>
      <PlayerList />
    </>
  )
}

export default App
