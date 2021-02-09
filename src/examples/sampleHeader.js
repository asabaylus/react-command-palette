/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";

function sampleHeader() {
  const wrapperStyle = {
    fontFamily: "arial",
    fontSize: "12px",
    color: "rgb(172, 172, 172)",
    marginBottom: "6px",
    display: "inline-block"
  };

  const kbdStyle = {
    backgroundColor: "rgb(23, 23, 23)",
    fontSize: "12px",
    color: "#b9b9b9",
    padding: "2px 4px",
    marginRight: "6px",
    borderRadius: "4px"
  };

  const itemStyle = { paddingRight: "32px" };

  return (
    <div style={wrapperStyle}>
      <span style={itemStyle}>Search for a command</span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>↑↓</kbd> to navigate
      </span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>enter</kbd> to select
      </span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>esc</kbd> to dismiss
      </span>
    </div>
  );
}

export default sampleHeader;
