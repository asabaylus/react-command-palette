#### Building an Chrome inspired Command Palette

A Chrome theme is available in the the _themes_ directory. There are three base components that need to be styled, the _trigger_, _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

React-command-palette depends on [react-themeable](https://github.com/markdalgleish/react-themeable) for styling your CommandPalette component using [CSS Modules](https://github.com/css-modules/css-modules), [Radium](https://github.com/FormidableLabs/radium), [Aphrodite](https://github.com/Khan/aphrodite), [JSS](https://github.com/cssinjs/jss), [Inline styles](https://facebook.github.io/react/docs/dom-elements.html#style), and global CSS.

Try it on [CodeSandbox](https://codesandbox.io/s/hfqjn)

For example, to style the CommandPalette using CSS Modules, do:

```js
import React from "react";
import CommandPalette from "react-command-palette";

// map CSS class names to CommandPalette components
const chrome = {
  modal:                      "chrome-modal",
  overlay:                    "chrome-overlay",
  container:                  "chrome-container",
  content:                    "chrome-content",
  containerOpen:              "chrome-containerOpen",
  input:                      "chrome-input",
  inputOpen:                  "chrome-inputOpen",
  inputFocused:               "chrome-inputFocused",
  suggestionsContainer:       "chrome-suggestionsContainer",
  suggestionsContainerOpen:   "chrome-suggestionsContainerOpen",
  suggestionsList:            "chrome-suggestionsList",
  suggestion:                 "chrome-suggestion",
  suggestionFirst:            "chrome-suggestionFirst",
  suggestionHighlighted:      "chrome-suggestionHighlighted"
}

// or use a theme from those provided ...
// import chrome from "./node_modules/react-command-palette/themes/chrome-theme";
import "./node_modules/react-command-palette/themes/chrome.css";
```

The layout for the commands that appear in the commands list can also be customized. For instance Chrome commands display both a command and an associated keyboard shortcut when applicable. The CSS for this custom command renderer are the inlcuded with the basic CSS theme styles, therefore we'll import style rules for the commands here. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

```jsx
import React from "react";
import "./sampleChromeCommand.css";

export default function sampleChromeCommand(suggestion) {
  const { name, highlight, category, shortcut } = suggestion;
  return (
    <div className="chrome-suggestion">
      <span className={`chrome-category ${category}`}>{category}</span>
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
      <kbd className="chrome-shortcut">{shortcut}</kbd>
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
    <CommandPalette theme={chrome} 
        commands={commands} 
        renderCommand={sampleChromeCommand} />, 
    document.getElementById('root')
)
```

