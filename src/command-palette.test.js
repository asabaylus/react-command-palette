/* eslint-disable no-console */
/*  global dom:true */
/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0,
  no-new:0 */

import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Mousetrap from "mousetrap";
import serializer from "enzyme-to-json/serializer";
import fuzzysortOptions from "./fuzzysort-options";
import CommandPalette from "./command-palette";
import mockCommands from "./__mocks__/commands";
import sampleHeader from "../examples/sampleHeader";
import sampleAtomCommand from "../examples/sampleAtomCommand";
import sampleChromeCommand from "../examples/sampleChromeCommand";
import chromeTheme from "../themes/chrome-theme";
import { clickDown, clickUp, clickEnter } from "./test-helpers";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

describe("Loading indicator", () => {
  it("should display the spinner by default", () => {
    const wrapper = mount(<CommandPalette commands={mockCommands} open />);
    wrapper
      .find(".item")
      .first()
      .simulate("click");
    const spinner = wrapper.find(".default-spinner");
    // the palette should remain open
    expect(wrapper.state("showModal")).toBeTruthy();
    // the animated loading spinner should be displayed
    expect(spinner).toBeDefined();
    expect(spinner).toMatchSnapshot();
  });

  it("should display a custom react component when props.spinner is set", () => {
    const wrapper = mount(
      <CommandPalette commands={mockCommands} spinner={<b>Waiting</b>} open />
    );
    wrapper
      .find(".item")
      .first()
      .simulate("click");
    const spinner = wrapper.find(".spinner").childAt(1);
    // the palette should remain open
    expect(wrapper.state("showModal")).toBeTruthy();
    // a custom loading spinner should be displayed
    expect(spinner.containsMatchingElement(<b>Waiting</b>)).toBeTruthy();
    expect(spinner).toMatchSnapshot();
  });

  it("should display a custom string when props.spinner is set", () => {
    const wrapper = mount(
      <CommandPalette commands={mockCommands} spinner="Waiting" open />
    );
    wrapper
      .find(".item")
      .first()
      .simulate("click");
    const spinner = wrapper.find(".spinner");
    // the palette should remain open
    expect(wrapper.state("showModal")).toBeTruthy();
    // a custom loading spinner should be displayed
    expect(spinner.text()).toEqual("Waiting");
    expect(spinner).toMatchSnapshot();
  });

  it("should hide the spinner when props.showSpinnerOnSelect is false", () => {
    const wrapper = mount(
      <CommandPalette
        commands={mockCommands}
        showSpinnerOnSelect={false}
        open
      />
    );
    wrapper
      .find(".item")
      .first()
      .simulate("click");
    const spinner = wrapper.find(".default-spinner");
    expect(spinner.exists()).toBeFalsy();
  });

  it("should show the spinner when props.showSpinnerOnSelect is true", () => {
    const wrapper = mount(
      <CommandPalette commands={mockCommands} showSpinnerOnSelect open />
    );
    wrapper
      .find(".item")
      .first()
      .simulate("click");
    const spinner = wrapper.find(".default-spinner");
    expect(wrapper.state("isLoading")).toBeTruthy();
    expect(wrapper.props("showSpinnerOnSelect")).toBeTruthy();
    expect(spinner.exists()).toBeTruthy();
  });
});

describe("Search", () => {
  it("has configureable fusejs options", () => {
    const commandPalette = mount(
      <CommandPalette options={fuzzysortOptions} commands={mockCommands} />
    );

    commandPalette.instance().onSuggestionsFetchRequested({ value: "Imports" });
    expect(commandPalette.state("suggestions")).toHaveLength(2);
    expect(commandPalette.props().options).toBe(fuzzysortOptions);
  });
});

describe("props.header", () => {
  it("should not display by default", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    expect(commandPalette.props().header).toBe(null);
  });

  it("should render a custom string", () => {
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        header="this is a command palette"
        open
      />
    );
    const header = commandPalette.find("Header");
    expect(
      header.contains(
        <div className="atom-header">this is a command palette</div>
      )
    ).toBeTruthy();
  });

  it("should render the header", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} header={sampleHeader()} open />
    );
    const header = commandPalette.find(".atom-header");
    expect(header.contains(sampleHeader())).toBeTruthy();
    expect(header).toMatchSnapshot();
  });
});

