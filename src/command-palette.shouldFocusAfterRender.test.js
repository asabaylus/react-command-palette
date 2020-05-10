/* eslint-disable no-console */
/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0,
  no-new:0 */

import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CommandPalette from "./command-palette";
import mockCommands from "./__mocks__/commands";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// We have to put this in a separate file. Otherwise, the global.document.activeElement
// will be reseted by other test suite to null which we can't easily validate the return focused element.
describe('props.shouldReturnFocusAfterClose', () => {
  beforeEach(() => {
    global.document.body.innerHTML = '';
  });
  afterEach(() => {
    global.document.body.innerHTML = '';
  });

  it("should return to focused element after close if true", async () => {
    const focusedElement = global.document.createElement("button");
    focusedElement.setAttribute("id", "button");
    const body = global.document.querySelector("body");
    body.appendChild(focusedElement);
    focusedElement.focus()
    expect(global.document.activeElement).toBe(global.document.querySelector('#button'))
    const commandPalette = mount(<CommandPalette
      commands={mockCommands}
      shouldReturnFocusAfterClose={true} />);
    commandPalette.instance().handleOpenModal();
    expect(global.document.activeElement).toBe(global.document.querySelector('input'))
    expect(commandPalette.state("showModal")).toEqual(true);
    commandPalette.instance().handleCloseModal();

    expect(global.document.activeElement).toBe(global.document.querySelector('input'))
    await new Promise((r) => setTimeout(r, 50));
    expect(global.document.activeElement).toBe(global.document.querySelector('#button'));
  });

  it("should not return to focused element after close if false", async () => {
    const focusedElement = global.document.createElement("button");
    focusedElement.setAttribute("id", "button");
    const body = global.document.querySelector("body");
    body.appendChild(focusedElement);
    focusedElement.focus()
    expect(global.document.activeElement).toBe(global.document.querySelector('#button'))
    const commandPalette = mount(<CommandPalette
      commands={mockCommands}
      shouldReturnFocusAfterClose={false} />);
    commandPalette.instance().handleOpenModal();
    expect(global.document.activeElement).toBe(global.document.querySelector('input'))
    expect(commandPalette.state("showModal")).toEqual(true);
    commandPalette.instance().handleCloseModal();
    await new Promise((r) => setTimeout(r, 50));
    expect(global.document.activeElement).toBe(global.document.querySelector('body'))
  });
});
