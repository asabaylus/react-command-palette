import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { storiesOf, addDecorator } from "@storybook/react";
import "../src/styles.css";
import { withInfo } from "@storybook/addon-info";
import { withOptions } from "@storybook/addon-options";
import { withTests } from "@storybook/addon-jest";
import { withKnobs, object, number } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import CommandPalette from "../src/command-palette";
import commands from "../src/__mocks__/commands";
import lotsOfCommands from "../src/__mocks__/lots_of_commands";
import results from "../.jest-test-results.json";

storiesOf("Command Palette", module)
  .addDecorator(
    withOptions({
      name: "Command Palette",
      addonPanelInRight: false
    })
  )
  .addDecorator(withInfo)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        position: "relative",
        minHeight: "764px",
        minWidth: "428px"
      }}
    >
      {story()}
    </div>
  ))
  .addDecorator(withTests({ results }))
  .addParameters({ jest: ["command-palette.test.js"] })
  .addParameters({
    info: {
      disabled: false,
      inline: false,
      header: false
    }
  })
  .add("is toggled open", () => <CommandPalette commands={commands} open />, {
    info: {
      text: `Adding an _open_ prop will force the command palette to be displayed 
      when it mounts. By default command palette will be hidden until the _trigger_
      is cliked.`
    }
  })
  .add("with defaults", () => {
    // Knobs Addon for Commands object
    const commandsInput = object("Commands", commands);
    return <CommandPalette commands={commandsInput} />;
  })
  .add(
    "with a custom trigger",
    () => <CommandPalette commands={commands} trigger="Click Me!" />,
    {
      info: {
        text: `Use the _trigger_ prop to customize the component that the user 
        will click to open the command palette. The property accepts either a
        string or a React component. Note that component will be wrapped with a 
        _div_ that behaves like a button. So there is no need to add any events.
        This component will also be focusable and may be activated via keyboard
        to maintain accessibility. If a trigger is not specified then the a 
        default command palette will be used.
        `
      }
    }
  )
  .add("with custom hotkeys", () => (
    <CommandPalette commands={commands} hotKeys="/" />
  ))
  .add("with closeOnSelect", () => (
    <CommandPalette commands={commands} closeOnSelect open />
  ))
  .add("with a lot of commands", () => {
    // const lotsOfCommands = () => {
    //   // assuming a 2.5 GHz Intel Core i7 running OSX 10.14.3
    //   // adding 159k commands take > 1 sec. This benchmark is reliably
    //   // reproduceable. The goal of this performance test is render
    //   // 159k commands on under 1 second in the CI build pipeline
    //   const arr = new Array(99999);
    //   return arr.fill({
    //     name: "foo",
    //     command: Function.prototype
    //   });
    // };
    // console.dir(lotsOfCommands);
    return <CommandPalette commands={lotsOfCommands} open />;
  })
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
      limit: 7,
      allowTypo: true,
      key: "name",
      keys: ["name"],
      scoreFn: null
    };
    const searchOptionsInput = object("Search Options", opts);
    return <CommandPalette commands={commands} options={searchOptionsInput} />;
  });
