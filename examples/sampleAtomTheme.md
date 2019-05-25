#### Building an Atom inspired Command Palette

To build the component well need to customise the CSS and add a _custom command_ renderer that include a _keyboard_shortcut_ for some commands.

CommandPalette comes with the Atom theme by default. There are three base components that need to be styled, the _trigger_, _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

It uses [react-themeable](https://github.com/markdalgleish/react-themeable) which allows you to style your CommandPalette component using [CSS Modules](https://github.com/css-modules/css-modules), [Radium](https://github.com/FormidableLabs/radium), [Aphrodite](https://github.com/Khan/aphrodite), [JSS](https://github.com/cssinjs/jss), [Inline styles](https://facebook.github.io/react/docs/dom-elements.html#style), and global CSS.

For example, to style the CommandPalette using CSS Modules, do:

```js
import React from "react";
import CommandPalette from "react-command-palette";
import "./node_modules/react-command-palette/examples/sampleAtomCommand.css";
```

When not specified, `theme` defaults to:

```js
// map CSS class names to CommandPalette components
const atom = {
  modal:                      "atom-modal",
  overlay:                    "atom-overlay",
  container:                  "atom-container",
  highlight:                  "atom-highlight",
  content:                    "atom-content",
  containerOpen:              "atom-containerOpen",
  input:                      "atom-input",
  inputOpen:                  "atom-inputOpen",
  inputFocused:               "atom-inputFocused",
  suggestionsContainer:       "atom-suggestionsContainer",
  suggestionsContainerOpen:   "atom-suggestionsContainerOpen",
  suggestionsList:            "atom-suggestionsList",
  suggestion:                 "atom-suggestion",
  suggestionFirst:            "atom-suggestionFirst",
  suggestionHighlighted:      "atom-suggestionHighlighted",
  sectionContainer:           "atom-sectionContainer",
  sectionContainerFirst:      "atom-sectionContainerFirst",
  sectionTitle:               "atom-sectionTitle"
}

// or...
// import atom from "./node_modules/react-command-palette/src/themes/atom-theme";
```

```js
import React from "react";

function sampleAtomCommand(suggestion) {
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

