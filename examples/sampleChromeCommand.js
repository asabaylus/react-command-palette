import React from "react";
import "./sampleChromeCommand.css";

export default function sampleChromeCommand(suggestion) {
  const { name, highlight = [], category, shortcut } = suggestion;

  // handle simple highlight when searching a single key
  if (!Array.isArray(highlight)) {
    return (
      <div className="chrome-suggestion">
        <span className={`chrome-category ${category}`}>{category}</span>
        <span dangerouslySetInnerHTML={{ __html: highlight || name }} />
        <kbd className="chrome-shortcut">{shortcut}</kbd>
      </div>
    );
  }

  // handle multiple highlights when searching multiple keys, see:
  // https://github.com/farzher/fuzzysort#advanced-usage
  // Note that we are passing "keys" to the fuzzysort options, ex:
  // <CommandPalette
  //   commands={commands}
  //   options={{keys: ["name", "category"]}}
  //   renderCommand={sampleChromeCommand}
  // />
  return (
    <div className="chrome-suggestion">
      <span
        dangerouslySetInnerHTML={{ __html: highlight[1] || category }}
        className={`chrome-category ${category}`}
      />
      <span dangerouslySetInnerHTML={{ __html: highlight[0] || name }} />
      <kbd className="chrome-shortcut">{shortcut}</kbd>
    </div>
  );
}
