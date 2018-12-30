
# React Command Palette
WAI-ARIA compliant React command palette like the one in Atom and Sublime

[ ![Codeship Status for asabaylus/react-command-palette](https://app.codeship.com/projects/f7cc0a30-3533-0135-cd98-56b308955afb/status?branch=master)](https://app.codeship.com/projects/227053)
[![codecov](https://img.shields.io/codecov/c/gh/asabaylus/react-command-palette/master.svg?style=flat-square)](https://codecov.io/gh/asabaylus/react-command-palette)
[![Maintainability](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/maintainability)](https://codeclimate.com/github/asabaylus/react-command-palette/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/test_coverage)](https://codeclimate.com/github/asabaylus/react-command-palette/test_coverage)

[![https://gyazo.com/570b4600147dba4cdf393e4a5b2432a7](https://i.gyazo.com/570b4600147dba4cdf393e4a5b2432a7.gif)](https://gyazo.com/570b4600147dba4cdf393e4a5b2432a7) 

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

props

* ```hotKeys``` a _string_ that contains a keyboard shortcut for opening/closing the palette. Defaults to "_cmd+shift+p_". Uses [mousetrap key combos](https://craig.is/killing/mice)  
* ```options``` controls how fuzzy search is configured see [fusejs options](http://fusejs.io/)
* ```commands``` appears in the command palette. For each command in the array the object must have a _name_ and a _command_. The _name_ is a user friendly string that will be display to the user. The command is a function that will be executed when the user clicks or presses the enter key. 


# Developer Setup
```
# install dependencies
$ yarn install

# run lint
$ yarn lint

# beautify code
$ yarn prettier

# run unit tests
$ yarn test

# start the dev environment
$ yarn dev
```
