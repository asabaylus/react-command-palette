import React from "react";

export default function sampleChromeCommand(suggestion) {
  const { name, highlight, category, shortcut } = suggestion;
  return (
    <div className="item">
      <span className={`category ${category}`}>{category}</span>
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
      <kbd className="shortcut">{shortcut}</kbd>
    </div>
  );
}
