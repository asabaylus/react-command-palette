#### Building an Chrome inspired Command Palette

A Chrome theme is available in the the _themes_ directory. There are three base components that need to be styled, the _trigger_, _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

For a complete example see: [CodeSandbox](https://codesandbox.io/s/gfx7l)

For example, to style the CommandPalette create a CSS _className_ that maps your theme's names with their counterpart's key:

```js
import React from "react";
import CommandPalette from "react-command-palette";

// import the theme from those provided ...
import chrome from "./node_modules/react-command-palette/themes/chrome-theme";

// then import the CSS
import "./node_modules/react-command-palette/themes/chrome.css";
```

It's should be noted that the chrome-theme exists to permit the custom class names such as:

```js
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
```

The layout for each of the commands that appears in the command list can also be customized. For instance the Chrome themed commands should display both a command and an associated keyboard shortcut when applicable. The CSS for this custom command renderer are the inlcuded with the basic CSS theme styles, therefore we'll import style rules for the commands here. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

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

