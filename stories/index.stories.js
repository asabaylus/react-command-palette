/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { storiesOf } from "@storybook/react";

// TODO:
// 1. render modal portals inside each documentation container
// see: reactcommunity.org/react-modal/#custom-parent
// http: // 2. Add position: absolute to #docs-root > .css-1gk97hb

// storybook addons
import {
  withKnobs,
  select,
  object,
  number,
  text,
  boolean
} from "@storybook/addon-knobs";
import { withOptions } from "@storybook/addon-options";
import { withTests } from "@storybook/addon-jest";
import { checkA11y } from "@storybook/addon-a11y";

// sample component
import sampleHeader from "../examples/sampleHeader";
import sampleAtomCommand from "../examples/sampleAtomCommand";
import sampleChromeCommand from "../examples/sampleChromeCommand";
import sampleSublimeCommand from "../examples/sampleSublimeCommand";

// sample styles
import "../.storybook/styles.css";
import "../themes/chrome.css";
import "../themes/atom.css";
import "../themes/sublime.css";
import chrome from "../themes/chrome-theme";
import atom from "../themes/atom-theme";
import sublime from "../themes/sublime-theme";

// command palette scripts
import CommandPalette from "../src/command-palette";
import commands from "../src/__mocks__/commands";
import lotsOfCommands from "../src/__mocks__/lots_of_commands";
import results from "../.jest-test-results.json";

import Frame from "react-frame-component";

// add noop command to this big list of command names
function addCommandToArray(c) {
  return c.map(item => ({
    name: item.name,
    command: Function.prototype
  }));
}

function Trigger() {
  return (
    <button type="button">
      Press &ldquo;<kbd>shft+/</kbd>&rdquo; to run a command
    </button>
  );
}

const styleSheet = (
  <link
    rel="stylesheet"
    type="text/css"
    href="https://raw.githubusercontent.com/asabaylus/react-command-palette/master/themes/atom.css"
  />
);

const proccessedCommands = addCommandToArray(lotsOfCommands);

