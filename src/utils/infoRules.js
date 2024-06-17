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
    description: `1. Nacerán células clase baja en caso de tener entre sus vecinos a 1 o 2 células “Zona Industrial” y tener más vecinos de su misma clase que “Clase Media”`,
    gridI: [
      ["off", "industrial", "off"],
      ["off", "low", "off"],
      ["off", "low", "off"],
    ],
    gridF: [
      ["low", "industrial", "low"],
      ["low", "low", "low"],
      ["off", "low", "off"],
    ],
  },
  {
    description: `2. Nacerán células clase baja si están ubicados en la periferia del plano y tienen mayor cantidad de vecinos de “Clase baja” y “Zona Peligrosa”`,
    gridI: [
      ["off", "off", "off"],
      ["off", "low", "drug"],
      ["off", "off", "low"],
    ],
    gridF: [
      ["off", "off", "low"],
      ["off", "low", "drug"],
      ["off", "off", "low"],
    ],
  },
  {
    description: `3. Nacerán células clase media en caso de tener entre sus vecinos a 2 o 3 células “Industrial” y tener más vecinos de su misma clase que de “Clase Baja”.`,
    gridI: [
      ["industrial", "industrial", "low"],
      ["off", "off", "medium"],
      ["off", "off", "medium"],
    ],
    gridF: [
      ["off", "industrial", "off"],
      ["off", "medium", "medium"],
      ["off", "off", "medium"],
    ],
  },
  {
    description: `4. Nacerán células clase media si están ubicados en la periferia del plano y tienen mayor cantidad de vecinos “Clase Media” que de “Clase Baja”, y si hay más vecinos de “Industrial” que de “Zona Peligrosa”`,
    gridI: [
      ["off", "medium", "off"],
      ["off", "medium", "off"],
      ["off", "industrial", "industrial"],
    ],
    gridF: [
      ["off", "medium", "medium"],
      ["industrial", "medium", "medium"],
      ["industrial", "industrial", "industrial"],
    ],
  },
  {
    description: `5. Nacerán células clase alta en caso de tener al menos 1 vecino “Comercial”, entre 1 y 2 vecinos de “Clase Alta”, y no tener vecinos de “Zona Peligrosa” ni de “Clase Baja”.`,
    gridI: [
      ["off", "high", "off"],
      ["commercial", "off", "off"],
      ["off", "off", "high"],
    ],
    gridF: [
      ["high", "high", "off"],
      ["off", "high", "commercial"],
      ["off", "high", "high"],
    ],
  },
  {
    description: `6. Nacerán células clase alta en la periferia del plano, si no hay vecinos de “Clase Media” ni de “Clase Baja” ni de “Zona Peligrosa”`,
    gridI: [
      ["off", "off", "off"],
      ["off", "high", "off"],
      ["off", "off", "high"],
    ],
    gridF: [
      ["off", "off", "high"],
      ["off", "high", "high"],
      ["off", "commercial", "high"],
    ],
  },
  {
    description: `7. Nacerán células zona industrial en caso de tener al menos 1 vecino de “Clase Media” o “Clase Baja” y más vecinos de su misma clase que de “Escuela”`,
    gridI: [
      ["off", "off", "off"],
      ["industrial", "off", "medium"],
      ["low", "low", "medium"],
    ],
    gridF: [
      ["off", "industrial", "off"],
      ["industrial", "industrial", "medium"],
      ["low", "medium", "medium"],
    ],
  },
  {
    description: `8. Nacerán células zona peligrosa en caso de tener más vecinos de “Clase Baja” que de “Clase Media” y al menos 3 vecinos de “Clase Baja” y menos de 2 vecinos de “Zona Peligrosa”.`,
    gridI: [
      ["off", "off", "off"],
      ["drug", "off", "off"],
      ["low", "low", "low"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["drug", "drug", "off"],
      ["low", "low", "low"],
    ],
  },
  {
    description: `9. Nacerán células zona escolar en caso de tener al menos 3 vecinos de cualquier clase (“Clase Baja”, “Clase Media”, “Clase Alta”) y más vecinos de su misma clase que de “Industrial”.`,
    gridI: [
      ["low", "school", "high"],
      ["medium", "off", "off"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["off", "off", "high"],
      ["off", "school", "off"],
      ["off", "off", "off"],
    ],
  },
  {
    description: `10.  Nacerán célula zona comercial en caso de tener al menos 2 vecinos de “Clase Alta”.`,
    gridI: [
      ["off", "off", "off"],
      ["off", "high", "off"],
      ["off", "high", "off"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["commercial", "high", "commercial"],
      ["commercial", "high", "commercial"],
    ],
  },
];

export const rule2 = [
  {
    description: `1. Morirá una célula de clase baja en caso de no tener vecinos de su misma clase.`,
    gridI: [
      ["off", "off", "off"],
      ["off", "low", "off"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["off", "off", "off"],
      ["off", "off", "off"],
    ],
  },
  {
    description: `2. Morirá una célula de clase media en caso de no tener vecinos de su misma clase.`,
    gridI: [
      ["off", "off", "off"],
      ["off", "medium", "off"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["off", "off", "off"],
      ["off", "off", "off"],
    ],
  },
  {
    description: `3. Morirá una célula de clase alta en caso de tener vecinos de “Clase Baja” o “Zona Peligrosa”.`,
    gridI: [
      ["low", "low", "off"],
      ["drug", "high", "off"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["low", "low", "off"],
      ["drug", "off", "off"],
      ["off", "off", "off"],
    ],
  },
  {
    description: `4. Morirá una célula en la Zona Industrial en caso de tener menos vecinos de “Clase Media” y “Clase Baja” que de su misma clase.`,
    gridI: [
      ["industrial", "industrial", "industrial"],
      ["off", "industrial", "off"],
      ["off", "medium", "low"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["medium", "off", "industrial"],
      ["industrial", "off", "off"],
    ],
  },
  {
    description: `5. Morirá una célula en la Zona Peligrosa en caso de tener al menos 2 vecinos de “Zona Peligrosa” o menos vecinos de “Clase Baja” que de “Zona Peligrosa”.`,
    gridI: [
      ["off", "off", "off"],
      ["off", "drug", "drug"],
      ["low", "off", "off"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["off", "off", "off"],
      ["off", "off", "off"],
    ],
  },
  {
    description: `6. Morirá una célula en la Zona Escolar en caso de tener vecinos de “Zona Peligrosa” mayor o igual que vecinos de su misma clase.`,
    gridI: [
      ["drug", "off", "off"],
      ["school", "school", "off"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["off", "off", "off"],
      ["off", "off", "off"],
      ["off", "off", "off"],
    ],
  },
  {
    description: `7. Morirá una célula en la Zona Comercial en caso de tener al menos 3 vecinos de “Clase Baja” o al menos 2 vecinos de “Zona Peligrosa”, o si tiene menos de 2 vecinos de “Clase Alta” y menos de 1 vecino de “Clase Media”`,
    gridI: [
      ["low", "off", "low"],
      ["drug", "commercial", "off"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["low", "off", "low"],
      ["drug", "off", "off"],
      ["off", "off", "off"],
    ],
  },
];

export const rule3 = [
  {
    description: `1. Una célula clase baja mutará a “Clase Media” en caso de tener más vecinos de “Clase Media” y “Zona Industrial” que de su misma clase.
`,
    gridI: [
      ["medium", "medium", "medium"],
      ["off", "low", "low"],
      ["off", "off", "off"],
    ],
    gridF: [
      ["medium", "medium", "low"],
      ["off", "medium", "medium"],
      ["off", "off", "off"],
    ],
  },
  {
    description: `2. Una célua clase media mutará a “Clase Baja” en caso de tener más vecinos de “Clase Baja” que “Industrial” y de su misma clase.`,
    gridI: [
      ["off", "medium", "off"],
      ["low", "medium", "off"],
      ["low", "low", "off"],
    ],
    gridF: [
      ["off", "medium", "off"],
      ["low", "low", "off"],
      ["low", "low", "off"],
    ],
  },
  {
    description: `3. Una célula clase alta mutará a “Clase Media” en caso de tener más vecinos de “Clase Media” que “Comercial” y de su misma clase.`,
    gridI: [
      ["off", "high", "off"],
      ["medium", "high", "off"],
      ["medium", "medium", "off"],
    ],
    gridF: [
      ["off", "high", "off"],
      ["medium", "medium", "off"],
      ["medium", "medium", "off"],
    ],
  },
];
