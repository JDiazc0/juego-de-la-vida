import React from "react";
import "../utils/NavBar.css";

export default function NavBar(props) {
  const {
    playButton,
    isPlaying,
    isStepBack,
    stepBack,
    nextStep,
    clear,
    seed,
    speed,
    gridSize,
    typeCell,
  } = props;

  const handleSelectGrid = (event) => {
    gridSize(event);
  };

  const handleSelectTypeCell = (event) => {
    typeCell(event);
  };

  const handleSelectSpeed = (event) => {
    speed(event);
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <h2 className="nav-h2">Game of Life</h2>
          <ul className="nav-ul">
            <li>
              <button className="btn" onClick={playButton}>
                {isPlaying === true ? "Pause" : "Play"}
              </button>
            </li>
            <li>
              <button
                className={`btn ${isStepBack ? "isStepBack" : ""}`}
                onClick={stepBack}>
                Step Back
              </button>
            </li>
            <li>
              <button
                className={`btn ${isPlaying ? "playing" : ""}`}
                onClick={nextStep}>
                Next Step
              </button>
            </li>
            <li>
              <button className="btn" onClick={clear}>
                Clear
              </button>
            </li>
            <li>
              <button
                className={`btn ${isPlaying ? "playing" : ""}`}
                onClick={seed}>
                Seed
              </button>
            </li>
            <li>
              <select
                className="select speed"
                onChange={handleSelectSpeed}
                defaultValue="1000">
                <option value="1000">Normal</option>
                <option value="2000">Slow</option>
                <option value="500">Fast</option>
              </select>
            </li>
            <li>
              <select
                className={`select gridSize ${isPlaying ? "playing" : ""}`}
                onChange={handleSelectGrid}
                defaultValue="1">
                <option value="1">20x20</option>
                <option value="2">50x40</option>
                <option value="3">70x50</option>
              </select>
            </li>
            <li>
              <select
                className="select typeCell"
                onChange={handleSelectTypeCell}
                defaultValue="1">
                <option value="1">Color Clase Baja</option>
                <option value="2">Color Clase Media</option>
                <option value="3">Color Clase Alta</option>
                <option value="4">Hospital</option>
                <option value="5">Industrial</option>
                <option value="6">Punto de Droga</option>
                <option value="7">Comercial</option>
                <option value="8">Escolar</option>
                <option value="9">Transporte</option>
              </select>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