describe("props.resetInputOnClose", () => {
  it("should not reset input by default", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );

    commandPalette
      .find("input")
      .simulate("change", { target: { value: "my query" } });

    commandPalette.instance().handleCloseModal();
    commandPalette.instance().handleOpenModal();
    expect(commandPalette.state("value")).toEqual("my query");
  });

  it("should reset input to defaultInputValue when resetInputOnClose is set", () => {
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        defaultInputValue="default"
        open
        resetInputOnClose
      />
    );

    commandPalette
      .find("input")
      .simulate("change", { target: { value: "my query" } });

    commandPalette.instance().handleCloseModal();
    commandPalette.instance().handleOpenModal();
    expect(commandPalette.state("value")).toEqual("default");
  });
});

describe("props.renderCommand", () => {
  it("should render a custom command component", () => {
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        RenderCommand={sampleAtomCommand}
        open
      />
    );
    expect(commandPalette.find(".category")).toBeTruthy();
    expect(commandPalette).toMatchSnapshot();
  });
});

describe("props.defaultInputValue", () => {
  it("should display the defaultInputValue prop when the palette is first opened", () => {
    const wrapper = mount(
      <CommandPalette commands={mockCommands} defaultInputValue="?" open />
    );
    expect(wrapper.state("value")).toEqual("?");
  });

  it(`should not display the defaultInputValue after the user enters a new 
  value`, () => {
    const wrapper = mount(
      <CommandPalette commands={mockCommands} defaultInputValue="?" open />
    );
    wrapper.find("input").simulate("change", { target: { value: ">" } });
    expect(wrapper.state("value")).toEqual(">");
  });
});

describe("props.theme", () => {
  it("should render a custom theme", () => {
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        RenderCommand={sampleChromeCommand}
        header="this is a command palette"
        theme={chromeTheme}
        open
      />
    );

    // verify the four primary components have the correct classNames
    expect(
      commandPalette.find("button").hasClass("chrome-trigger")
    ).toBeTruthy();
    expect(
      commandPalette.find("Header > div").hasClass("chrome-header")
    ).toBeTruthy();
    expect(commandPalette.find("Modal").hasClass("chrome-modal")).toBeTruthy();
    expect(commandPalette.find("input").hasClass("chrome-input")).toBeTruthy();
    expect(commandPalette).toMatchSnapshot();
    commandPalette
      .find(".item")
      .first()
      .simulate("click");
    expect(
      commandPalette.find(".default-spinner").hasClass("chrome-spinner")
    ).toBeTruthy();
  });
});

describe("props.placeholder", () => {
  it('should display a "Type a command" by default', () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    const { input } = commandPalette.instance().commandPaletteInput;

    expect(commandPalette.props().placeholder).toBe("Type a command");
    expect(input.placeholder).toBe("Type a command");
  });

  it("should render a custom string", () => {
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        placeholder="What do you want to do?"
        open
      />
    );
    const { input } = commandPalette.instance().commandPaletteInput;

    expect(commandPalette.props().placeholder).toBe("What do you want to do?");
    expect(input.placeholder).toBe("What do you want to do?");
  });
});

describe("props.display", () => {
  it("should be enabled by default", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    expect(commandPalette.find("Modal")).toBeDefined();
  });

  it("should display the command palette in a react-modal component when true", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} display="modal" />
    );
    expect(commandPalette.find("Modal")).toBeDefined();
  });

  it("should not display the command palette in react-modal when false", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} display="inline" />
    );
    expect(commandPalette.find("Modal")).toHaveLength(0);
    expect(commandPalette).toMatchSnapshot();
  });
});

