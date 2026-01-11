/* eslint-disable no-console */
/*  global dom:true */
/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0,
  no-new:0 */
import React from "react";
import Mousetrap from "mousetrap";
import fuzzysortOptions from "./fuzzysort-options";
import CommandPalette from "./command-palette";
import mockCommands from "./__mocks__/commands";
import sampleHeader from "./examples/sampleHeader";
import sampleAtomCommand from "./examples/sampleAtomCommand";
import sampleChromeCommand from "./examples/sampleChromeCommand";
import chromeTheme from "./themes/chrome-theme";
import { clickDown, clickUp, clickEnter } from "./test-helpers";
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe("Umounting the palette", () => {
  it("should not leave elements in the DOM",  () => {
    const { unmount } = render(<CommandPalette commands={mockCommands} open />);
    const input = screen.getByPlaceholderText('Type a command');
    expect(input).toBeInTheDocument();
    unmount();
    expect(input).not.toBeInTheDocument();
  })
});

describe("Loading indicator", () => {
  it("should display the spinner by default", async () => {
    const { container } = render(<CommandPalette commands={mockCommands} open />);
    // Trigger suggestions by typing something that matches
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Start" } });

    // Wait for the suggestion text to appear
    const firstItem = await screen.findByText("Start All Data Imports");
    fireEvent.click(firstItem);
    const spinner = container.querySelector(".default-spinner");
    // the palette should remain visible (modal is still in the document)
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
    // the animated loading spinner should be displayed
    expect(spinner).toBeDefined();
    expect(spinner).toMatchSnapshot();
  });

  it("should display a custom react component when props.spinner is set", async () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} spinner={<b>Waiting</b>} open />
    );
    // Trigger suggestions
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Start" } });

    // Wait for the suggestion text to appear
    const firstItem = await screen.findByText("Start All Data Imports");
    fireEvent.click(firstItem);
    const spinner = container.querySelector(".spinner");
    // the palette should remain visible
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
    // a custom loading spinner should be displayed
    expect(within(spinner).getByText('Waiting')).toBeInTheDocument();
    expect(spinner).toMatchSnapshot();
  });

  it("should display a custom string when props.spinner is set", async () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} spinner="Waiting" open />
    );
    // Trigger suggestions
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Start" } });

    // Wait for the suggestion text to appear
    const firstItem = await screen.findByText("Start All Data Imports");
    fireEvent.click(firstItem);
    const spinner = container.querySelector(".spinner");
    // the palette should remain visible
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
    // a custom loading spinner should be displayed
    expect(spinner.textContent).toEqual("Waiting");
    expect(spinner).toMatchSnapshot();
  });

  it("should hide the spinner when props.showSpinnerOnSelect is false", async () => {
    const { container } = render(
      <CommandPalette
        commands={mockCommands}
        showSpinnerOnSelect={false}
        open
      />
    );
    // Trigger suggestions
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Start" } });

    // Wait for the suggestion text to appear
    const firstItem = await screen.findByText("Start All Data Imports");
    fireEvent.click(firstItem);
    const spinner = container.querySelector(".default-spinner");
    expect(spinner).toBeNull();
  });

  it("should show the spinner when props.showSpinnerOnSelect is true", async () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} showSpinnerOnSelect open />
    );
    // Trigger suggestions
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Start" } });

    // Wait for the suggestion text to appear
    const firstItem = await screen.findByText("Start All Data Imports");
    fireEvent.click(firstItem);
    const spinner = container.querySelector(".default-spinner");
    expect(spinner).toBeInTheDocument();
  });
});

describe("props.open is set to false", () => {
  it("closes the modal", () => {
    const { rerender } = render(
      <CommandPalette commands={mockCommands} open />
    );
    // Modal should be open initially
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();

    // Rerender with open=false
    rerender(<CommandPalette commands={mockCommands} open={false} />);

    // Modal should be closed (input not visible)
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
  });

  it("opens the modal", () => {
    const { rerender } = render(
      <CommandPalette commands={mockCommands} open={false} />
    );
    // Modal should be closed initially
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();

    // Rerender with open=true
    rerender(<CommandPalette commands={mockCommands} open />);

    // Modal should be open
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
  });
});

