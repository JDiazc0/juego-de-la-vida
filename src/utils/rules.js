/**Contar vecinos y tipos */
export const countNeighbors = (grid, gridSize, x, y) => {
  const counts = {
    low: 0,
    medium: 0,
    high: 0,
    hospital: 0,
    industrial: 0,
    drug: 0,
    commercial: 0,
    school: 0,
    transport: 0,
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

/**Nacimientos */
export const handleBirth = (cell, neighbors) => {
  if (cell === "off") {
    /** Casos en interacción entre celulas
     * Nace una célula si tiene 3 vecinos de una misma clase, nacerá perteneciente a esa clase
     * Nace una célula si tiene dos clases vecinas cumpliendo la condición anterior, nacerá en la clase social más baja
     */
    if (neighbors.low === 3 && neighbors.medium === 3) return "low";
    if (neighbors.low === 3 && neighbors.high === 3) return "low";
    if (neighbors.medium === 3 && neighbors.high === 3) return "medium";
    if (neighbors.low === 3) return "low";
    if (neighbors.medium === 3) return "medium";
    if (neighbors.high === 3) return "high";

    /** Casos nacimiento de células con clase social en interacción con recursos
     * Nace célula clase baja si tiene 1 vecino droga, y 2 vecinos clase baja
     * Nace célula clase media si tiene 2 vecinos industrial y dos vecinos clase media
     * Nace célula clase media si tiene 1 vecino industrial, 1 vecino transporte y 1 vecino clase media
     */
    if (neighbors.drug === 1 && neighbors.low === 2) return "low";
    if (neighbors.industrial === 2 && neighbors.medium === 2) return "medium";
    if (
      neighbors.industrial === 1 &&
      neighbors.transport === 1 &&
      neighbors.medium === 1
    )
      return "medium";

    /** Nacimiento de recursos
     * Escuela, nace en caso de estar rodeada por uno o más de cada clase
     * Droga, nace en caso de estar rodeada por 4 o más celulas de clase baja
     * Industrial, una célula se convierte en industrial si esta roeada por 4 o más celulas clase media
     * Comercial, una célula se convierte en comercial si esta rodeada por 4 o más celulas clase alta
     * Transpote, una célula se convierte en transporte si esta rodeada por 1 vecina clase industrial o escuela y 2 o 3 vecinos clase media o baja
     */
    if (neighbors.low >= 1 && neighbors.medium >= 1 && neighbors.high >= 1)
      return "school";
    if (neighbors.low >= 4) return "drug";
    if (neighbors.medium >= 4) return "industrial";
    if (neighbors.high >= 4) return "commercial";
    if (
      (neighbors.industrial === 1 || neighbors.school === 1) &&
      (neighbors.medium >= 2 || neighbors.low >= 2) &&
      (neighbors.medium <= 3 || neighbors.low <= 3)
    )
      return "transport";
  }
  return cell;
};

/** Muertes */
export const handleDeath = (cell, neighbors) => {
  if (cell !== "off") {
    /** Casos entre células con clase social
     *  Muerte por sobrepoblación, muere en caso de tener 4 vecinos o más de su misma clase
     *  Muere en caso de tener más de 4 vecinos y ninguno ser de su misma clase social
     */
    if (
      cell === "low" &&
      (neighbors.low >= 4 || neighbors.medium + neighbors.high > 4)
    )
      return "off";
    if (
      cell === "medium" &&
      (neighbors.medium >= 4 || neighbors.low + neighbors.high > 4)
    )
      return "off";
    if (
      cell === "high" &&
      (neighbors.high >= 2 || neighbors.medium + neighbors.low > 4)
    )
      return "off";

    /** Muerte de recursos
     * Escuela, muere si tiene 2 o menos vecinos con clase social vivos
     * Droga, muere si tiene 1 vecino o más vivos de tipo recurso droga
     * Industrial, muere si tiene 2 o menos vecinos con clase social vivos
     * Comercial, muere si tene 3 o más vecinos de clase baja
     * Transporte, muere si tiene 2 o menos vecinos vivos
     */
    if (
      (cell === "school" || cell === "industrial") &&
      neighbors.low + neighbors.medium + neighbors.high <= 2
    )
      return "off";
    if (cell === "drug" && neighbors.drug >= 1) return "off";
    if (cell === "commercial" && neighbors.low >= 3) return "off";
    if (cell === "transport" && neighbors.total <= 2) return "off";
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
  { text: "Zona hospitalaria", class: "hospital" },
  { text: "Transporte", class: "transport" },
  { text: "Zona peligrosa", class: "drug" },
];

export const rule1 = [
  {
    description:
      "Una célula mantendra su estado si almenos 2 o 3 vecinos son de su misma clase social, de lo contrario morirá",
    gridI: [
      ["off", "low", "off"],
      ["off", "low", "off"],
      ["off", "low", "off"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["low", "low", "low"],
      ["off", "off", "off"],
    ],
  },
  {
    description:
      "Una célula vivirá si por lo menos 3 o más y 4 o menos vecinos son de su misma clase",
    gridI: [
      ["off", "low", "off"],
      ["low", "off", "low"],
      ["off", "low", "off"],
    ],
    gridF: [
      ["off", "low", "off"],
      ["low", "low", "low"],
      ["off", "low", "off"],
    ],
  },
];