describe("props.highlightFirstSuggestion", () => {
  it("should be 'true' by default", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    const firstSuggestion = commandPalette.find(".atom-suggestionFirst");
    expect(
      firstSuggestion.first().hasClass("atom-suggestionHighlighted")
    ).toBeTruthy();
  });

  it("should not highlight the first command when 'false'", () => {
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        highlightFirstSuggestion={false}
        open
      />
    );
    const firstSuggestion = commandPalette.find(".atom-suggestionFirst");
    expect(
      firstSuggestion.first().hasClass("atom-suggestionHighlighted")
    ).toBeFalsy();
  });
});

describe("props.alwaysRenderCommands", () => {
  it("should be enabled by default", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    expect(commandPalette.props().alwaysRenderCommands).toBeTruthy();
  });

  it("should render commands when true and input is not focused.", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} alwaysRenderCommands open />
    );
    commandPalette.find("input").simulate("blur");
    expect(commandPalette.props().alwaysRenderCommands).toBeTruthy();
    expect(commandPalette.find("ItemsList")).toHaveLength(1);
  });

  it("should not render commands when false and input is not focused.", () => {
    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        alwaysRenderCommands={false}
        open
      />
    );
    commandPalette.find("input").simulate("blur");
    expect(commandPalette.props().alwaysRenderCommands).toBeFalsy();
    expect(commandPalette.find("ItemsList")).toHaveLength(0);
  });
});

describe("props.reactModalParentSelector", () => {
  it("should render render reat-modal in the target element.", () => {
    // add a div with #main id to the global body
    const modalRoot = global.document.createElement("div");
    modalRoot.setAttribute("id", "main");
    const body = global.document.querySelector("body");
    body.appendChild(modalRoot);

    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        reactModalParentSelector="#main"
        open
      />
    );

    expect(commandPalette).toBeTruthy();
    expect(global.document.querySelector("#main").hasChildNodes()).toBeTruthy();
    expect(commandPalette).toMatchSnapshot();
  });
});

