#### Building a Chrome inspired Command Palette

A Chrome theme is available in the the _themes_ directory. There are four base components that need to be styled, _trigger_, _spinner_,  _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

For a complete example see this [CodeSandbox](https://codesandbox.io/s/gfx7l)

The simplest way to get started is to _import_ the Chrome [theme](../themes/chrome-theme.js) and [CSS](../themes/chrome.css) from the examples directory as follows:

```js
import React from "react";
import CommandPalette from "react-command-palette";

// import the theme from those provided ...
import chrome from "./node_modules/react-command-palette/themes/chrome-theme";

// then import the CSS
import "./node_modules/react-command-palette/themes/chrome.css";
```

Alternatively to custom style the CommandPalette you'll need a CSS file with rules that map to your _theme_ props' key/value pairs, ex:

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
  spinner:                    "chrome-spinner",
  suggestionsContainer:       "chrome-suggestionsContainer",
  suggestionsContainerOpen:   "chrome-suggestionsContainerOpen",
  suggestionsList:            "chrome-suggestionsList",
  suggestion:                 "chrome-suggestion",
  suggestionFirst:            "chrome-suggestionFirst",
  suggestionHighlighted:      "chrome-suggestionHighlighted",
  trigger:                    "chrome-trigger"
}
```

The layout for each of the commands that appears in the command list can also be customized. For instance, _Chrome dev tools_ command palette has a list of commands that  includes a category, command and associated keyboard shortcut when applicable. Because the default command is limited to just displaying the command's _name_ you'll need to make your own _renderCommand_ like the component included in [_sampleChromeCommand.js_](../examples/sampleChromeCommand.js). 

The [_sampleChromeCommands.css_](../examples/sampleChromeCommand.css) file must be imported into the _renderCommand_ component. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

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

