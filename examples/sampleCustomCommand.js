/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import "./sampleCustomCommand.css";

const sampleCustomCommand = function(props) {
  const { name, highlight, category } = props;
  return (
    <div className="item">
      <span className={`category ${category}`}>{category}</span>
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
};

export default sampleCustomCommand;
