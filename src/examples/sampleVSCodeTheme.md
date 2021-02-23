#### Building a Chrome inspired Command Palette

A VS Code theme is available in the the _themes_ directory. There are four base components that need to be styled, _trigger_, _spinner_,  _react-modal_ and _react-autosuggest_ components. All four can be styled at once via the `theme` prop.

Dynamically loadinging menus is also possible. React-command-palette renders the commands it's provided when they are provided. For a complete example with dynamically swapped lists of commands refer to this [CodeSandbox](https://codesandbox.io/s/???)

The simplest way to get started is to _import_ the VS Code [theme](../themes/vscode-theme.js) and [CSS](../themes/vscode.css) from the examples directory as follows:

```js
import React from "react";
import CommandPalette from "react-command-palette";

// import the theme from those provided ...
import chrome from "./node_modules/react-command-palette/themes/vscode-theme";

// then import the CSS
import "./node_modules/react-command-palette/themes/vscode.css";
```

## Creating commands

The layout for each of the commands that appears in the command list can also be customized. For instance, _Chrome dev tools_ command palette has a list of commands that  includes a category, command and associated keyboard shortcut when applicable. Because the default command is limited to just displaying the command's _name_ you'll need to make your own _renderCommand_ like the component included in [_sampleVSCodeCommand.js_](./sampleVSCodeCommand.js). 

The [_sampleVSCodeCommands.css_](./sampleVSCodeCommand.css) file must be imported into the _renderCommand_ component. Of coure you can use your imagination to create any layout you like for each command. Note that `suggestion.highlight` will contain the raw HTML of the matching value.

## Dynamically swapping out command sets

When a user types an "Action" key such as "?, :, >, #" it triggers an context change in the command palette loading in a new _set_ of commands. These "Action" keys do not require the user to explicity press "enter" on the keyboard or make a selection on the menu of commands. Simply typing the "action" character will trigger the associated action command. We can capture and handle `onChange` events that will pass whatever key the user has typed, see: [`handleChange`](./sampleVSCodeCommandPalette.js#L25-49).


This VSCode theme is based upon the default Dark theme designed by the Microsoft [VS Code](https://github.com/microsoft/vscode) team and is provided under [MIT license](https://github.com/microsoft/vscode/blob/master/LICENSE.txt)