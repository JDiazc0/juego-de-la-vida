import React, { useEffect, useState, useRef } from "react";
import Grid from "./Grid";
import NavBar from "./NavBar";

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
    setSelectedType(value === "1" ? "low" : value === "2" ? "medium" : "high");
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
    let g = arrayClone(gridRef.current);
    let g2 = arrayClone(gridRef.current);

    for (let i = 0; i < gridSize.rows; i++) {
      for (let j = 0; j < gridSize.cols; j++) {
        let countLow = 0;
        let countMedium = 0;
        let countHigh = 0;

        const neighbors = [
          [i - 1, j],
          [i - 1, j - 1],
          [i - 1, j + 1],
          [i, j + 1],
          [i, j - 1],
          [i + 1, j],
          [i + 1, j - 1],
          [i + 1, j + 1],
        ];

        neighbors.forEach(([x, y]) => {
          if (x >= 0 && x < gridSize.rows && y >= 0 && y < gridSize.cols) {
            if (g[x][y] === "low") countLow++;
            if (g[x][y] === "medium") countMedium++;
            if (g[x][y] === "high") countHigh++;
          }
        });

        const totalAlive = countLow + countMedium + countHigh;

        if (g[i][j] === "off") {
          if (totalAlive === 3) {
            g2[i][j] =
              countHigh > countMedium && countHigh > countLow
                ? "high"
                : countMedium > countLow
                ? "medium"
                : "low";
          }
        } else {
          if (totalAlive < 2 || totalAlive > 3) {
            g2[i][j] = "off";
          }
        }
      }
    }
    setIsStepBack(false);
    setGridFull(g2);
    setGeneration((prev) => {
      const newGeneration = prev + 1;
      return newGeneration;
    });
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
    </div>
  );
}
