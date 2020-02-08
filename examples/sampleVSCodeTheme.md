#### Building a Chrome inspired Command Palette

A VS Code theme is available in the the _themes_ directory. There are four base components that need to be styled, _trigger_, _spinner_,  _react-modal_ and _react-autosuggest_ components. All four can be styled at once via the `theme` prop.

Dynamically loadinging menus is also possible. However the react-command-palette has not built in logic for this use case. The react-command-palette simply renders the commands it's provided when they are provided. For a complete example with dynamically swapped lists of commands refer to this [CodeSandbox](https://codesandbox.io/s/???)

The simplest way to get started is to _import_ the VS Code [theme](../themes/vscode-theme.js) and [CSS](../themes/vscode.css) from the examples directory as follows:

```js
import React from "react";
import CommandPalette from "react-command-palette";

// import the theme from those provided ...
import chrome from "./node_modules/react-command-palette/themes/vscode-theme";

// then import the CSS
import "./node_modules/react-command-palette/themes/vscode.css";
```

Alternatively to custom style the CommandPalette you'll need a CSS file with rules that map to your _theme_ props' key/value pairs, ex:

```js
// map CSS class names to CommandPalette components
const chrome = {
  modal:                      "vscode-modal",
  overlay:                    "vscode-overlay",
  container:                  "vscode-container",
  content:                    "vscode-content",
  containerOpen:              "vscode-containerOpen",
  input:                      "vscode-input",
  inputOpen:                  "vscode-inputOpen",
  inputFocused:               "vscode-inputFocused",
  spinner:                    "vscode-spinner",
  suggestionsContainer:       "vscode-suggestionsContainer",
  suggestionsContainerOpen:   "vscode-suggestionsContainerOpen",
  suggestionsList:            "vscode-suggestionsList",
  suggestion:                 "vscode-suggestion",
  suggestionFirst:            "vscode-suggestionFirst",
  suggestionHighlighted:      "vscode-suggestionHighlighted",
  trigger:                    "vscode-trigger"
}
```

The layout for each of the commands that appears in the command list can also be customized. For instance, _Chrome dev tools_ command palette has a list of commands that  includes a category, command and associated keyboard shortcut when applicable. Because the default command is limited to just displaying the command's _name_ you'll need to make your own _renderCommand_ like the component included in [_sampleVSCodeCommand.js_](../examples/sampleCVSCodeCommand.js). 

The [_sampleVSCodeCommands.css_](../examples/sampleCVSCodeCommand.css) file must be imported into the _renderCommand_ component. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

```jsx
import React from "react";
import "./sampleCVSCodeCommand.css";

export default function sampleCVSCodeCommand(suggestion) {
  const { name, highlight, category, shortcut } = suggestion;
  return (
    <div className="vscode-suggestion">
      <span className={`vscode-category ${category}`}>{category}</span>
      {highlight ? (
        <span dangerouslySetInnerHTML={{ __html: highlight }} />
      ) : (
        <span>{name}</span>
      )}
      <kbd className="vscode-shortcut">{shortcut}</kbd>
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
        renderCommand={sampleCVSCodeCommand} />, 
    document.getElementById('root')
)
```

This VSCode theme is based upon the excellent work of [jesseweed](https://github.com/jesseweed) and is provided under [MIT license](https://github.com/jesseweed/seti-ui/blob/master/LICENSE.md)