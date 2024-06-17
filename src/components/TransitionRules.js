import React from "react";
import Grid from "./Grid";
import { rule1, rule2, rule3 } from "../utils/infoRules.js";

export default function TransitionRules() {
  return (
    <>
      <div className="reglas">
        <h2>Reglas de transición</h2>
        <ul>
          <li>
            <h3>Regla 1: Nacimientos</h3>
          </li>
          {rule1.map((rule, i) => (
            <li key={i} className="li-rules">
              <p>{rule.description}</p>
              <div className="grid-container">
                <div className="grid-example">
                  <h4>Estado Inicial</h4>
                  <Grid
                    gridFull={rule.gridI}
                    rows={3}
                    cols={3}
                    selectBox={() => {}}
                    ex={true}
                  />
                </div>
                <div className="grid-example">
                  <h4>Estado Final</h4>
                  <Grid
                    gridFull={rule.gridF}
                    rows={3}
                    cols={3}
                    selectBox={() => {}}
                    ex={true}
                  />
                </div>
              </div>
            </li>
          ))}
          <li>
            <h3>Regla 2: Muertes</h3>
          </li>
          {rule2.map((rule, i) => (
            <li key={i} className="li-rules">
              <p>{rule.description}</p>
              <div className="grid-container">
                <div className="grid-example">
                  <h4>Estado Inicial</h4>
                  <Grid
                    gridFull={rule.gridI}
                    rows={3}
                    cols={3}
                    selectBox={() => {}}
                    ex={true}
                  />
                </div>
                <div className="grid-example">
                  <h4>Estado Final</h4>
                  <Grid
                    gridFull={rule.gridF}
                    rows={3}
                    cols={3}
                    selectBox={() => {}}
                    ex={true}
                  />
                </div>
              </div>
            </li>
          ))}
          <li>
            <h3>Regla 3: Mutaciones</h3>
          </li>
          {rule3.map((rule, i) => (
            <li key={i} className="li-rules">
              <p>{rule.description}</p>
              <div className="grid-container">
                <div className="grid-example">
                  <h4>Estado Inicial</h4>
                  <Grid
                    gridFull={rule.gridI}
                    rows={3}
                    cols={3}
                    selectBox={() => {}}
                    ex={true}
                  />
                </div>
                <div className="grid-example">
                  <h4>Estado Final</h4>
                  <Grid
                    gridFull={rule.gridF}
                    rows={3}
                    cols={3}
                    selectBox={() => {}}
                    ex={true}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
