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
    if (
      neighbors.total <= 5 &&
      neighbors.medium < neighbors.low &&
      neighbors.drug > neighbors.industrial
    )
      return "low";

    // Clase media
    if (
      neighbors.industrial >= 2 &&
      neighbors.industrial <= 3 &&
      neighbors.medium > neighbors.low
    )
      return "medium";
    if (
      neighbors.total <= 5 &&
      neighbors.medium > neighbors.low &&
      neighbors.industrial >= neighbors.drug
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
    if (
      neighbors.total <= 5 &&
      neighbors.medium === 0 &&
      (neighbors.low === 0) & (neighbors.drug === 0)
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
      if (neighbors.low >= 1 || neighbors.drug >= 1) return "off";
      if (
        neighbors.medium > neighbors.high &&
        neighbors.commercial < neighbors.medium
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
