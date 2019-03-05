/*  global dom:true */
/*  eslint
  no-unused-vars: ["error", { "varsIgnorePattern": "^renderer$" }],
  "function-paren-newline":0  */

import * as React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Mousetrap from "mousetrap";
import serializer from "enzyme-to-json/serializer";
import renderer from "react-test-renderer";
import CommandPalette from "./command-palette";
import RenderSuggestion from "./render-suggestion";
import mockCommands from "./__mocks__/commands";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

describe("Search", () => {
  it("has configureable fusejs options", () => {
    const searchOptions = {
      tokenize: true,
      matchAllTokens: true,
      findAllMatches: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name", "section"]
    };

    const commandPalette = mount(
      <CommandPalette options={searchOptions} commands={mockCommands} />
    );

    commandPalette.instance().onSuggestionsFetchRequested({ value: "zz" });
    expect(commandPalette.state("suggestions")).toHaveLength(2);
    expect(commandPalette.props().options).toBe(searchOptions);
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

  it.skip("pressing hot key(s) again toggles the commandPalette closed", () => {
    expect.assertions(3);
    const spyHandleCloseModal = jest.spyOn(
      CommandPalette.prototype,
      "handleCloseModal"
    );

    const commandPalette = mount(<CommandPalette commands={mockCommands} />);

    expect(spyHandleCloseModal.mock.calls).toHaveLength(0);
    commandPalette.find("button").simulate("click");
    expect(commandPalette.state("showModal")).toEqual(true);
    Mousetrap.trigger("command+shift+p");
    expect(commandPalette.state("showModal")).toEqual(false);
    // Mousetrap(commandPalette.find('input').instance()).trigger("command+shift+p");
    // Mousetrap.trigger("command+shift+p");
    // wrapper.find("input").simulate("change", { target: { which: "91" } });
    // wrapper.find("input").simulate("change", { target: { which: "16" } });
    // wrapper.find("input").simulate("change", { target: { which: "80" } });
    // expect(spyHandleCloseModal.mock.calls.length).toHaveLength(1);
    // const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    // const wrapper = mount(<CommandPalette commands={mockCommands} />);
    // // verify modal is hidden before we try to open it
    // expect(commandPalette.state("showModal")).toBe(false);
    // Mousetrap.trigger("command+shift+p");
    // const { input } = commandPalette.instance().commandPaletteInput;
    // expect(commandPalette.state("showModal")).toEqual(true);
    // // close it
    // commandPalette.find("input").simulate("change", { target: { which: "91" } });
    // commandPalette.find("input").simulate("change", { target: { which: "16" } });
    // commandPalette.find("input").simulate("change", { target: { which: "80" } });
    // // Mousetrap(input).trigger("command+shift+p");
    // expect(commandPalette.state("showModal")).toEqual(false);
    // expect(spyHandleCloseModal).toHaveBeenCalled();
    // expect(spyHandleCloseModal.mock.calls).toHaveLength(1);
    // expect(commandPalette.state("showModal")).toEqual(false);
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

  // TODO:
  it("should execute the command when enter is pressed", () => {});
});

describe("Command List", () => {
  it("returns a list of commands when given a string to match on", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    const suggestions = commandPalette.instance().getSuggestions("Fizz");
    expect(suggestions[0].item.name).toEqual("Fizz");
    expect(suggestions[1].item.name).toEqual("Fizz Buzz");
  });

  it("initially returns all commands", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    const suggestions = commandPalette.instance().getSuggestions();
    expect(suggestions).toHaveLength(mockCommands.length);
  });

  it("returns all commands when there is no string to match", () => {
    const commandPalette = mount(<CommandPalette commands={mockCommands} />);
    commandPalette.find("button").simulate("click");
    commandPalette
      .instance()
      .onSuggestionsFetchRequested({ value: "bannanas!" });
    const suggestions = commandPalette.state("suggestions");
    expect(suggestions).toHaveLength(mockCommands.length);
  });

  it("renders a command", () => {
    const mockdata = {
      item: {
        id: 1,
        name: "Foo",
        command: () => ({}),
        section: "Command"
      }
    };
    const renderSuggestion = RenderSuggestion(mockdata, { query: "F" });
    const wrapper = shallow(renderSuggestion);
    expect(wrapper).toMatchSnapshot();
  });

  describe("number of commands displayed", () => {
    it("should not be greater than 500", () => {
      const tooManyCommands = () => {
        const arr = new Array(501);
        return arr.fill({
          name: "foo",
          command: Function.prototype
        });
      };

      let error;
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

  // commandPalette.onSuggestionSelected = jest.fn();
  it("should execute the commands function", () => {
    const command = jest.fn();
    const mock = {
      suggestion: {
        item: {
          id: "",
          name: "Manage Tenants",
          section: "Command",
          command
        }
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
  const commandPalette = shallow(<CommandPalette commands={mockCommands} />);

  it("should update the state with a filtered list of commands", () => {
    commandPalette.instance().onSuggestionsFetchRequested({ value: "Foo" });
    expect(commandPalette.state("suggestions")).toHaveLength(1);
  });

  it("should update the state with a list of all commands", () => {
    commandPalette.instance().onSuggestionsFetchRequested({ value: null });
    expect(commandPalette.state("suggestions")).toHaveLength(
      mockCommands.length
    );
  });
});