describe("Search", () => {
  it("has configureable fusejs options", () => {
    const { container } = render(
      <CommandPalette options={fuzzysortOptions} commands={mockCommands} open />
    );

    // Test behavior by typing and checking results
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Imports" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(2);
  });
});

describe("props.header", () => {
  it("should not display by default", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} open />
    );
    const header = container.querySelector(".atom-header");
    expect(header).toBeNull();
  });

  it("should render a custom string", () => {
    const { container } = render(
      <CommandPalette
        commands={mockCommands}
        header="this is a command palette"
        open
      />
    );
    const header = container.querySelector(".atom-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("this is a command palette");
  });

  it("should render the header", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} header={sampleHeader()} open />
    );
    const header = container.querySelector(".atom-header");
    expect(header).toBeInTheDocument();
    expect(header).toMatchSnapshot();
  });
});

describe("props.resetInputOnOpen", () => {
  it("should not reset input by default", () => {
    const { rerender } = render(
      <CommandPalette commands={mockCommands} open />
    );

    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "my query" } });
    expect(input.value).toEqual("my query");

    // Close and reopen
    rerender(<CommandPalette commands={mockCommands} open={false} />);
    rerender(<CommandPalette commands={mockCommands} open />);

    const reopenedInput = screen.getByPlaceholderText('Type a command');
    expect(reopenedInput.value).toEqual("my query");
  });

  it("should reset input to defaultInputValue when resetInputOnOpen is set", () => {
    const { rerender } = render(
      <CommandPalette
        commands={mockCommands}
        defaultInputValue="default"
        open
        resetInputOnOpen
      />
    );

    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "my query" } });
    expect(input.value).toEqual("my query");

    // Close and reopen
    rerender(<CommandPalette commands={mockCommands} defaultInputValue="default" open={false} resetInputOnOpen />);
    rerender(<CommandPalette commands={mockCommands} defaultInputValue="default" open resetInputOnOpen />);

    const reopenedInput = screen.getByPlaceholderText('Type a command');
    expect(reopenedInput.value).toEqual("default");
  });
});

describe("props.renderCommand", () => {
  it("should render a custom command component", () => {
    const { container } = render(
      <CommandPalette
        commands={mockCommands}
        RenderCommand={sampleAtomCommand}
        open
      />
    );
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    expect(container.querySelector(".category")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

describe("props.defaultInputValue", () => {
  it("should display the defaultInputValue prop when the palette is first opened", () => {
    render(
      <CommandPalette commands={mockCommands} defaultInputValue="?" open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    expect(input.value).toEqual("?");
  });

  it(`should not display the defaultInputValue after the user enters a new
  value`, () => {
    render(
      <CommandPalette commands={mockCommands} defaultInputValue="?" open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: ">" } });
    expect(input.value).toEqual(">");
  });
});

describe("props.inputFilter", () => {
  it(`should filter input before sending it to fuzzysearch`, () => {
    const { container, unmount } = render(
      <CommandPalette
      commands={mockCommands}
      filterSearchQuery={ inputValue => {
        return inputValue.replace(/^(>|\?)/g, '');
      }}
      open
    />);
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: ">st" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items.length).toEqual(2);
    expect(items[0].textContent).toBe("Stop All Data Imports");
    expect(items[1].textContent).toBe("Start All Data Imports");
    unmount();
  });

  it(`should send the users input exactly as entered to fuzzysort by default`, () => {
    const { container, unmount } = render(
      <CommandPalette commands={mockCommands} open />);
    // return all commands because the string '>st' dosn't match the mockCommands
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: ">s" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items.length).toEqual(7);
    unmount();
  });
});

describe("props.trigger", () => {
  it("should not render the trigger when null", () => {
    const {container} = render(<CommandPalette commands={mockCommands} trigger={null} open />);
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const commandPalette = container.getElementsByClassName('react-command-palette');
    const firstSuggestion = screen.queryAllByText('Start All Data Imports')[0];
    expect(firstSuggestion).toBeInTheDocument();
    expect(commandPalette.length).toBe(0)
  });
});

describe("props.theme", () => {
  it("should render a custom theme", async () => {
    const { container } = render(
      <CommandPalette
        commands={mockCommands}
        RenderCommand={sampleChromeCommand}
        header="this is a command palette"
        theme={chromeTheme}
        open
      />
    );

    // verify the four primary components have the correct classNames
    const button = container.querySelector("button");
    expect(button).toHaveClass("chrome-trigger");

    const header = container.querySelector(".chrome-header");
    expect(header).toBeInTheDocument();

    const modal = container.querySelector(".chrome-modal");
    expect(modal).toBeInTheDocument();

    const input = container.querySelector("input");
    expect(input).toHaveClass("chrome-input");

    expect(container).toMatchSnapshot();

    // Trigger autosuggest to show items
    fireEvent.change(input, { target: { value: "St" } });
    const firstItem = await screen.findByText(/Stop All Data Imports|Start All Data Imports/);
    fireEvent.click(firstItem);

    const spinner = container.querySelector(".default-spinner");
    expect(spinner).toHaveClass("chrome-spinner");
  });
});

describe("props.placeholder", () => {
  it('should display a "Type a command" by default', () => {
    render(
      <CommandPalette commands={mockCommands} open />
    );
    const input = screen.getByPlaceholderText("Type a command");
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("Type a command");
  });

  it("should render a custom string", () => {
    render(
      <CommandPalette
        commands={mockCommands}
        placeholder="What do you want to do?"
        open
      />
    );
    const input = screen.getByPlaceholderText("What do you want to do?");
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("What do you want to do?");
  });
});

describe("props.display", () => {
  it("should be enabled by default", () => {
    const { container } = render(<CommandPalette commands={mockCommands} />);
    // Modal should be in the DOM but not visible
    expect(container.querySelector('.react-command-palette')).toBeInTheDocument();
  });

  it("should display the command palette in a react-modal component when true", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} display="modal" />
    );
    expect(container.querySelector('.react-command-palette')).toBeInTheDocument();
  });

  it("should not display the command palette in react-modal when false", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} display="inline" />
    );
    // In inline mode, the ReactModal wrapper won't be present
    expect(container).toMatchSnapshot();
  });
});

