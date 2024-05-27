import React, { Component } from "react";

class Box extends Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

export default function Grid(props) {
  const width = props.cols * 14;

  const getBoxClass = (state) => {
    switch (state) {
      case "low":
        return "box low";
      case "medium":
        return "box medium";
      case "high":
        return "box high";
      default:
        return "box off";
    }
  };

  const rowsArr = props.gridFull.map((rowArr, rowIdx) =>
    rowArr.map((item, colIdx) => {
      return (
        <Box
          boxClass={getBoxClass(props.gridFull[rowIdx][colIdx])}
          key={`${rowIdx}_${colIdx}`}
          id={`${rowIdx}_${colIdx}`}
          row={rowIdx}
          col={colIdx}
          selectBox={props.selectBox}
        />
      );
    })
  );

  return (
    <div className="grid" style={{ width }}>
      {rowsArr}
    </div>
  );
}
