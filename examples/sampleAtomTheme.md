#### Building an Atom inspired Command Palette

Atom is the default theme. However you may wish to tweak the theme to better meet your projects needs.

CommandPalette comes with the Atom theme by default. There are three base components that need to be styled, the _trigger_, _spinner_, _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

Try it on [CodeSandbox](https://codesandbox.io/s/hfqjn)

For example, to style the CommandPalette create a CSS _className_ that maps your theme's names with their counterpart's key:

```js
import React from "react";
import CommandPalette from "react-command-palette";

// map CSS class names to CommandPalette components
// Note that we dont need to do this for the Atom theme because its the default
// When not otherwise specified, the theme defaults to:
// const atom = {
//   modal:                      "atom-modal",
//   overlay:                    "atom-overlay",
//   container:                  "atom-container",
//   content:                    "atom-content",
//   containerOpen:              "atom-containerOpen",
//   input:                      "atom-input",
//   inputOpen:                  "atom-inputOpen",
//   inputFocused:               "atom-inputFocused",
//   spinner:                    "atom-spinner",
//   suggestionsContainer:       "atom-suggestionsContainer",
//   suggestionsContainerOpen:   "atom-suggestionsContainerOpen",
//   suggestionsList:            "atom-suggestionsList",
//   suggestion:                 "atom-suggestion",
//   suggestionFirst:            "atom-suggestionFirst",
//   suggestionHighlighted:      "atom-suggestionHighlighted",
//   trigger:                    "atom-trigger"
// }

// or use a theme from those provided ...
import atom from "./node_modules/react-command-palette/themes/atom-theme";
import "./node_modules/react-command-palette/themes/atom.css";
```

The layout for the commands that appear in the commands list can also be customized. For instance Atom commands display both a command and an associated keyboard shortcut when applicable. The CSS for this custom command renderer are the inlcuded with the basic CSS theme styles, therefore we'll import style rules for the commands here. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

```jsx
import React from "react";
import "./sampleAtomCommand.css";

function sampleAtomCommand(suggestion) {
  const { name, highlight, shortcut } = suggestion;
  return (
    <div className="atom-suggestion">
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
      <kbd className="atom-shortcut">{shortcut}</kbd>
    </div>
  );
}

const commands = [{
    id: 1,
    shortcut: '⌘ Esc',
    name: "Close pannel",
    command() {
        // do something
    }
} ...];

React.render(
    <CommandPalette theme={atom} 
        commands={commands} 
        renderCommand={sampleAtomCommand} />, 
    document.getElementById('root')
)
```