describe("props.highlightFirstSuggestion", () => {
  it("should be 'true' by default", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} open />
    );
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const firstSuggestion = container.querySelector(".atom-suggestionFirst");
    expect(firstSuggestion).toHaveClass("atom-suggestionHighlighted");
  });

  it("should not highlight the first command when 'false'", () => {
    const { container } = render(
      <CommandPalette
        commands={mockCommands}
        highlightFirstSuggestion={false}
        open
      />
    );
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const firstSuggestion = container.querySelector(".atom-suggestionFirst");
    expect(firstSuggestion).not.toHaveClass("atom-suggestionHighlighted");
  });
});

describe("props.getSuggestionValue", () => {
  it("sets the autosuggest input value to the suggestion name by default", () => {
    const spyGetSuggestionValue = jest.fn();

    render(
      <CommandPalette
        commands={mockCommands}
        getSuggestionValue={ spyGetSuggestionValue.mockReturnValue(">") }
        open
      />
    );
    const input = screen.getByPlaceholderText('Type a command');
    // Trigger autosuggest to show items
    fireEvent.change(input, { target: { value: "St" } });

    // arrow down and check that the input value was correctly set
    clickDown(input, 1);
    expect(spyGetSuggestionValue).toHaveBeenCalled();
    expect(input.value).toBe(">");

    // arrow down and check that the input value was correctly set a second time
    clickDown(input, 1);
    expect(spyGetSuggestionValue).toHaveBeenCalledTimes(2);
    expect(input.value).toBe(">");
    spyGetSuggestionValue.mockClear();
  });
})