describe("Opening the palette", () => {
  it("auto-focuses the input", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    commandPalette.find("button").simulate("click");
    setTimeout(() => {
      const { input } = commandPalette.instance().commandPaletteInput;
      expect(input === dom.activeElement).toEqual(true);
    }, 0);
  });

  it("fires the onHighlight event and returns the highlighted suggestion", () => {
    const spyOnHighlight = jest.fn();

    const commandPalette = mount(
      <CommandPalette
        commands={mockCommands}
        onHighlight={spyOnHighlight}
        open
      />
    );

    const input = commandPalette.find("input").instance();
    clickDown(input, 2);
    expect(spyOnHighlight).toHaveBeenCalled();
    expect(spyOnHighlight.mock.calls[2][0]).toBe(mockCommands[2]);
    spyOnHighlight.mockClear();
  });

  it("fires the onSelect event and returns the selected suggestion", () => {
    const spyOnSelect = jest.fn();
    const command = jest.fn();
    const mock = {
      suggestion: {
        name: "Manage Tenants",
        command
      },
      suggestionValue: "Manage Tenants",
      suggestionIndex: 0,
      sectionIndex: null,
      method: "click"
    };
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} onSelect={spyOnSelect} />
    );
    commandPalette.instance().onSuggestionSelected({}, mock);
    expect(spyOnSelect).toHaveBeenCalled();
    // verify the callback contains the selected item
    expect(spyOnSelect.mock.calls[0][0]).toBe(mock.suggestion);
    spyOnSelect.mockClear();
  });

  it("fires the onAfterOpen event", () => {
    const spyOnAfterOpen = jest.fn();
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} onAfterOpen={spyOnAfterOpen} />
    );
    commandPalette.find("button").simulate("click");
    expect(spyOnAfterOpen).toHaveBeenCalled();
  });

  it("fires the onRequestClose event", () => {
    new Promise(done => {
      const spyOnClose = jest.fn(() => expect(spyOnClose).toHaveBeenCalled());
      const commandPalette = mount(
        <CommandPalette commands={mockCommands} onRequestClose={spyOnClose} />
      );
      commandPalette.find("button").simulate("click");
      done();
    });
  });

  it("displays the suggestion list", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    commandPalette.find("button").simulate("click");
    expect(commandPalette).toMatchSnapshot();
  });

  it("fetches commands for the palette", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    const commands = commandPalette.instance().fetchData();
    expect(commands).toHaveLength(mockCommands.length);
  });

  it("should be displayed when open prop is true", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    expect(commandPalette.state("showModal")).toEqual(true);
  });

  it("opens the commandPalette when handleOpenModal is called", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    expect(commandPalette.state("showModal")).toEqual(false);
    commandPalette.instance().handleOpenModal();
    expect(commandPalette.state("showModal")).toEqual(true);
  });

  it("opens the commandPalette when the state of showModal is true", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    commandPalette.setState({ showModal: true });
    expect(commandPalette.state("showModal")).toBe(true);
  });

  it('opens the commandPalette when pressing the "command+shift+p" keys', () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    // verify modal is hidden before we try to open it
    expect(commandPalette.state("showModal")).toBe(false);
    Mousetrap.trigger("command+shift+p");
    expect(commandPalette.state("showModal")).toEqual(true);
  });

  describe("Overriding with custom hotKeys", () => {
    it('opens the commandPalette when pressing the "ctrl+shift+p" keys', () => {
      const spyHandleOpenModal = jest.spyOn(
        CommandPalette.prototype,
        "handleOpenModal"
      );
      const commandPalette = mount(
        <CommandPalette hotKeys="ctrl+shift+p" commands={mockCommands} />
      );
      commandPalette.instance().handleCloseModal();
      // verify modal is hidden before we try to open it
      expect(commandPalette.state("showModal")).toBe(false);
      Mousetrap.trigger("ctrl+shift+p");
      expect(commandPalette.state("showModal")).toEqual(true);
      expect(spyHandleOpenModal).toHaveBeenCalled();
      expect(spyHandleOpenModal.mock.calls).toHaveLength(1);
      expect(commandPalette.state("showModal")).toEqual(true);
      spyHandleOpenModal.mockClear();
    });

    it(`opens the commandPalette when pressing 
    either "ctrl+shift+p" or "ctrl+k" keys`, () => {
      const spyHandleOpenModal = jest.spyOn(
        CommandPalette.prototype,
        "handleOpenModal"
      );
      const commandPalette = mount(
        <CommandPalette
          hotKeys={["ctrl+shift+p", "ctrl+k"]}
          commands={mockCommands}
        />
      );
      commandPalette.instance().handleCloseModal();
      // verify modal is hidden before we try to open it
      expect(commandPalette.state("showModal")).toBe(false);

      Mousetrap.trigger("ctrl+shift+p");
      expect(commandPalette.state("showModal")).toEqual(true);
      commandPalette.instance().handleCloseModal();

      Mousetrap.trigger("ctrl+k");
      expect(commandPalette.state("showModal")).toEqual(true);
      commandPalette.instance().handleCloseModal();

      expect(spyHandleOpenModal).toHaveBeenCalled();
      expect(spyHandleOpenModal.mock.calls).toHaveLength(2);
      spyHandleOpenModal.mockClear();
    });
  });
});

describe("Closing the palette", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should close the commandPalette when pressing the "esc" key', () => {
    const spyHandleCloseModal = jest.spyOn(
      CommandPalette.prototype,
      "handleCloseModal"
    );
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    commandPalette.instance().handleOpenModal();
    const { input } = commandPalette.instance().commandPaletteInput;
    expect(commandPalette.state("showModal")).toEqual(true);
    input.dispatchEvent(new KeyboardEvent("keydown", { which: 27 }));
    expect(commandPalette.state("showModal")).toEqual(false);
    expect(spyHandleCloseModal).toHaveBeenCalled();
    expect(spyHandleCloseModal.mock.calls).toHaveLength(1);
    expect(commandPalette.state("showModal")).toEqual(false);
  });

  it("should close the wrapper when clicked outside", () => {
    const spyHandleCloseModal = jest.spyOn(
      CommandPalette.prototype,
      "handleCloseModal"
    );
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    commandPalette.instance().handleOpenModal();
    expect(commandPalette.state("showModal")).toEqual(true);
    commandPalette.find("Modal").simulate("click");
    expect(spyHandleCloseModal).toHaveBeenCalled();
    expect(spyHandleCloseModal.mock.calls).toHaveLength(1);
    expect(commandPalette.state("showModal")).toEqual(false);
  });
});

