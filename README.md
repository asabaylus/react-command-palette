
# React Command Palette
WAI-ARIA compliant React command palette like the one in Atom and Sublime

[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/asabaylus/asabaylus%2Freact-command-palette%2Freact_command_palette?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NWMzNjdiYTlhODU5MTAxOWFjOTdkNDEz.qLcoo1kugnvaRfNdM5ujH-bELwuU6KGPe65RB-tdlVk&type=cf-1)]( https://g.codefresh.io/pipelines/react_command_palette/builds?repoOwner=asabaylus&repoName=react-command-palette&serviceName=asabaylus%2Freact-command-palette&filter=trigger:build~Build;branch:master;pipeline:5c3e788ab131c1ebb82e699d~react_command_palette)
[![Codeship Status for asabaylus/react-command-palette](https://app.codeship.com/projects/f7cc0a30-3533-0135-cd98-56b308955afb/status?branch=master)](https://app.codeship.com/projects/227053)
[![codecov](https://codecov.io/gh/asabaylus/react-command-palette/branch/master/graph/badge.svg)](https://codecov.io/gh/asabaylus/react-command-palette)
[![Maintainability](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/maintainability)](https://codeclimate.com/github/asabaylus/react-command-palette/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/test_coverage)](https://codeclimate.com/github/asabaylus/react-command-palette/test_coverage)
![npm](https://img.shields.io/npm/v/react-command-palette.svg)

[![Screenshot](https://www.dropbox.com/s/7dogg4v7vfkzvgs/react-command-palette.gif?raw=1)](https://www.dropbox.com/s/7dogg4v7vfkzvgs/react-command-palette.gif?raw=1)

## Live Playground

For examples of the command palette in action, go to the 

[![Storybook](https://github.com/storybooks/brand/raw/master/badge/badge-storybook.svg?sanitize=true)](https://baylus.com/react-command-palette/)

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

* ```header``` a _string_ or a _React.ComponentType_ which provides a helpful description for the usage of the command palette. The component is displayed at the top of the command palette. The header is not displayed by default. see: examples/sampleInstruction.js for reference

* ```closeOnSelect``` a _boolean_, when set to true the command palette will close immediateley when the user makes a selection. Defaults to "false".

* ```placeholder``` a _string_ that contains a short text description which is displayed inside the the input field until the user provides input. Defaults to "Type a command".

* ```hotKeys``` a _string_ that contains a keyboard shortcut for opening/closing the palette. Defaults to "_command+shift+p_". Uses [mousetrap key combos](https://craig.is/killing/mice)  

* ```options``` options controls how fuzzy search is configured. Note: use at your own risk, this is likley to change in the future. The search options are derived from these [fuzzysort options](https://github.com/farzher/fuzzysort#options). However the command palette options prop must have the following values included to function correctly:

  ```js
    key: "name", // must be "name"
    keys: ["name"], // must include "name"

    // other options may be freely configured
    threshold: -Infinity, 
    limit: 7,
    allowTypo: true, 
    scoreFn: null 
  ```

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

* ```renderCommand``` a _React.func_. By default, react-command-palette will render the suggestion.name_ for each command.  However, if passed a custom react component _renderCommand_ will display the command using any template you can imageine. The _renderCommand_ code signature follows the same coding pattern defined by react-autosuggest's  renderSuggestion property.
  
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

  Note: the _suggestion.hightlight_ will be passed and contains the rendered markup from (fuzzysort)[farzher/fuzzysort#fuzzysorthighlightresult-openb-closeb], see the ```options``` prop.

  See [a full example](examples/sampleAtomCommand.js)

  *Important:* _renderCommand_ must be a pure function (react-autosuggest, upon which this is based will optimize rendering performance based on this assumption).

* ```maxDisplayed``` a _number_ between 1 and 500 that determines the maxium number of commands that will be rendered on screen. Defaults to 7

* ```spinner``` a _string_ or a _React.ComponentType_ that is displayed when the user selects an item. If a custom spinner is not set then the default spinner will be used. If a custom component or string is provided then it will automatically be wrapped inside a div with a _role="status"_ attribute. If a component is provided then it will be be wrapped in a div that also contains a sibling node with a div contain "Loading..." visible only to screen readers.

#### theme (optional)

CommandPalette comes with the Atom theme by default. There are three base components that need to be styled, the _trigger_, _react-modal_ and _react-autosuggest_ components. All three can be styled at once via the `theme` prop.

It uses [react-themeable](https://github.com/markdalgleish/react-themeable) which allows you to style your CommandPalette component using [CSS Modules](https://github.com/css-modules/css-modules), [Radium](https://github.com/FormidableLabs/radium), [Aphrodite](https://github.com/Khan/aphrodite), [JSS](https://github.com/cssinjs/jss), [Inline styles](https://facebook.github.io/react/docs/dom-elements.html#style), and global CSS.

For example, to style the CommandPalette using CSS Modules, do:

```css
/* theme.css */

.modal { ... }
.overlay { ... }
.container { ... }
.input { ... }
.suggestionsContainer { ... }
.suggestion { ... }
.suggestionHighlighted { ... }
...
```

```js
import theme from 'theme.css';
```
```xml
<CommandPalette theme={theme} ... />
```

When not specified, `theme` defaults to:

```js
{
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
  suggestionHighlighted:      "atom-suggestionHighlighted"
}
```

Sample themes are provided, see: [Chrome](examples/sampleChromeTheme.md) and [Atom](examples/sampleAtomTheme.md)

The following picture illustrates how `theme` keys correspond to CommandPalette DOM structure:

![DOM structure](./docs/images/dom-structure.png)

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
$ docker run -it \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 6006:6006 \
  npm i && npm run dev
```
You only need to run "npm i" the when the container is first created. The devDependencies need to be installed to compile and test the build during development. On subsequent builds run:
```
$ docker run -it \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 6006:6006 \
  npm run dev
```

Open your browser to http://localhost:6006/ and you should see the app. Try making a change to the command-palette component within your code editor. You should see the app hot-reload. Kill the server once done.

### Package for production with Docker:
CodeFresh.io will autmatically run this build to prepare the package 
for publication to npm whenever a pull request is merged to master.

## Sponsors
Visual Regression Tests by [ChromaticQA](https://www.chromaticqa.com/)
