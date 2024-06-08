import React, { useEffect, useState, useRef } from "react";
import Grid from "./Grid";
import NavBar from "./NavBar";
import Info from "./Info";
import { countNeighbors, handleBirth, handleDeath } from "../utils/rules";

/**Clonar arreglo */
const arrayClone = (arr) => {
  return arr.map((item) => (Array.isArray(item) ? arrayClone(item) : item));
};

export default function GameOfLife() {
  /** Estados y referencias */
  const [generation, setGeneration] = useState(0);
  const [gridSize, setGridSize] = useState({ rows: 20, cols: 20 });
  const [gridFull, setGridFull] = useState(
    Array(20)
      .fill()
      .map(() => Array(20).fill("off"))
  );
  const [prevGrid, setPrevGrid] = useState([]);
  const [speed, setSpeed] = useState(1000);
  const [selectedType, setSelectedType] = useState("low");
  const [isStepBack, setIsStepBack] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gridRef = useRef(gridFull);

  /**Referencia al mapa mas actual */
  useEffect(() => {
    gridRef.current = gridFull;
  }, [gridFull]);

  /**Captura el tipo de celula seleccionada (Clase baja, media, alta) */
  const handleSelectTypeCell = (event) => {
    const value = event.target.value;
    switch (value) {
      case "1":
        setSelectedType("low");
        break;
      case "2":
        setSelectedType("medium");
        break;
      case "3":
        setSelectedType("high");
        break;
      case "4":
        setSelectedType("hospital");
        break;
      case "5":
        setSelectedType("industrial");
        break;
      case "6":
        setSelectedType("drug");
        break;
      case "7":
        setSelectedType("commercial");
        break;
      case "8":
        setSelectedType("school");
        break;
      case "9":
        setSelectedType("transport");
        break;
      default:
        setSelectedType("off");
        break;
    }
  };

  /**Captura y parsea la velocidad seleccionada */
  const handleSelectSpeed = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    console.log("Setting speed to:", newSpeed);
    setSpeed(newSpeed);
  };

  /**Captura el tamaño del mapa seleccionado  */
  const handleGridSize = (event) => {
    const size = event.target.value;
    const [rows, cols] =
      size === "1" ? [20, 20] : size === "2" ? [50, 40] : [70, 50];
    setGridSize({ rows, cols });
    setGridFull(
      Array(rows)
        .fill()
        .map(() => Array(cols).fill("off"))
    );
  };

  /**Pinta del color (tipo de celula) seleccionado */
  const selectBox = (row, col) => {
    const newGrid = gridFull.map((rowArr, rowIdx) =>
      rowArr.map((item, colIdx) =>
        rowIdx === row && colIdx === col
          ? item === selectedType
            ? "off"
            : selectedType
          : item
      )
    );
    setGridFull(newGrid);
  };

  /**Limpia el mapa */
  const clear = () => {
    setGridFull(
      Array(gridSize.rows)
        .fill()
        .map(() => Array(gridSize.cols).fill("off"))
    );
    setGeneration(0);
    setIsPlaying(false);
  };

  /**Regresa al estado inmediatamente anterior una unica vez */
  const stepBack = () => {
    if (prevGrid.length > 0) {
      setIsStepBack(true);
      setGridFull(prevGrid);
      setGeneration((prev) => prev - 1);
    }
  };

  /**Genera un mapa con reparticiones aleatorias */
  const seed = () => {
    const newGrid = gridFull.map((rowArr) =>
      rowArr.map(() => {
        const rand = Math.random();
        return rand < 0.1
          ? "low"
          : rand < 0.2
          ? "medium"
          : rand < 0.3
          ? "high"
          : "off";
      })
    );
    setGridFull(newGrid);
  };

  /**Función para avanzar un paso en la transición y aplica las reglas */
  const play = () => {
    setPrevGrid(arrayClone(gridRef.current));

    const newGrid = gridFull.map((rowArr, rowIdx) =>
      rowArr.map((cell, colIdx) => {
        const neighbors = countNeighbors(gridFull, gridSize, rowIdx, colIdx);
        const newCell = handleBirth(cell, neighbors);
        return handleDeath(newCell, neighbors);
      })
    );

    setIsStepBack(false);
    setGridFull(newGrid);
    setGeneration((prev) => prev + 1);
  };

  /** Activa los intervalos en base a la velocidad y actividad del juego automatico*/
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        play();
      }, speed);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, speed]);

  /** Activa o desactiva el juego automatico*/
  const playButton = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <NavBar
        playButton={playButton}
        isPlaying={isPlaying}
        isStepBack={isStepBack}
        stepBack={stepBack}
        nextStep={play}
        clear={clear}
        seed={seed}
        speed={handleSelectSpeed}
        gridSize={handleGridSize}
        typeCell={handleSelectTypeCell}
      />
      <Grid
        gridFull={gridFull}
        rows={gridSize.rows}
        cols={gridSize.cols}
        selectBox={selectBox}
      />
      <Info generation={generation} />
    </div>
  );
}
