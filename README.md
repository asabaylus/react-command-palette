
# React Command Palette
WAI-ARIA compliant React command palette like the one in Atom and Sublime

[ ![Codeship Status for asabaylus/react-command-palette](https://app.codeship.com/projects/f7cc0a30-3533-0135-cd98-56b308955afb/status?branch=master)](https://app.codeship.com/projects/227053)
[![codecov](https://codecov.io/gh/asabaylus/react-command-palette/branch/master/graph/badge.svg)](https://codecov.io/gh/asabaylus/react-command-palette)
[![Maintainability](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/maintainability)](https://codeclimate.com/github/asabaylus/react-command-palette/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/test_coverage)](https://codeclimate.com/github/asabaylus/react-command-palette/test_coverage)

[![Screenshot](https://bit.ly/2sfwD1g)](https://bit.ly/2sfwD1g)

# Usage

Install it in your project

Please note, this package isn't ready yet for release on npm.

```
$ npm install --save https://github.com/asabaylus/react-command-palette.git
```

Import into your react app and pass commands

```
import CommandPalette from 'react-command-palette';

const commands = [{
    name: "Foo",
    command() {},
    section: "Command" // optional
  },{
    name: "Bar",
    command() {},
    section: "Command"
  }
  ... 
 ];
 
 ReactDOM.render(
  <CommandPalette commands={commands} />, 
  document.getElementById('app'))
```

# Props

* ```open``` a _boolean_, when set to true it forces the command palette to be displayed. Defaults to "false".

* ```hotKeys``` a _string_ that contains a keyboard shortcut for opening/closing the palette. Defaults to "_cmd+shift+p_". Uses [mousetrap key combos](https://craig.is/killing/mice)  

* ```options``` controls how fuzzy search is configured see [fusejs options](http://fusejs.io/)

* ```commands``` appears in the command palette. For each command in the array the object must have a _name_ and a _command_. The _name_ is a user friendly string that will be display to the user. The command is a function that will be executed when the user clicks or presses the enter key. 

* ```trigger``` a _string_ or a _React.ComponentType_ the opens the command palette when clicked. If a custom trigger is not set then by default a button will be used. If a custom component or string is provided then it will automatically be wrapped inside an accessible div that will allow it be keyboard accessible, clickable and focusable for assistive technologies.

  Example with a component:
  ```
  //jsx 
  <CommandPalette commands={data} trigger={<b>Click Me!</b>}>
  
  // html
  <div role="button" tabindex="0"><b>Click Me!</b></div>
  ```

  Example with a string:
  ```
  //jsx 
  <CommandPalette commands={data} trigger="Click Me!">

  // html
  <div role="button" tabindex="0">Click Me!</div>
  ```
  

  When the trigger is clicked it will open the command palette, no custom handlers or events are required.

# Developer Setup
```
# install dependencies
$ npm install

# run lint
$ npm run lint

# beautify code
$ npm run prettier

# run unit tests
$ npm test

# start the dev environment
$ npm run dev
```
