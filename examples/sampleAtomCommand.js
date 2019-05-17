/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import "./sampleAtomCommand.css";

export default function sampleAtomCommand(suggestion) {
  const { name, highlight, category, shortcut } = suggestion;
  return (
    <div className="item">
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
      <kbd className="atom-shortcut">{shortcut}</kbd>
    </div>
  );
}