describe("props.onChange", () => {
  describe("Opening the Command Palette", () => {
    it("should fire onChange", () => {
      const spyOnChange = jest.fn();
      const mock = { newValue: "foo" };
      const commandPalette = mount(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} />
      );
      commandPalette.instance().onChange({}, mock);
      expect(spyOnChange).toHaveBeenCalled();
      // verify the spyed callback contains returns the input value
      expect(spyOnChange.mock.calls[0][0]).toBe(mock.newValue);
      spyOnChange.mockClear();
    });
  });

  describe("Typing text into the input field", () => {
    it("should fire onChange", () => {
      const spyOnChange = jest.fn();
      const commandPalette = mount(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      commandPalette
        .find("input")
        .simulate("change", { target: { value: "f" } });
      expect(spyOnChange).toHaveBeenCalled();
      spyOnChange.mockClear();
    });

    it("should return the value of the input field", () => {
      const spyOnChange = jest.fn();
      const mock = { newValue: "foo" };
      const commandPalette = mount(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      commandPalette
        .find("input")
        .simulate("change", { target: { value: mock.newValue } });
      expect(spyOnChange).toHaveBeenCalled();
      // verify the spied callback contains returns the input value
      expect(spyOnChange.mock.calls[0][0]).toBe(mock.newValue);
      spyOnChange.mockClear();
    });

    it("should return the query containing user's typed text", () => {
      const mock = { inputValue: "Start", userQuery: "Start" };
      const handleOnClick = function() {};
      const spyOnChange = jest.fn().mockImplementation(handleOnClick);
      const commandPalette = mount(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      commandPalette
        .find("input")
        .simulate("change", { target: { value: mock.inputValue } });
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
    let commandPalette;
    let input;

    beforeEach(() => {
      handleOnClick = function() {};
      spyOnChange = jest.fn().mockImplementation(handleOnClick);
      commandPalette = mount(
        <CommandPalette commands={mockCommands} onChange={spyOnChange} open />
      );
      input = commandPalette
        .find("input")
        .simulate("change", { target: { value: "Start" } })
        .instance();
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

      // First suggestion is always highlighted, pressing ArrowDown
      // highlights the second item in the suggestion list
      const firstSuggestion = commandPalette
        .find("#react-autowhatever-1--item-0")
        .first();
      firstSuggestion.simulate("click");
      expect(spyOnChange).toHaveBeenCalledTimes(2);
      expect(spyOnChange.mock.calls[1][0]).toBe("Start All Data Imports");
      expect(spyOnChange.mock.calls[1][1]).toBe(null);
    });
  });
});

describe("Filtering the commands and pressing enter", () => {
  it("should update the value in the input field", () => {
    const spyOnChange = jest.spyOn(CommandPalette.prototype, "onChange");
    const wrapper = mount(<CommandPalette commands={mockCommands} />);
    expect(spyOnChange.mock.calls).toHaveLength(0);
    wrapper.find("button").simulate("click");
    expect(wrapper.state("showModal")).toEqual(true);
    wrapper.find("input").simulate("change", { target: { value: "F" } });
    expect(spyOnChange.mock.calls).toHaveLength(1);
    expect(wrapper.state("value")).toEqual("F");
  });
});

describe("Command List", () => {
  it("returns a list of commands when given a string to match on", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    commandPalette.instance().onSuggestionsFetchRequested({ value: "Im" });
    const suggestions = commandPalette.state("suggestions");
    expect(suggestions).toHaveLength(2);
    expect(suggestions[0].name).toEqual("Stop All Data Imports");
    expect(suggestions[1].name).toEqual("Start All Data Imports");
  });

  it("initially returns all commands", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    const suggestions = commandPalette.state("suggestions");
    expect(suggestions).toHaveLength(mockCommands.length);
  });

  it("returns all commands when there is no string to match", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    commandPalette
      .instance()
      .onSuggestionsFetchRequested({ value: "bannanas!" });
    const suggestions = commandPalette.state("suggestions");
    expect(suggestions).toHaveLength(mockCommands.length);
  });

  it("renders a command", () => {
    const commandPalette = mount(
      <CommandPalette commands={mockCommands} open />
    );
    commandPalette
      .find("input")
      .simulate("change", { target: { value: "Logs" } });
    expect(commandPalette).toMatchSnapshot();
  });

  describe("number of commands displayed", () => {
    it("should not be greater than 500", () => {
      const originalError = console.error;
      console.error = jest.fn();
      const tooManyCommands = () => {
        const arr = new Array(501);
        return arr.fill({
          name: "foo",
          command: Function.prototype
        });
      };

      let error;
      console.error = jest.fn();
      try {
        shallow(
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
          command: Function.prototype
        });
      };
      const commandPalette = mount(
        <CommandPalette commands={commands()} maxDisplayed={maxDisplayed} />
      );
      commandPalette.find("button").simulate("click");
      const commandsElements = commandPalette.find("Item");
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
          command: Function.prototype
        });
      };
      // before mounting note the time
      const before = performance.now();
      const commandPalette = mount(<CommandPalette commands={commands()} />);
      commandPalette.find("button").simulate("click");
      const commandsElements = commandPalette.find("Item");
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
          command: Function.prototype
        });
      };
      const commandPalette = mount(
        <CommandPalette
          commands={commands()}
          maxDisplayed={defaultMaxDisplayed}
        />
      );
      commandPalette.find("button").simulate("click");
      const commandsElements = commandPalette.find("Item");
      expect(commandsElements).toHaveLength(defaultMaxDisplayed);
    });
  });
});

