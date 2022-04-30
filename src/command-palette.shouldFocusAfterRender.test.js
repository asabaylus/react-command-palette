/* eslint-disable no-console */
/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0,
  no-new:0 */

import React from "react";
import CommandPalette from "./command-palette";
import mockCommands from "./__mocks__/commands";
import { render, screen, waitFor, waitForElementToBeRemoved, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// We have to put this in a separate file. Otherwise, the document.activeElement
// will be reseted by other test suite to null which we can't easily
// validate the return focused element.
describe("props.shouldReturnFocusAfterClose", () => {
  beforeEach(() => {
    global.document.body.innerHTML = "";
  });

  it.skip("should return to focused element after close if true", async () => {
    // Given shouldReturnFocusAfterClose = true then focus should return 
    // to the focused element when the command palette is close. We'll setup
    // two buttons and force focus to move from the the originally focused button
    // to the nextfocused button while the palette is open. Upon closing the palette
    // focus will be returned to the originally focused button
    
    const body = global.document.querySelector("body");
    const originallyFocusedElement = global.document.createElement("button");
    const nextFocusedElement = global.document.createElement("button");
    originallyFocusedElement.setAttribute("data-testid", "originallyFocusedButton");
    body.appendChild(originallyFocusedElement);
    body.appendChild(nextFocusedElement);
    
    originallyFocusedElement.focus();
    expect(originallyFocusedElement).toHaveFocus();
    const commandPalette = render(<CommandPalette commands={mockCommands} shouldReturnFocusAfterClose open />);  
    const input =  screen.getByPlaceholderText("Type a command");
    await waitFor(() => {expect(input).toHaveFocus()});
    
    // Change focus while command palette is open
    nextFocusedElement.focus();
    await waitFor(() => {expect(nextFocusedElement).toHaveFocus()});
    
    // Close the command palette
    userEvent.click(input);
    userEvent.keyboard('{esc}');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })
    await waitForElementToBeRemoved(() => screen.getByLabelText("Command Palette"));

    await waitFor(() => { expect(originallyFocusedElement).toHaveFocus() });
  });

  it.skip("should not return to focused element after close if false", async () => {
    // Given shouldReturnFocusAfterClose = true then focus should return 
    // to the focused element when the command palette is close. We'll setup
    // two buttons and force focus to move from the the originally focused button
    // to the nextfocused button while the palette is open. Upon closing the palette
    // focus will be returned to the originally focused button
    
    const body = global.document.querySelector("body");
    const originallyFocusedElement = global.document.createElement("button");
    const nextFocusedElement = global.document.createElement("button");
    originallyFocusedElement.setAttribute("data-testid", "originallyFocusedButton");
    body.appendChild(originallyFocusedElement);
    body.appendChild(nextFocusedElement);
    
    originallyFocusedElement.focus();
    expect(originallyFocusedElement).toHaveFocus();
    const commandPalette = render(<CommandPalette commands={mockCommands} shouldReturnFocusAfterClose={false} open />);  
    const input =  screen.getByPlaceholderText("Type a command");
    await waitFor(() => {expect(input).toHaveFocus()});
    
    // Change focus while command palette is open
    nextFocusedElement.focus();
    await waitFor(() => {expect(nextFocusedElement).toHaveFocus()});
    
    // Close the command palette
    userEvent.click(input);
    userEvent.keyboard('{esc}');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })
    await waitForElementToBeRemoved(() => screen.getByLabelText("Command Palette"));

    await waitFor(() => { expect(global.document.body).toHaveFocus() });
  });
});
