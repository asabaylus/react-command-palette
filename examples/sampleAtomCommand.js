import React from "react";
import "./sampleAtomCommand.css";

export default function sampleAtomCommand(suggestion) {
  const { name, highlight, shortcut } = suggestion;
  return (
    <div className="atom-item">
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
      <kbd className="atom-shortcut">{shortcut}</kbd>
    </div>
  );
}
