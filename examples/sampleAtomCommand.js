import React from "react";

export default function sampleAtomCommand(suggestion) {
  const { name, highlight, shortcut } = suggestion;
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