describe("Selecting a command", () => {
  const commandPalette = shallow(<CommandPalette commands={mockCommands} />);

  it("should execute the commands function", () => {
    const command = jest.fn();
    const mock = {
      suggestion: {
        name: "Manage Tenants",
        command
      },
      suggestionValue: "Manage Tenants",
      suggestionIndex: 0,
      sectionIndex: null,
      method: "click"
    };
    commandPalette.instance().onSuggestionSelected({}, mock);
    expect(command).toHaveBeenCalled();
  });

  it("should throw an error if the command is not a function", () => {
    const { onSuggestionSelected } = commandPalette.instance();
    const errMsg = "command must be a function";
    const mock = {
      suggestion: {
        item: {
          command: "not a function"
        }
      }
    };
    expect(() => {
      onSuggestionSelected(null, mock);
    }).toThrow(errMsg);
  });

  it("should close the pallete given that props.closeOnSelect is truthy", () => {
    const wrapper = mount(
      <CommandPalette commands={mockCommands} closeOnSelect open />
    );
    wrapper
      .find(".item")
      .first()
      .simulate("click");
    expect(wrapper.state("showModal")).toBeFalsy();
  });
});

describe("Fetching commands", () => {
  it("should update the state with a filtered list of commands", () => {
    const commandPalette = shallow(<CommandPalette commands={mockCommands} />);
    commandPalette.instance().onSuggestionsFetchRequested({ value: "Logs" });
    expect(commandPalette.state("suggestions")).toHaveLength(1);
  });

  it("should update the state with a list of all commands", () => {
    const commandPalette = shallow(<CommandPalette commands={mockCommands} />);
    commandPalette.instance().onSuggestionsFetchRequested({ value: null });
    expect(commandPalette.state("suggestions")).toHaveLength(
      mockCommands.length
    );
  });

  it("should update the list of commands when props.commands changes", () => {
    const wrapper = mount(<CommandPalette commands={mockCommands} open />);

    // first load all the commands then update props.commands
    expect(wrapper.state("suggestions")).toHaveLength(mockCommands.length);
    wrapper.setProps({
      commands: [
        {
          name: "Omega",
          command() {}
        }
      ]
    });

    // check that the state as just the new command
    expect(wrapper.state("suggestions")).toHaveLength(1);
    expect(wrapper.state().suggestions[0].name).toEqual("Omega");
  });
});
