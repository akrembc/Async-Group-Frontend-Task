// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MatchList from "./components/MatchList";
import "./styles/_main.scss";

function App() {
  return (
    <main>
      {/* <TournamentList id={1} /> */}
      <Sidebar />
      <div style={{ minWidth: "60vw" }}>
        <MatchList />
      </div>
      <div></div>
    </main>
  );
}

export default App;
