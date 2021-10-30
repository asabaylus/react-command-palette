/* eslint-disable no-console */
/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0,
  no-new:0 */

import React from "react";
import { mount } from "enzyme";
import CommandPalette from "./command-palette";
import mockCommands from "./__mocks__/commands";


// We have to put this in a separate file. Otherwise, the document.activeElement
// will be reseted by other test suite to null which we can't easily
// validate the return focused element.
describe("props.shouldReturnFocusAfterClose", () => {
  beforeEach(() => {
    global.document.body.innerHTML = "";
  });
  afterEach(() => {
    global.document.body.innerHTML = "";
  });

  it.skip("should return to focused element after close if true", async () => {
    const focusedElement = global.document.createElement("button");
    focusedElement.setAttribute("id", "button");
    const focusedElement2 = global.document.createElement("button");
    const body = global.document.querySelector("body");
    body.appendChild(focusedElement);
    body.appendChild(focusedElement2);
    focusedElement.focus();
    expect(global.document.activeElement).toBe(
      global.document.querySelector("#button")
    );
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} shouldReturnFocusAfterClose open />
    );
    expect(global.document.activeElement).toBe(
      global.document.querySelector("input")
    );
    expect(commandPalette.state("showModal")).toEqual(true);
    expect(global.document.activeElement).toBe(
      global.document.querySelector("input")
    );
    // Change focus during command palette open
    focusedElement2.focus();
    expect(global.document.activeElement).toBe(focusedElement2);
    commandPalette.instance().handleCloseModal();
    await new Promise((r) => setTimeout(r, 50));
    expect(global.document.activeElement).toBe(
      global.document.querySelector("#button")
    );
  });

  it.skip("should not return to focused element after close if false", async () => {
    const focusedElement = global.document.createElement("button");
    focusedElement.setAttribute("id", "button");
    const body = global.document.querySelector("body");
    body.appendChild(focusedElement);
    focusedElement.focus();
    expect(global.document.activeElement).toBe(
      global.document.querySelector("#button")
    );
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        shouldReturnFocusAfterClose={false}
      />
    );
    commandPalette.instance().handleOpenModal();
    expect(global.document.activeElement).toBe(
      global.document.querySelector("input")
    );
    expect(commandPalette.state("showModal")).toEqual(true);
    commandPalette.instance().handleCloseModal();
    await new Promise((r) => setTimeout(r, 50));
    expect(global.document.activeElement).toBe(
      global.document.querySelector("body")
    );
  });
});
