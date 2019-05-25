#### Building an Atom inspired Command Palette

The Atom theme is the default theme. However you may wish to tweak the theme to better meet your projects needs.

CommandPalette comes with the Atom theme by default. There are three base components that need to be styled, the _trigger_, _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

React-command-palette depends on [react-themeable](https://github.com/markdalgleish/react-themeable) for styling your CommandPalette component using [CSS Modules](https://github.com/css-modules/css-modules), [Radium](https://github.com/FormidableLabs/radium), [Aphrodite](https://github.com/Khan/aphrodite), [JSS](https://github.com/cssinjs/jss), [Inline styles](https://facebook.github.io/react/docs/dom-elements.html#style), and global CSS.

Try it on [CodeSandbox](https://codesandbox.io/embed/reactcommandpalette-t1lyh)

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
  suggestionHighlighted:      "atom-suggestionHighlighted"
}

// or...
import atom from "./node_modules/react-command-palette/src/themes/atom-theme";
```

The layout for the commands that appear in the commands list can also be customized. For instance Atom commands display both a command and an associated keyboard shortcut when applicable. The CSS for this custom command renderer needs CSS styles that are not included with the base theme, therefore we'll import them here. Of coure you can use your imagination to create any layout you like for each command. Note the the `suggestion.highlight` will contain the raw HTML of the matching value.

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

