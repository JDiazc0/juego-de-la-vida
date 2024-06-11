/**Contar vecinos y tipos */
export const countNeighbors = (grid, gridSize, x, y) => {
  const counts = {
    low: 0,
    medium: 0,
    high: 0,
    industrial: 0,
    drug: 0,
    commercial: 0,
    school: 0,
    off: 0,
    total: 0,
  };

  const directions = [
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, 0],
    [1, -1],
    [1, 1],
  ];
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < gridSize.rows && ny >= 0 && ny < gridSize.cols) {
      counts[grid[nx][ny]]++;
      counts.total++;
    }
  }

  return counts;
};

export const trasitionRules = (cell, neighbors) => {
  /** Nacimientos */
  if (cell === "off") {
    // Clase baja
    if (neighbors.low === 3) return "low";
    if (neighbors.drug === 1 && neighbors.low === 2) return "low";

    // Clase media
    if (neighbors.medium === 3) return "medium";
    if (neighbors.industrial === 2 && neighbors.medium === 2) return "medium";

    // Clase alta
    if (neighbors.high === 3) return "high";
    if (neighbors.high >= 2 && neighbors.commercial >= 1) return "high";

    // Escuela
    if (
      neighbors.low >= 1 &&
      neighbors.medium >= 1 &&
      neighbors.high >= 1 &&
      neighbors.school === 0
    )
      return "school";
    if (neighbors.medium >= 1 && neighbors.industrial >= 1) return "school";

    // Zona peligrosa
    if (neighbors.low >= 4) return "drug";

    // Industrial
    if (neighbors.medium >= 4) return "industrial";

    // Zona comercial
    if (neighbors.high >= 2) return "commercial";
  }
  /** Muertes y mutaciones */
  if (cell !== "off") {
    // Clase baja
    if (cell === "low") {
      // Muerte
      if (neighbors.low >= 3 || neighbors.medium + neighbors.high > 4)
        return "off";
      if (neighbors.low >= 2 && neighbors.drug >= 1) return "off";
    }

    // Clase media
    if (cell === "medium") {
      // Muerte
      if (neighbors.medium >= 4 || neighbors.low + neighbors.high > 4)
        return "off";
    }

    // Clase alta
    if (cell === "high") {
      // Muerte
      if (neighbors.high >= 2 || neighbors.medium + neighbors.low > 4)
        return "off";
      if (neighbors.low >= 2) return "off";
    }

    // Escuela
    if (cell === "school") {
      //Muerte
      if (neighbors.low + neighbors.medium + neighbors.high <= 1) return "off";
      if (neighbors.school >= 2) return "off";
    }

    // Droga
    if (cell === "drug") {
      // Muerte
      if (neighbors.drug >= 2) return "off";
      if (neighbors.low >= 2 && neighbors.drug >= 2) return "off";
      if (neighbors.low <= 1) return "off";
    }

    // Industrial
    if (cell === "industrial") {
      //Muerte
      if (neighbors.medium + neighbors.low <= 2) return "off";
    }

    // Comercial
    if (cell === "commercial") {
      if (neighbors.low >= 3) return "off";
      if (neighbors.commercial >= 4) return "off";
      if (neighbors.medium + neighbors.low <= 2) return "off"; //Cuestionable
      if (neighbors.high <= 1) return "off";
    }
  }
  return cell;
};

export const info = [
  { text: `Célula "muerta"`, class: "off" },
  { text: "Clase alta", class: "high" },
  { text: "Clase media", class: "medium" },
  { text: "Clase baja", class: "low" },
  { text: "Zona industrial", class: "industrial" },
  { text: "Zona escolar", class: "school" },
  { text: "Zona comercial", class: "commercial" },
  { text: "Zona peligrosa", class: "drug" },
];

export const rule1 = [
  {
    description:
      "1. Una célula clase baja nacera si tiene 3 vecinos de su misma clase",
    gridI: [
      ["off", "low", "off"],
      ["off", "low", "off"],
      ["off", "low", "off"],
    ],
    gridF: [
      ["off", "low", "off"],
      ["low", "low", "low"],
      ["off", "low", "off"],
    ],
  },
  {
    description: `2. Una célula clase baja nacera si tiene 1 vecino "Zona peligrosa" y 2 vecinos clase baja `,
    gridI: [
      ["off", "low", "off"],
      ["low", "drug", "low"],
      ["off", "low", "off"],
    ],
    gridF: [
      ["low", "off", "low"],
      ["off", "drug", "off"],
      ["low", "off", "low"],
    ],
  },
  {
    description:
      "3. Una célula clase media nacera si tiene 3 vecinos de su misma clase",
    gridI: [
      ["off", "medium", "off"],
      ["off", "medium", "off"],
      ["off", "medium", "off"],
    ],
    gridF: [
      ["off", "medium", "off"],
      ["medium", "medium", "medium"],
      ["off", "medium", "off"],
    ],
  },
  {
    description: `4. Una célula clase media nacera si tiene 2 vecino "Zona industrial" y 2 vecinos clase media `,
    gridI: [
      ["industrial", "medium", "industrial"],
      ["off", "off", "medium"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["off", "medium", "off"],
      ["school", "medium", "medium"],
      ["off", "off", "off"],
    ],
  },
  {
    description:
      "5. Una célula clase alta nacera si tiene 3 vecinos de su misma clase",
    gridI: [
      ["off", "high", "off"],
      ["off", "high", "off"],
      ["off", "high", "off"],
    ],
    gridF: [
      ["off", "high", "off"],
      ["high", "high", "high"],
      ["off", "high", "off"],
    ],
  },
  {
    description: `6. Una célula clase alta nacera si tiene 1 o más vecino "Zona comercial" y 2 o más vecinos clase alta `,
    gridI: [
      ["off", "off", "off"],
      ["high", "commercial", "high"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["off", "high", "off"],
      ["high", "off", "high"],
      ["off", "high", "off"],
    ],
  },
  {
    description: `7. Una célula "Zona escolar" nacera si tiene al menos 1 vecino cada clase social y 0 zonas escolares`,
    gridI: [
      ["off", "high", "off"],
      ["off", "medium", "off"],
      ["off", "low", "off"],
    ],
    gridF: [
      ["off", "high", "off"],
      ["school", "medium", "school"],
      ["off", "low", "off"],
    ],
  },
  {
    description: `8. Una célula "Zona escolar" nacera si tiene 1 o más vecinos clase media y 1 o más vecinos "Zona industrial" `,
    gridI: [
      ["off", "off", "off"],
      ["industrial", "medium", "off"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["school", "school", "off"],
      ["off", "medium", "off"],
      ["school", "school", "off"],
    ],
  },
];