describe("props.alwaysRenderCommands", () => {
  it("should be enabled by default", () => {
    const { container } = render(<CommandPalette commands={mockCommands} open />);
    // With alwaysRenderCommands true by default, items should be visible
    const input = screen.getByPlaceholderText('Type a command');
    // Trigger autosuggest first
    fireEvent.change(input, { target: { value: "St" } });
    fireEvent.blur(input);
    const itemsList = container.querySelector('.react-autosuggest__suggestions-list');
    expect(itemsList).toBeInTheDocument();
  });

  it("should render commands when true and input is not focused.", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} alwaysRenderCommands open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    // Trigger autosuggest first
    fireEvent.change(input, { target: { value: "St" } });
    fireEvent.blur(input);
    const itemsList = container.querySelector('.react-autosuggest__suggestions-list');
    expect(itemsList).toBeInTheDocument();
  });

  it("should not render commands when false and input is not focused.", () => {
    const { container } = render(
      <CommandPalette
        commands={mockCommands}
        alwaysRenderCommands={false}
        open
      />
    );
    const input = screen.getByPlaceholderText('Type a command');
    // Trigger autosuggest first
    fireEvent.change(input, { target: { value: "St" } });
    fireEvent.blur(input);
    const itemsList = container.querySelector('.react-autosuggest__suggestions-list');
    expect(itemsList).not.toBeInTheDocument();
  });
});

