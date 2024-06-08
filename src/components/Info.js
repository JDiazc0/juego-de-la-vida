import React from "react";
import "../utils/Info.css";
import Grid from "./Grid";

import { info, rule1 } from "../utils/rules.js";

export default function Info(props) {
  const { generation } = props;

  return (
    <section id="section-info">
      <div className="info">
        <h2>Información</h2>
        <ul className="ul-info">
          <li>
            <p>Generación: {generation}</p>
          </li>
          {info.map((type, i) => (
            <li key={i}>
              <p>{type.text}</p>
              <div className={`ex box ${type.class}`} />
            </li>
          ))}
        </ul>
      </div>
      <div className="reglas">
        <h2>Reglas de transición</h2>
        <ul>
          <li>
            <h3>Regla 1: Interacción con vecinas de su misma clase</h3>
            <p>
              Una célula cambiará de estado dependiendo de la proporción de sus
              vecinos que pertenezcan a su misma clase.
            </p>
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
        </ul>
      </div>
    </section>
  );
}
