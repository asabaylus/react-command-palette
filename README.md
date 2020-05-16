
# React Command Palette
WAI-ARIA compliant React command palette like the one in Atom and Sublime

[![Codeship Status for asabaylus/react-command-palette](https://app.codeship.com/projects/f7cc0a30-3533-0135-cd98-56b308955afb/status?branch=master)](https://app.codeship.com/projects/227053)
[![codecov](https://codecov.io/gh/asabaylus/react-command-palette/branch/master/graph/badge.svg)](https://codecov.io/gh/asabaylus/react-command-palette)
[![Maintainability](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/maintainability)](https://codeclimate.com/github/asabaylus/react-command-palette/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/test_coverage)](https://codeclimate.com/github/asabaylus/react-command-palette/test_coverage)
![npm](https://img.shields.io/npm/v/react-command-palette.svg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=asabaylus/react-command-palette)](https://dependabot.com)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/asabaylus/react-command-palette.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/asabaylus/react-command-palette/context:javascript)

[![Screenshot](https://www.dropbox.com/s/7dogg4v7vfkzvgs/react-command-palette.gif?raw=1)](https://www.dropbox.com/s/7dogg4v7vfkzvgs/react-command-palette.gif?raw=1)

## Live Playground

For examples of the command palette in action, go to the 

[![Storybook](https://github.com/storybooks/brand/raw/master/badge/badge-storybook.svg?sanitize=true)](https://react-command-palette.js.org)

OR

To run that demo on your own computer:
* Clone this repository
* `npm install`
* `npm run storybook`
* Visit http://localhost:6006/

## Usage

Install it in your project

```
$ npm i --save react-command-palette
```

Import into your react app and pass commands

```jsx
import CommandPalette from 'react-command-palette';

const commands = [{
    name: "Foo",
    command() {}
  },{
    name: "Bar",
    command() {}
  }
  ... 
 ];
 
 ReactDOM.render(
  <CommandPalette commands={commands} />, 
  document.getElementById('app'))
```

## Props

* ```open``` a _boolean_, when set to true it forces the command palette to be displayed. Defaults to "false".

* ```alwaysRenderCommands``` a boolean, Set it to true if you'd like to render suggestions even when the input is not focused.

* ```display``` one of "modal" or "inline", when set to "modal" the command palette is rendered centered inside a modal. When set to "inline", it is render inline with other page content. Defaults to "modal".

* ```header``` a _string_ or a _React.ComponentType_ which provides a helpful description for the usage of the command palette. The component is displayed at the top of the command palette. The header is not displayed by default. see: examples/sampleInstruction.js for reference.

* ```closeOnSelect``` a _boolean_, when set to true the command palette will close immediately when the user makes a selection. Defaults to "false".

* ```resetInputOnClose``` a _boolean_ which indicates whether to reset the user's query to `defaultInputValue` when the command palette closes. Defaults to "false".

* ```placeholder``` a _string_ that contains a short text description which is displayed inside the the input field until the user provides input. Defaults to "Type a command".

* ```hotKeys``` a _string_ or _array of strings_ that contain a keyboard shortcut for opening/closing the palette. Defaults to "_command+shift+p_". Uses [mousetrap key combos](https://craig.is/killing/mice)

* ```defaultInputValue``` a _string_ that determines the value of the text in the input field. By default the defaultInputValue is an empty string.

* ```highlightFirstSuggestion```  a _boolean_, will automatically highlight the first suggestion. Defaults to "true". */

* ```options``` options controls how fuzzy search is configured. Note: use at your own risk, this is likely to change in the future. The search options are derived from these [fuzzysort options](https://github.com/farzher/fuzzysort#options). However the command palette options prop must have the following values included to function correctly:

  ```js
    key: "name", // default is "name"
    keys: ["name"], // default is "name"

    // other options may be freely configured
    threshold: -Infinity, 
    limit: 7,
    allowTypo: true, 
    scoreFn: null 
  ```
* ```onChange``` a function that's called when the input value changes. It returns two values: the current value of the input field followed by the users typed input. The query ignores keyboard navigation and clicks.

  ```js
    <CommandPalette
      commands={commands}
      onChange={(inputValue, userQuery) => {
        alert(`The input was changed to:\n
        ${inputValue}\n
        \n
        The user typed:\n
        ${userQuery}
        `);
      }}
    />
  ```

* ```onHighlight``` a function that's called when the highlighted suggestion changes. 

  ```js
    <CommandPalette
      commands={commands}
      onSelect={suggestion => {
        console.log(`A suggested command was highlighted: \n
        ${JSON.stringify(suggestion)}
        `);
      }}
    />
  ```

* ```onSelect``` a function that's called when the selected suggestion changes, given the user selects an item or the user clear the selection. It's called with the item that was selected or null.

  ```js
    <CommandPalette
      commands={commands}
      onSelect={command => {
        alert(`A suggested command was selected: \n
        ${JSON.stringify(command)}
        `);
      }}
    />
  ```

* ```onAfterOpen``` a function that fires after the command palette modal is opened.

  ```js
    <CommandPalette
      commands={commands}
      onAfterOpen={() => {
        alert("The palette was opened.");
      }}
    />
  ```

* ```onRequestClose``` a function that will be run when the modal is requested to be closed (either by clicking on overlay or pressing ESC)
Note: It is not called if _open_ is changed by other means. Passes through to the [react-modal prop](http://reactcommunity.org/react-modal/examples/on_request_close.html).

  ```js
    <CommandPalette
      commands={commands}
      onRequestClose={() => {
        alert("The palette was closed.");
      }}
    />
  ```

* ```shouldReturnFocusAfterClose``` a boolean (default is _true_) indicate if the modal should restore focus to the element that had focus prior to its display. 

* ```commands``` appears in the command palette. For each command in the array the object must have a _name_ and a _command_. The _name_ is a user friendly string that will be display to the user. The command is a function that will be executed when the user clicks or presses the enter key. Commands may also include custom properties where "this" will be bound to the command, for example:

  ```js
    {
      id: 1,
      color: 'pink',
      name: "Foo",
      command() {
        document.location.href = `somepage.html?id=${this.id}&color=${this.color}`;
      }
    },
    ...
  ```

* ```reactModalParentSelector``` a selector compatible with querySelector. By default, the modal portal will be appended to the document's body. You can choose a different parent element by selector. If you do this, please ensure that your app element is set correctly. The app element should not be a parent of the modal, to prevent modal content from being hidden to screenreaders while it is open.

* ```renderCommand``` a _React.func_. By default, react-command-palette will render the suggestion.name_ for each command.  However, if passed a custom react component _renderCommand_ will display the command using any template you can imagine. The _renderCommand_ code signature follows the same coding pattern defined by react-autosuggest's  renderSuggestion property.

  ```jsx
  function RenderCommand(suggestion) {
    // A suggestion object will be passed to your custom component for each command
    const { id, color, name } = suggestion;
    return (
      <div>
        <span>{id}</span>
        <span>{color}</span>
        <span>{name}</span>
      </div>
    );
  }

  const commands = [{
      id: 1,
      color: 'pink',
      name: "Foo",
      command() {
        document.location.href = `somepage.html?id=${this.id}&color=${this.color}`;
      }
    } ...];

  <CommandPalette
    commands={commands}
    renderCommand={RenderCommand}
  />
  ```
  see: https://github.com/moroshko/react-autosuggest#rendersuggestion-required.
 
  Note: the _suggestion.highlight_ will contain the rendered markup from [fuzzysort](farzher/fuzzysort#fuzzysorthighlightresult-openb-closeb), see the ```options``` prop. If the ```options``` prop contains an array of "keys" then then _suggestion.highlight_ will contain an array of matches, see: [fuzzysort advanced usage](https://github.com/farzher/fuzzysort#advanced-usage) or checkout the [sampleChromeCommand.js](examples/sampleChromeCommand.js)

  *Important:* _renderCommand_ must be a pure function (react-autosuggest, upon which this is based will optimize rendering performance based on this assumption).

* ```maxDisplayed``` a _number_ between 1 and 500 that determines the maximum number of commands that will be rendered on screen. Defaults to 7

* ```spinner``` a _string_ or a _React.ComponentType_ that is displayed when the user selects an item. If a custom spinner is not set then the default spinner will be used. If a custom component or string is provided then it will automatically be wrapped inside a div with a _role="status"_ attribute. If a component is provided then it will be be wrapped in a div that also contains a sibling node with a div contain "Loading..." visible only to screen readers.

* ```showSpinnerOnSelect``` a _boolean_ which displays a loading indicator immediately after a command has been selected. When true the spinner is enabled when false the spinner is disabled. Useful when dynamically loading lists of a commands based upon user selections. Setting both _showSpinnerOnSelect_ and  _closeOnSelect_ to false will keep the palette open and allow a new list of commands to be loaded, see the [dynamic lists example](https://codesandbox.io/s/react-command-palette-dynamic-lists-p2xo9?fontsize=14&hidenavigation=1&theme=dark).

* ```theme``` enables you to apply a sample or custom look-n-feel.
  Two themes are included with the command palette, Chrome and Atom. The CommandPalette comes with the Atom theme enabled default.

  Creating a new theme is also possible. There are four base components that should be styled, the _trigger_, _spinner_, _react-modal_ and _react-autosuggest_ components. All four can be styled at once via the `theme` prop.

  There are two steps to styling. First create a theme object to map your custom class names to their associated components. Then add styles that use the rules mapped in the `theme` prop.

  For example, to style the CommandPalette using CSS Modules, do:

  ```css
  /* theme.css */
  .my-modal { ... }
  .my-overlay { ... }
  .my-container { ... }
  .my-header { ... }
  .my-input { ... }
  ...
  ```

  ```jsx
  /* my-component.js */
  const theme = {
    modal:         "my-modal",
    overlay:       "my-overlay",
    container:     "my-container",
    header:        "my-header",
    content:       "my-content",
    input:         "my-input",
    ...
  }

  import theme from 'theme.css';

  <CommandPalette theme={theme} ... />
  ```

  When not specified, `theme` defaults to the included _Atom_ theme. Complete sample themes are provided, see: [Chrome](examples/sampleChromeTheme.md),[Sublime](examples/sampleSublimeTheme.md) and [Atom](examples/sampleAtomTheme.md)

  The following picture illustrates how `theme` keys correspond to CommandPalette DOM structure:

  ![DOM structure](./images/dom-structure.png)

```trigger``` a _string_ or a _React.ComponentType_ the opens the command palette when clicked. If a custom trigger is not set then by default a button will be used. If a custom component or string is provided then it will automatically be wrapped inside an accessible div that will allow it be keyboard accessible, clickable and focusable for assistive technologies.

Example with a component:
```
// jsx trigger prop
<CommandPalette commands={data} trigger={<b>Click Me!</b>}>

// html generated trigger
<div role="button" tabindex="0"><b>Click Me!</b></div>
```

Example with a string:
```
// jsx trigger prop
<CommandPalette commands={data} trigger="Click Me!">

// html generated trigger
<div role="button" tabindex="0">Click Me!</div>
```


When the trigger is clicked it will open the command palette, no custom handlers or events are required.

## Developer Setup
```
# install dependencies
$ npm install

# run lint
$ npm run lint

# beautify code
$ npm run prettier

# visual regression tests
$ npm run chromatic

# run unit tests
$ npm test

# start the dev environment
$ npm start

# update the docs
$ npm run docs
```

## Building with Docker
Build and tag the Docker image:
```
$ docker build -t  react-command-palette .
```

Then, spin up the container once the build is done:
```
$ docker run -it -v ${PWD}:/app -p 6006:6006 react-command-palette npm i && npm run dev
```
You only need to run "npm i" the when the container is first created. The devDependencies need to be installed to compile and test the build during development. On subsequent builds run:
```
$ docker run -it -v ${PWD}:/app -p 6006:6006 react-command-palette npm start
```

Open your browser to http://localhost:6006/ and you should see the app. Try making a change to the command-palette component within your code editor. You should see the app hot-reload. Kill the server once done.

### Package for production with Docker:
CodeFresh.io will automatically run this build to prepare the package
for publication to npm whenever a pull request is merged to master.

## Sponsors
Visual Regression Tests by [ChromaticQA](https://www.chromaticqa.com/)