describe("props.reactModalParentSelector", () => {
  it("should render render reat-modal in the target element.", () => {
    // add a div with #main id to the global body
    const modalRoot = global.document.createElement("div");
    modalRoot.setAttribute("id", "main");
    const body = global.document.querySelector("body");
    body.appendChild(modalRoot);

    const { container } = render(
      <CommandPalette
        commands={mockCommands}
        reactModalParentSelector="#main"
        open
      />
    );
    expect(container).toBeTruthy();
    expect(global.document.querySelector("#main").hasChildNodes()).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

describe("Opening the palette", () => {

  it("auto-focuses the input",  async () => {
    render(<CommandPalette commands={mockCommands} open />);
    const input = await screen.findByPlaceholderText("Type a command");
    await setTimeout(()=> {
      expect(input).not.toHaveFocus();
    }, 0);
  });

  it("fires the onSelect event and returns the selected suggestion", async () => {
    const spyOnSelect = jest.fn();
    const command = jest.fn();
    const { container } = render(
      <CommandPalette commands={mockCommands} onSelect={spyOnSelect} open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const firstItem = await screen.findByText(/Stop All Data Imports|Start All Data Imports/);
    fireEvent.click(firstItem);
    expect(spyOnSelect).toHaveBeenCalled();
    // verify the callback contains the selected item
    expect(spyOnSelect.mock.calls[0][0].name).toMatch(/Start All Data Imports|Stop All Data Imports/);
    spyOnSelect.mockClear();
  });

  it("fires the onAfterOpen event", () => {
    const spy = jest.fn();
    const {getByText} = render(<CommandPalette commands={mockCommands} onAfterOpen={spy}  />);
    const btn = getByText("Command Palette")
    userEvent.click(btn);
    expect(spy).toHaveBeenCalled();
  });

  it("displays the suggestion list", () => {
    const { container } = render(<CommandPalette commands={mockCommands} />);
    const button = screen.getByText("Command Palette");
    fireEvent.click(button);
    expect(container).toMatchSnapshot();
  });

  it("fetches commands for the palette", () => {
    const { container } = render(<CommandPalette commands={mockCommands} open />);
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(mockCommands.length);
  });

  it("should be displayed when open prop is true", () => {
    render(
      <CommandPalette commands={mockCommands} open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    expect(input).toBeInTheDocument();
  });

  it("opens the commandPalette when clicking the trigger button", () => {
    render(<CommandPalette commands={mockCommands} />);
    // Modal should be closed initially
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
    const button = screen.getByText("Command Palette");
    fireEvent.click(button);
    // Modal should be open
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
  });

  it("opens the commandPalette when opened via rerender", () => {
    const { rerender } = render(<CommandPalette commands={mockCommands} />);
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
    rerender(<CommandPalette commands={mockCommands} open />);
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
  });

  it('opens the commandPalette when pressing the "command+shift+p" keys', () => {
    render(<CommandPalette commands={mockCommands} />);
    // verify modal is hidden before we try to open it
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
    Mousetrap.trigger("command+shift+p");
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
  });

  describe("Overriding with custom hotKeys", () => {
    it('opens the commandPalette when pressing the "ctrl+shift+p" keys', () => {
      render(
        <CommandPalette hotKeys="ctrl+shift+p" commands={mockCommands} />
      );
      // verify modal is hidden before we try to open it
      expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
      Mousetrap.trigger("ctrl+shift+p");
      expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
    });

    it(`opens the commandPalette when pressing
    either "ctrl+shift+p" or "ctrl+k" keys`, () => {
      const { unmount } = render(
        <CommandPalette
          hotKeys={["ctrl+shift+p", "ctrl+k"]}
          commands={mockCommands}
        />
      );
      // verify modal is hidden before we try to open it
      expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();

      Mousetrap.trigger("ctrl+shift+p");
      expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();

      // Close the modal by pressing escape
      fireEvent.keyDown(screen.getByPlaceholderText('Type a command'), { key: 'Escape', code: 'Escape' });

      Mousetrap.trigger("ctrl+k");
      expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();

      unmount();
    });
  });
});

describe("Closing the palette", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should close the commandPalette when pressing the "esc" key',  () => {
    render(<CommandPalette commands={mockCommands} open />);
    const input = screen.getByPlaceholderText('Type a command');
    expect(input).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    // After pressing escape, the modal should close
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
  });

  it("should close the wrapper when clicked outside", () => {
    const { container } = render(<CommandPalette commands={mockCommands} open />);
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
    // Click on the overlay/backdrop
    const overlay = container.querySelector('.ReactModal__Overlay');
    if (overlay) {
      fireEvent.click(overlay);
    }
    // Modal should be closed
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
  });
});

describe("props.onChange", () => {
  describe("Typing text into the input field", () => {
    it("should fire onChange", () => {
      const spyOnChange = jest.fn();
      render(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      const input = screen.getByPlaceholderText('Type a command');
      fireEvent.change(input, { target: { value: "f" } });
      expect(spyOnChange).toHaveBeenCalled();
      spyOnChange.mockClear();
    });

    it("should return the value of the input field", () => {
      const spyOnChange = jest.fn();
      const mock = { newValue: "foo" };
      render(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      const input = screen.getByPlaceholderText('Type a command');
      fireEvent.change(input, { target: { value: mock.newValue } });
      expect(spyOnChange).toHaveBeenCalled();
      // verify the spied callback contains returns the input value
      expect(spyOnChange.mock.calls[0][0]).toBe(mock.newValue);
      spyOnChange.mockClear();
    });

    it("should return the query containing user's typed text", () => {
      const mock = { inputValue: "Start", userQuery: "Start" };
      const handleOnClick = function () {};
      const spyOnChange = jest.fn().mockImplementation(handleOnClick);
      render(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      const input = screen.getByPlaceholderText('Type a command');
      fireEvent.change(input, { target: { value: mock.inputValue } });
      expect(spyOnChange).toHaveBeenCalled();
      // verify the spied callback contains returns the input value
      expect(spyOnChange.mock.calls[0][1]).toBe(mock.inputValue);
      expect(spyOnChange.mock.calls[0][0]).toBe(mock.userQuery);
      spyOnChange.mockClear();
    });
  });

  // userQuery (inputValue, userQuery) { ... }
  describe("Navigating suggestions", () => {
    let handleOnClick;
    let spyOnChange;
    let input;

    beforeEach(() => {
      handleOnClick = function () {};
      spyOnChange = jest.fn().mockImplementation(handleOnClick);
      render(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      input = screen.getByPlaceholderText('Type a command');
      fireEvent.change(input, { target: { value: "Start" } });
    });

    afterEach(() => {
      spyOnChange.mockClear();
    });

    it("should return null when the user pressed the down arrow key", () => {
      // simulate user typeing some text
      expect(spyOnChange).toHaveBeenCalled();
      expect(spyOnChange.mock.calls[0][0]).toBe("Start");
      expect(spyOnChange.mock.calls[0][1]).toBe("Start");

      // First suggestion is always highlighted, pressing ArrowDown
      // highlights the second item in the suggestion list
      clickDown(input);
      expect(spyOnChange).toHaveBeenCalledTimes(2);
      expect(spyOnChange.mock.calls[1][0]).toBe("Stop All Data Imports");
      expect(spyOnChange.mock.calls[1][1]).toBe(null);
    });

    it("should return null when the user pressed the up arrow  key", () => {
      // simulate user typeing some text
      expect(spyOnChange).toHaveBeenCalled();
      expect(spyOnChange.mock.calls[0][0]).toBe("Start");
      expect(spyOnChange.mock.calls[0][1]).toBe("Start");

      // First suggestion is always highlighted, pressing ArrowDown
      // highlights the second item in the suggestion list
      clickDown(input);
      expect(spyOnChange).toHaveBeenCalledTimes(2);
      expect(spyOnChange.mock.calls[1][0]).toBe("Stop All Data Imports");
      expect(spyOnChange.mock.calls[1][1]).toBe(null);

      clickUp(input);
      expect(spyOnChange).toHaveBeenCalledTimes(3);
      expect(spyOnChange.mock.calls[2][0]).toBe("Start All Data Imports");
      expect(spyOnChange.mock.calls[2][1]).toBe(null);
    });

    it("should return null when the user pressed the Enter key", () => {
      // simulate user typeing some text
      expect(spyOnChange).toHaveBeenCalled();
      expect(spyOnChange.mock.calls[0][0]).toBe("Start");
      expect(spyOnChange.mock.calls[0][1]).toBe("Start");

      // First suggestion is always highlighted, pressing ArrowDown
      // highlights the second item in the suggestion list
      clickEnter(input);
      expect(spyOnChange).toHaveBeenCalledTimes(2);
      expect(spyOnChange.mock.calls[1][0]).toBe("Start All Data Imports");
      expect(spyOnChange.mock.calls[1][1]).toBe(null);
    });

    it("should return null when the user clicks a suggestion with mouse", () => {
      // simulate user typeing some text
      expect(spyOnChange).toHaveBeenCalled();
      expect(spyOnChange.mock.calls[0][0]).toBe("Start");
      expect(spyOnChange.mock.calls[0][1]).toBe("Start");

      // First suggestion is always highlighted, clicking it
      const firstSuggestion = document.querySelector("#react-autowhatever-1--item-0");
      fireEvent.click(firstSuggestion);
      expect(spyOnChange).toHaveBeenCalledTimes(2);
      expect(spyOnChange.mock.calls[1][0]).toBe("Start All Data Imports");
      expect(spyOnChange.mock.calls[1][1]).toBe(null);
    });
  });
});

describe("Filtering the commands and pressing enter", () => {
  it("should update the value in the input field", () => {
    const spyOnChange = jest.fn();
    render(<CommandPalette commands={mockCommands} onChange={spyOnChange} />);
    expect(spyOnChange.mock.calls).toHaveLength(0);
    const button = screen.getByText("Command Palette");
    fireEvent.click(button);
    expect(screen.getByPlaceholderText('Type a command')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "F" } });
    expect(spyOnChange.mock.calls).toHaveLength(1);
    expect(input.value).toEqual("F");
  });
});

describe("Command List", () => {
  it("returns a list of commands when given a string to match on", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Im" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toEqual("Stop All Data Imports");
    expect(items[1].textContent).toEqual("Start All Data Imports");
  });

  it("initially returns all commands", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} open />
    );
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(mockCommands.length);
  });

  it("returns all commands when there is no string to match", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "bannanas!" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(mockCommands.length);
  });

  it("renders a command", () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} open />
    );
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Logs" } });
    expect(container).toMatchSnapshot();
  });

  describe("number of commands displayed", () => {
    it("should not be greater than 500", () => {
      const originalError = console.error;
      console.error = jest.fn();
      const tooManyCommands = () => {
        const arr = new Array(501);
        return arr.fill({
          name: "foo",
          command: Function.prototype,
        });
      };

      let error;
      console.error = jest.fn();
      try {
        render(
          <CommandPalette commands={tooManyCommands()} maxDisplayed={501} />
        );
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Display is limited to a maximum of 500 items to prevent performance issues"
      );
      console.error = originalError;
    });

    it("should display the configured number of commands", () => {
      const maxDisplayed = 3;
      const commands = () => {
        const arr = new Array(500);
        return arr.fill({
          name: "foo",
          command: Function.prototype,
        });
      };
      const { container } = render(
        <CommandPalette commands={commands()} maxDisplayed={maxDisplayed} open />
      );
      // Trigger autosuggest to show items
      const input = screen.getByPlaceholderText('Type a command');
      fireEvent.change(input, { target: { value: "St" } });
      const commandsElements = container.querySelectorAll(".react-autosuggest__suggestions-list li");
      expect(commandsElements).toHaveLength(maxDisplayed);
    });

    it("should load in < 1 second", async () => {
      expect.assertions(2);
      const commands = () => {
        // assuming a 2.5 GHz Intel Core i7 running OSX 10.14.3
        // adding 25,000 commands takes <= 1 sec. This benchmark should be reliably
        // reproduceable. The goal of this performance test is render
        // 25k commands on under 1 second in the CI build pipeline
        const arr = new Array(25000);
        return arr.fill({
          name: "foo",
          command: Function.prototype,
        });
      };
      // before mounting note the time
      const before = performance.now();
      const { container } = render(<CommandPalette commands={commands()} />);
      const button = screen.getByText("Command Palette");
      fireEvent.click(button);
      const commandsElements = container.querySelectorAll(".react-autosuggest__suggestions-list li");
      const after = performance.now();
      expect(commandsElements).toBeDefined();
      expect(after - before).toBeLessThanOrEqual(1000);
    });

    it("should display 7 commands by default", () => {
      const defaultMaxDisplayed = 7;
      const commands = () => {
        const arr = new Array(500);
        return arr.fill({
          name: "foo",
          command: Function.prototype,
        });
      };
      const { container } = render(
        <CommandPalette
          commands={commands()}
          maxDisplayed={defaultMaxDisplayed}
          open
        />
      );
      // Trigger autosuggest to show items
      const input = screen.getByPlaceholderText('Type a command');
      fireEvent.change(input, { target: { value: "St" } });
      const commandsElements = container.querySelectorAll(".react-autosuggest__suggestions-list li");
      expect(commandsElements).toHaveLength(defaultMaxDisplayed);
    });
  });
});

