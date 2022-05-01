#### Building a Sublime inspired Command Palette

A Sublime theme is available in the the _themes_ directory. There are four base components that need to be styled, _trigger_, _spinner_,  _react-modal_ and _react-autosuggest_ components. All four can be styled at once via the `theme` prop.

For a complete example see this [CodeSandbox](https://codesandbox.io/s/dzlcn)

The simplest way to get started is to _import_ the Sublime [theme](../themes/sublime-theme.js) and [CSS](../themes/sublime.css) from the examples directory as follows:

```js
import React from "react";
import { createRoot } from 'react-dom/client';
import CommandPalette from "react-command-palette";

// import the theme from those provided ...
import sublime from "./node_modules/react-command-palette/dist/themes/sublime-theme";

// then import the CSS
import "./node_modules/react-command-palette/dist/themes/sublime.css";
```

Alternatively to custom style the CommandPalette you'll need a CSS file with rules that map to your _theme_ props' key/value pairs, ex:

```js
// map CSS class names to CommandPalette components
const sublime = {
  modal:                      "sublime-modal",
  overlay:                    "sublime-overlay",
  container:                  "sublime-container",
  content:                    "sublime-content",
  containerOpen:              "sublime-containerOpen",
  input:                      "sublime-input",
  inputOpen:                  "sublime-inputOpen",
  inputFocused:               "sublime-inputFocused",
  spinner:                    "sublime-spinner",
  suggestionsContainer:       "sublime-suggestionsContainer",
  suggestionsContainerOpen:   "sublime-suggestionsContainerOpen",
  suggestionsList:            "sublime-suggestionsList",
  suggestion:                 "sublime-suggestion",
  suggestionFirst:            "sublime-suggestionFirst",
  suggestionHighlighted:      "sublime-suggestionHighlighted",
  trigger:                    "sublime-trigger"
}
```

The layout for each of the commands that appears in the command list can also be customized. For instance, _Sublime dev tools_ command palette has a list of commands that  includes a category, command and associated keyboard shortcut when applicable. Because the default command is limited to just displaying the command's _name_ you'll need to make your own _renderCommand_ like the component included in [_sampleSublimeCommand.js_](../examples/sampleSublimeCommand.js). 

The [_sampleSublimeCommands.css_](../examples/sampleSublimeCommand.css) file must be imported into the _renderCommand_ component. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

```jsx
import React from "react";
import "./sampleSublimeCommand.css";

export default function sampleSublimeCommand(suggestion) {
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


const commands = [{
    id: 1,
    shortcut: '⌘ Esc',
    name: "Close pannel",
    command() {
        // do something
    }
} ...];

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <CommandPalette theme={sublime} 
        commands={commands} 
        renderCommand={sampleSublimeCommand} />, 
    document.getElementById('root')
)
```

