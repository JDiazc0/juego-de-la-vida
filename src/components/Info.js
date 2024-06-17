import React from "react";
import "../utils/Info.css";

import { info } from "../utils/infoRules.js";

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
    </section>
  );
}
