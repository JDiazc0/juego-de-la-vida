import React from "react";
import Grid from "./Grid";
import NavBar from "./NavBar";

const arrayClone = (arr) => {
  return arr.map((item) => (Array.isArray(item) ? arrayClone(item) : item));
};

export default function GameOfLife() {
  return (
    <>
      <NavBar />
    </>
  );
}
