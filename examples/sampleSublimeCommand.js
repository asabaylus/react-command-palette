import React from "react";
import "./sampleSublimeCommand.css";

export default function sampleChromeCommand(suggestion) {
  const { name, highlight, category, shortcut } = suggestion;
  return (
    <div>
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
      <kbd className="sublime-shortcut">{shortcut}</kbd>
    </div>
  );
}
