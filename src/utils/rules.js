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
    if (
      neighbors.industrial >= 1 &&
      neighbors.industrial <= 2 &&
      neighbors.low > neighbors.medium
    )
      return "low";

    // Clase media
    if (
      neighbors.industrial >= 2 &&
      neighbors.industrial <= 3 &&
      neighbors.medium > neighbors.low
    )
      return "medium";

    // Clase alta
    if (
      neighbors.commercial >= 1 &&
      neighbors.high <= 2 &&
      neighbors.high >= 1 &&
      neighbors.drug === 0 &&
      neighbors.low === 0
    )
      return "high";

    // Escuelas
    if (
      neighbors.medium + neighbors.low + neighbors.high >= 3 &&
      neighbors.school > neighbors.industrial
    )
      return "school";

    // Industrial
    if (
      (neighbors.medium >= 1 || neighbors.low >= 1) &&
      neighbors.school < neighbors.industrial
    )
      return "industrial";

    // Comercial
    if (neighbors.high >= 2) return "commercial";
    if (
      neighbors.high >= 2 &&
      neighbors.medium >= 2 &&
      neighbors.commercial > neighbors.industrial
    )
      return "commercial";

    // Peligro
    if (
      neighbors.medium < neighbors.low &&
      neighbors.low >= 3 &&
      neighbors.drug < 2
    )
      return "drug";
  }
  /** Muerte */
  if (cell !== "off") {
    // Clase baja
    if (cell === "low") {
      if (neighbors.low === 0) return "off";
      if (neighbors.low < neighbors.medium + neighbors.industrial)
        return "medium";
    }

    // Clase media
    if (cell === "medium") {
      if (neighbors.medium === 0) return "off";
      if (
        neighbors.medium < neighbors.low &&
        neighbors.industrial < neighbors.low
      )
        return "low";
    }

    // Clase alta
    if (cell === "high") {
      if (neighbors.low || neighbors.drug >= 1) return "off";
      if (
        neighbors.medium > neighbors.high &&
        neighbors.commercial > neighbors.medium
      )
        return "medium";
    }

    // Escuela
    if (cell === "school") {
      if (neighbors.drug >= neighbors.school) return "off";
    }

    // Industrial
    if (cell === "industrial") {
      if (neighbors.low + neighbors.medium < neighbors.industrial) return "off";
    }
    if (cell === "commercial") {
      if (
        neighbors.low >= 3 ||
        neighbors.drug >= 2 ||
        (neighbors.medium <= 1 && neighbors.high <= 2)
      )
        return "off";
    }
    if (cell === "drug") {
      if (neighbors.drug >= 2 || neighbors.low <= neighbors.drug) return "off";
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
