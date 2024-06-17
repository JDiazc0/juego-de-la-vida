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

  const rules = () => {
    const url = window.location.origin + "/transition-rules";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <h2 className="nav-h2">Game of Life</h2>
          <ul className="nav-ul">
            <li>
              <button className="btn" onClick={rules}>
                Reglas
              </button>
            </li>
            <li>
              <button className="btn" onClick={playButton}>
                {isPlaying === true ? "Pausar" : "Iniciar"}
              </button>
            </li>
            <li>
              <button
                className={`btn ${isStepBack ? "isStepBack" : ""}`}
                onClick={stepBack}>
                Regresar
              </button>
            </li>
            <li>
              <button
                className={`btn ${isPlaying ? "playing" : ""}`}
                onClick={nextStep}>
                Avanzar
              </button>
            </li>
            <li>
              <button className="btn" onClick={clear}>
                Limpiar
              </button>
            </li>
            <li>
              <button
                className={`btn ${isPlaying ? "playing" : ""}`}
                onClick={seed}>
                Semilla
              </button>
            </li>
            <li>
              <select
                className="select speed"
                onChange={handleSelectSpeed}
                defaultValue="1000">
                <option value="1000">Normal</option>
                <option value="2000">Lento</option>
                <option value="500">Rapido</option>
              </select>
            </li>
            <li>
              <select
                className={`select gridSize ${isPlaying ? "playing" : ""}`}
                onChange={handleSelectGrid}
                defaultValue="1">
                <option value="1">20x20</option>
                <option value="2">40x40</option>
                <option value="3">50x50</option>
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
                <option value="4">Zona Industrial</option>
                <option value="5">Zona Peligrosa</option>
                <option value="6">Zona Comercial</option>
                <option value="7">Zona Escolar</option>
              </select>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