describe("Selecting a command", () => {
  it("should execute the commands function", async () => {
    const command = jest.fn();
    const customCommands = [
      {
        name: "Manage Tenants",
        command,
      },
    ];
    const { container } = render(<CommandPalette commands={customCommands} open />);
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Man" } });
    const firstItem = await screen.findByText("Manage Tenants");
    fireEvent.click(firstItem);
    expect(command).toHaveBeenCalled();
  });

  it("should throw an error if the command is not a function", async () => {
    const originalError = console.error;
    console.error = jest.fn();
    const errMsg = "command must be a function";
    const invalidCommands = [
      {
        name: "Invalid Command",
        command: "not a function",
      },
    ];
    const { container } = render(<CommandPalette commands={invalidCommands} open />);
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Inv" } });
    const firstItem = await screen.findByText("Invalid Command");

    expect(() => {
      fireEvent.click(firstItem);
    }).toThrow(errMsg);

    console.error = originalError;
  });

  it("should close the pallete given that props.closeOnSelect is truthy", async () => {
    const { container } = render(
      <CommandPalette commands={mockCommands} closeOnSelect open />
    );
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const firstItem = await screen.findByText(/Stop All Data Imports|Start All Data Imports/);
    fireEvent.click(firstItem);
    // Modal should be closed
    expect(screen.queryByPlaceholderText('Type a command')).not.toBeInTheDocument();
  });
});

describe("Fetching commands", () => {
  it("should update the list with a filtered list of commands", () => {
    const { container } = render(<CommandPalette commands={mockCommands} open />);
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "Logs" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(1);
  });

  it("should update the list with all commands", () => {
    const { container } = render(<CommandPalette commands={mockCommands} open />);
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    const items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(mockCommands.length);
  });

  it("should update the list of commands when props.commands changes", () => {
    const { container, rerender } = render(<CommandPalette commands={mockCommands} open />);
    // Trigger autosuggest to show items
    const input = screen.getByPlaceholderText('Type a command');
    fireEvent.change(input, { target: { value: "St" } });
    let items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(mockCommands.length);

    const newCommands = [
      {
        name: "Omega",
        command() {},
      },
    ];
    rerender(<CommandPalette commands={newCommands} open />);

    // Trigger autosuggest again after rerender
    const newInput = screen.getByPlaceholderText('Type a command');
    fireEvent.change(newInput, { target: { value: " " } });

    // check that we have just the new command
    items = container.querySelectorAll(".react-autosuggest__suggestions-list li");
    expect(items).toHaveLength(1);
    expect(items[0].textContent).toEqual("Omega");
  });
});
