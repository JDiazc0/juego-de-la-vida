import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GameOfLife from "./components/GameOfLife";
import TransitionRules from "./components/TransitionRules";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<GameOfLife />}></Route>
        <Route
          path="/transition-rules"
          exact
          element={<TransitionRules />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
