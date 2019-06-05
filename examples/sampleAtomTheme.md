#### Building an Atom inspired Command Palette

The easiest way to do this, is to do nothing because Atom is the default theme. However you may wish to tweak the theme to better meet your projects needs.

The CommandPalette comes with the Atom theme by default. There are four base components that need to be styled, the _trigger_, _spinner_, _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

Try it on [CodeSandbox](https://codesandbox.io/s/hfqjn)

To custom style the CommandPalette you'll need a CSS file with rules that map to your _theme_ props' key/value pairs, ex:

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

The layout for each of the commands that appears in the command list can also be customized. For instance, the _Atom_ command palette has a list of commands that  includes a command and associated keyboard shortcut when applicable. Because the default command is limited to just displaying the command's _name_ you'll need to make your own _renderCommand_ like the component included in [_sampleAtomCommand.js_](../examples/sampleAtomCommand.js). 

The [_sampleAtomCommands.css_](../examples/sampleAtomCommand.css) file must be imported into the _renderCommand_ component. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

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

