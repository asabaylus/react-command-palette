
# React Command Palette
WAI-ARIA compliant React command palette like the one in Atom and Sublime

[ ![Codeship Status for asabaylus/react-command-palette](https://app.codeship.com/projects/f7cc0a30-3533-0135-cd98-56b308955afb/status?branch=master)](https://app.codeship.com/projects/227053)
[![codecov](https://codecov.io/gh/asabaylus/react-command-palette/branch/master/graph/badge.svg)](https://codecov.io/gh/asabaylus/react-command-palette)
[![Maintainability](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/maintainability)](https://codeclimate.com/github/asabaylus/react-command-palette/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/761754992fe0cd293c40/test_coverage)](https://codeclimate.com/github/asabaylus/react-command-palette/test_coverage)

[![https://uc5114c61cfbfbd1fd29a9152cba.previews.dropboxusercontent.com/p/orig/AAQCDIR_S7JwenCKG0cB2D2pD_FL2rZTs1hdI2ZydQBtsFciZ6foZ8NSFJPNPmpOzJ_UqK3cUCKsh0N6wiA9DI7RatySY3NgcPKWyqrPmIsq5IWgHI_9Wkpp7SQwhVa5Lko5tewdpjfzYJlVWFk5G7IFd0vQx2RFKdjSM6DaruE4CLCqCDoJcOATkI0jweNKkhE_L6-T2NxR0LDlK2_Hzi1puqRy5gH2COfUq0YyvqwxWFAAhTBayX0kfGTjuvf-M7c/p.gif?size=2048x1536&size_mode=3](https://uc5114c61cfbfbd1fd29a9152cba.previews.dropboxusercontent.com/p/orig/AAQCDIR_S7JwenCKG0cB2D2pD_FL2rZTs1hdI2ZydQBtsFciZ6foZ8NSFJPNPmpOzJ_UqK3cUCKsh0N6wiA9DI7RatySY3NgcPKWyqrPmIsq5IWgHI_9Wkpp7SQwhVa5Lko5tewdpjfzYJlVWFk5G7IFd0vQx2RFKdjSM6DaruE4CLCqCDoJcOATkI0jweNKkhE_L6-T2NxR0LDlK2_Hzi1puqRy5gH2COfUq0YyvqwxWFAAhTBayX0kfGTjuvf-M7c/p.gif?size=2048x1536&size_mode=3)](https://uc5114c61cfbfbd1fd29a9152cba.previews.dropboxusercontent.com/p/orig/AAQCDIR_S7JwenCKG0cB2D2pD_FL2rZTs1hdI2ZydQBtsFciZ6foZ8NSFJPNPmpOzJ_UqK3cUCKsh0N6wiA9DI7RatySY3NgcPKWyqrPmIsq5IWgHI_9Wkpp7SQwhVa5Lko5tewdpjfzYJlVWFk5G7IFd0vQx2RFKdjSM6DaruE4CLCqCDoJcOATkI0jweNKkhE_L6-T2NxR0LDlK2_Hzi1puqRy5gH2COfUq0YyvqwxWFAAhTBayX0kfGTjuvf-M7c/p.gif?size=2048x1536&size_mode=3) 

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

* ```open``` a _boolean_, when set to true it forces the command palette to be displayed. Defaults to "false".
* ```hotKeys``` a _string_ that contains a keyboard shortcut for opening/closing the palette. Defaults to "_cmd+shift+p_". Uses [mousetrap key combos](https://craig.is/killing/mice)  
* ```options``` controls how fuzzy search is configured see [fusejs options](http://fusejs.io/)
* ```commands``` appears in the command palette. For each command in the array the object must have a _name_ and a _command_. The _name_ is a user friendly string that will be display to the user. The command is a function that will be executed when the user clicks or presses the enter key. 
* ```trigger``` a _string_ or a React _element_ the opens the command palette when clicked. If a custom trigger is not set then by default a button will be used. If a custom component or string is provided then it will automatically be wrapped inside an accessible div that will allow it be keyboard accessible, clickable and focusable for assistive technologies.

  Example with a component:
  ```<div role="button" tabindex="0"><b>Your Component Here</b></div>```

  Example with a string:
  ```<div role="button" tabindex="0">Your Text Here</div>```

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