storiesOf("Command Palette", module)
  .addDecorator(
    withOptions({
      name: "Command Palette",
      addonPanelInRight: false
    })
  )
  .addParameters({ component: CommandPalette })
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .addDecorator(story => <div className="storyContainer">{story()}</div>)
  .addDecorator(withTests({ results }))
  .addParameters({ jest: ["command-palette.test.js"] })
  .add("with everything", () => (
    <div>
      frame
      <Frame head={styleSheet}>
        <CommandPalette
          commands={commands}
          renderCommand={sampleAtomCommand}
          header={sampleHeader()}
          maxDisplayed={6}
          trigger={Trigger()}
          hotKeys="shift+/"
          open
        />
      </Frame>
    </div>
  ))
  .add("with a theme", () => {
    const label = "theme";
    const options = {
      Chrome: chrome,
      Atom: atom,
      Sublime: sublime
    };
    const defaultValue = chrome;
    const theme = select(label, options, defaultValue);
    return <CommandPalette commands={commands} theme={theme} open />;
  })
  .add("atom theme", () => (
    <CommandPalette
      commands={commands}
      renderCommand={sampleAtomCommand}
      theme={atom}
      open
    />
  ))
  .add("chrome theme", () => (
    <CommandPalette
      commands={commands}
      renderCommand={sampleChromeCommand}
      theme={chrome}
      open
    />
  ))
  .add(
    "sublime theme",
    () => (
      <CommandPalette
        commands={commands}
        renderCommand={sampleSublimeCommand}
        theme={sublime}
        placeholder=""
        maxDisplayed={12}
        open
      />
    ),
    {
      backgrounds: [
        {
          name: "dark",
          value: "rgba(39, 40, 34)",
          default: true
        }
      ]
    }
  )
  .add(
    "with a custom command",
    () => (
      <CommandPalette
        commands={commands}
        renderCommand={sampleAtomCommand}
        open
      />
    ),
    {
      notes: `By default, react-command-palette will render the _suggestion.name_ for each command.  However, when passed a custom react component _renderCommand_ will display the command using any template you can imageine. See: https://github.com/asabaylus/react-command-palette/blob/master/examples/sampleAtomCommand.js`
    }
  )
  .add("is toggled open", () => <CommandPalette commands={commands} open />, {
    notes: `Adding an _open_ prop will force the command palette to be displayed 
      when it mounts. By default command palette will be hidden until the _trigger_
      is cliked.`
  })
  .add("with defaults", () => {
    // Knobs Addon for Commands object
    const commandsInput = object("Commands", commands);
    return <CommandPalette commands={commandsInput} />;
  })
  .add("without a modal", () => (
    <CommandPalette commands={commands} display="inline" />
  ))
  .add("onAfterOpen", () => (
    <CommandPalette
      commands={commands}
      onAfterOpen={() => {
        alert("The palette was opened.");
      }}
    />
  ))
  .add("onRequestClose", () => (
    <CommandPalette
      commands={commands}
      onRequestClose={() => {
        alert("The palette will close.");
      }}
    />
  ))
  .add(
    "with a custom trigger",
    () => <CommandPalette commands={commands} trigger="Click Me!" />,
    {
      notes: `Use the _trigger_ prop to customize the component that the user 
        will click to open the command palette. The property accepts either a
        string or a React component. Note that component will be wrapped with a 
        _div_ that behaves like a button. So there is no need to add any events.
        This component will also be focusable and may be activated via keyboard
        to maintain accessibility. If a trigger is not specified then the a 
        default command palette will be used.`
    }
  )
  .add("alwaysRenderCommands false", () => (
    <CommandPalette
      commands={commands}
      open
      alwaysRenderCommands={boolean("alwaysRenderCommands", false)}
    />
  ))
  .add("with custom hotkeys", () => (
    <CommandPalette commands={commands} hotKeys="/" />
  ))
  .add("with custom header", () => (
    <CommandPalette commands={commands} header={sampleHeader()} open />
  ))
  .add("with closeOnSelect", () => (
    <CommandPalette commands={commands} closeOnSelect open />
  ))
  .add("with custom placeholder", () => (
    <CommandPalette
      commands={commands}
      placeholder={text("placeholder", "What do you want?")}
      open
    />
  ))
  .add("with lots of commands", () => (
    <CommandPalette commands={proccessedCommands} open />
  ))
  .add("with a custom spinner", () => (
    <CommandPalette
      commands={commands}
      spinner={
        <div style={{ color: "white", textAlign: "center" }}>Waiting...</div>
      }
      open
    />
  ))
  .add("with max displayed", () => {
    const label = "maxDisplayed";
    const defaultValue = 3;
    const options = {
      range: true,
      min: 1,
      max: commands.length,
      step: 1
    };
    const maxDisplayed = number(label, defaultValue, options);
    return (
      <CommandPalette commands={commands} maxDisplayed={maxDisplayed} open />
    );
  })
  .add("with search options", () => {
    // Knobs for Search Options Object
    const opts = {
      threshold: -Infinity,
      limit: 100,
      allowTypo: true,
      key: "name",
      keys: ["name"],
      scoreFn: null
    };
    const searchOptionsInput = object("Search Options", opts);
    return (
      <CommandPalette
        commands={proccessedCommands}
        options={searchOptionsInput}
        maxDisplayed={100}
        open
      />
    );
  })
  .add("with multiple highlights", () => {
    const opts = {
      keys: ["name", "category"]
    };
    return (
      <CommandPalette
        commands={commands}
        options={opts}
        maxDisplayed={10}
        renderCommand={sampleChromeCommand}
        theme={chrome}
        open
      />
    );
  })
  .add("with reactModalParentSelector", () => (
    <div id="main">
      <CommandPalette
        commands={commands}
        reactModalParentSelector="#main"
        open
      />
    </div>
  ));
