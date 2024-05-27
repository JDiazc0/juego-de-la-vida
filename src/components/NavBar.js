import React from "react";
import "../utils/NavBar.css";

export default function NavBar(props) {
  const {
    playButton,
    pauseButton,
    clear,
    slow,
    fast,
    seed,
    gridSize,
    typeCell,
  } = props;

  const handleSelectGrid = (event) => {
    gridSize(event.target.value);
  };

  const handleSelectTypeCell = (event) => {
    typeCell(event.target.value);
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <h2 className="nav-h2">Game of Life</h2>
          <ul className="nav-ul">
            <li>
              <button className="btn" onClick={playButton}>
                Play
              </button>
            </li>
            <li>
              <button className="btn" onClick={pauseButton}>
                Pause
              </button>
            </li>
            <li>
              <button className="btn" onClick={clear}>
                Clear
              </button>
            </li>
            <li>
              <button className="btn" onClick={slow}>
                Slow
              </button>
            </li>
            <li>
              <button className="btn" onClick={fast}>
                Fast
              </button>
            </li>
            <li>
              <button className="btn" onClick={seed}>
                Seed
              </button>
            </li>
            <li>
              <select className="select gridSize" onChange={handleSelectGrid}>
                <option value={1}>20x10</option>
                <option value={2}>50x30</option>
                <option value={3}>70x50</option>
              </select>
            </li>
            <li>
              <select
                className="select typeCell"
                onChange={handleSelectTypeCell}>
                <option value={1}>Color Clase Baja</option>
                <option value={2}>Color Clase Media</option>
                <option value={3}>Color Clase Alta</option>
              </select>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
