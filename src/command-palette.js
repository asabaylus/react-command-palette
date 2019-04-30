/* eslint-disable react/jsx-no-bind */
import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

import equal from "fast-deep-equal";
import Autosuggest from "react-autosuggest";
import Mousetrap from "mousetrap";
import PaletteSpinner from "./palette-spinner";

import fuzzysortOptions from "./fuzzysort-options";
import RenderCommand from "./render-command";
import PaletteTrigger from "./palette-trigger";
import getSuggestions from "./suggestions";

import theme from "./themes/chrome";

// Apply a functions that'll run after the command's function runs
// Monkey patching for the commands
// http://me.dt.in.th/page/JavaScript-override/
function override(object, methodName, callback) {
  const dupe = object;
  dupe[methodName] = callback(object[methodName]);
}

function after(extraBehavior) {
  return function(original, ...args) {
    return function() {
      const returnValue = original.apply(this, args);
      extraBehavior.apply(this, args);
      return returnValue;
    };
  };
}

const allSuggestions = [];

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

const modalStyles = {
  content: theme.content,
  overlay: theme.overlay
};

class CommandPalette extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      isLoading: false,
      showModal: false,
      value: "",
      suggestions: allSuggestions
    };

    this.onChange = this.onChange.bind(this);
    // eslint-disable-next-line prettier/prettier
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.commandTemplate = this.commandTemplate.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.commandPaletteInput = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }

  componentDidMount() {
    const { hotKeys, open, display } = this.props;

    this.setState({
      value: "",
      suggestions: this.fetchData()
    });

    // Use hot key to open command palette
    Mousetrap.bind(hotKeys, () => {
      this.handleOpenModal();
      // prevent default which opens Chrome dev tools command palatte
      return false;
    });

    if (open) return this.handleOpenModal();

    // because there's no modal when using inline the input should be focused
    if (display === "inline") return this.focusInput();
    return true;
  }

  componentDidUpdate(prevProps) {
    const { commands } = this.props;
    if (!equal(prevProps.commands, commands)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        value: "",
        suggestions: this.fetchData()
      });
    }
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionSelected(event, { suggestion }) {
    if (typeof suggestion.command === "function") {
      // after the command executes display a spinner
      override(
        suggestion,
        "command",
        after(() => {
          // close the command palette if prop is set
          const { closeOnSelect, display } = this.props;
          if (closeOnSelect && display === "modal") {
            this.handleCloseModal();
          } else {
            // otherwise show the loading spinner
            this.setState({ isLoading: true });
          }
        })
      );
      return suggestion.command();
    }
    throw new Error("command must be a function");
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    const { options } = this.props;
    this.setState({
      suggestions: getSuggestions(value, this.allCommands, options)
    });
  }

  onSuggestionsClearRequested() {
    // when using the onSuggestionsClearRequested property, it overrides
    // alwaysRenderSuggestions which I think is counter intuitive, as always should mean
    // always, see: https://github.com/moroshko/react-autosuggest/issues/521
    // once this issue is resolved the suggestions should return an empty array, ex:
    // this.setState({
    //   suggestions: []
    // });
    return true;
  }

  afterOpenModal() {
    this.focusInput();
  }

  fetchData() {
    const { commands, maxDisplayed } = this.props;
    if (maxDisplayed > 500) {
      throw new Error(
        "Display is limited to a maximum of 500 items to prevent performance issues"
      );
    }

    this.allCommands = commands;
    return this.allCommands;
  }

  focusInput() {
    this.commandPaletteInput.input.focus();
    // FIXME: apply "esc" on the modal instead of input
    // so that pressing esc on loading spinner works too
    const { hotKeys } = this.props;
    Mousetrap(this.commandPaletteInput.input).bind(["esc", hotKeys], () => {
      this.handleCloseModal();
      return false;
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      isLoading: false
    });
  }

  handleOpenModal() {
    this.setState({
      showModal: true,
      value: "",
      suggestions: allSuggestions
    });
  }

  // Autosuggest will pass through all these props to the input element.
  defaultInputProps(value) {
    const { placeholder } = this.props;
    return {
      placeholder,
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };
  }

  commandTemplate(suggestion) {
    return <RenderCommand {...this.props} suggestion={suggestion} />;
  }

  // eslint-disable-next-line react/sort-comp
  renderAutoSuggest() {
    const { suggestions, value, isLoading } = this.state;
    const {
      maxDisplayed,
      spinner,
      display,
      header,
      alwaysRenderCommands
    } = this.props;
    if (isLoading) {
      return <PaletteSpinner spinner={spinner} display={display} />;
    }

    return (
      <div>
        <div className="header">{header}</div>
        <Autosuggest
          ref={input => {
            this.commandPaletteInput = input;
          }}
          alwaysRenderSuggestions={alwaysRenderCommands}
          suggestions={suggestions.slice(0, maxDisplayed)}
          highlightFirstSuggestion
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={this.commandTemplate}
          inputProps={this.defaultInputProps(value)}
          theme={theme}
        />
      </div>
    );
  }

  render() {
    const { showModal } = this.state;
    const { display, trigger } = this.props;

    if (display === "inline") {
      return (
        <div className="react-command-palette">{this.renderAutoSuggest()}</div>
      );
    }

    return (
      <div className="react-command-palette">
        <PaletteTrigger onClick={this.handleOpenModal} trigger={trigger} />
        <ReactModal
          appElement={document.body}
          style={modalStyles}
          isOpen={showModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Command Palette"
          closeTimeoutMS={
            1
            /* otherwise the modal is not closed when
            suggestion is selected by pressing Enter */
          }
        >
          {this.renderAutoSuggest()}
        </ReactModal>
      </div>
    );
  }
}

CommandPalette.defaultProps = {
  alwaysRenderCommands: true,
  placeholder: "Type a command",
  hotKeys: "command+shift+p",
  header: null,
  maxDisplayed: 7,
  options: fuzzysortOptions,
  closeOnSelect: false,
  display: "modal",
  renderCommand: null
};

CommandPalette.propTypes = {
  /** alwaysRenderCommands a boolean, Set it to true if you'd like to render suggestions
   * even when the input is not focused. */
  alwaysRenderCommands: PropTypes.bool,

  /** commands appears in the command palette. For each command in the array the object
   * must have a _name_ and a _command_. The _name_ is a user friendly string that will
   * be display to the user. The command is a function that will be executed when the
   * user clicks or presses the enter key. Commands may also include custom properties
   * this" will be bound to the command */
  commands: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      command: PropTypes.func.isRequired
    })
  ).isRequired,

  /** maxDisplayed a number between 1 and 500 that determines the maxium number of
   * commands that will be rendered on screen. Defaults to 7 */
  maxDisplayed(props, propName, componentName) {
    const { maxDisplayed } = props;
    if (maxDisplayed > 500) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName} Cannot be greater than
         500.`
      );
    }
    return null;
  },

  /** placeholder a string that contains a short text description which is displaye
   * inside the the input field until the user provides input. Defaults to "Type a
   * command" */
  placeholder: PropTypes.string,

  /** hotKeys a string that contains a keyboard shortcut for opening/closing the palette.
   * Defaults to "command+shift+p" */
  hotKeys: PropTypes.string,

  /** options controls how fuzzy search is configured see [fuzzysort options]
   * (https://github.com/farzher/fuzzysort#options) */
  options: PropTypes.object,

  /** open a boolean, when set to true it forces the command palette to be displayed.
   * Defaults to "false". */
  open: PropTypes.bool,

  /** display one of "modal" or "inline", when set to "modal" the command palette is
   * rendered centered inside a modal. When set to "inline", it is render inline with
   * other page content. Defaults to "modal". */
  display: PropTypes.oneOf(["modal", "inline"]),

  /** header a string or a React.ComponentType which provides a helpful description for
   * the usage of the command palette. The component is displayed at the top of the
   * command palette. header are not displayed by default. see: examples
   * sampleInstruction.js for reference */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** trigger a string or a React.ComponentType that opens the command palette when
   * clicked. If a custom trigger is not set, then by default a button will be used. If a
   * custom component or string is provided then it will automatically be wrapped inside
   * an accessible div which will allow it be keyboard accessible, clickable and focusable
   * for assistive technologies. */
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** spinner a string or a React.ComponentType that is displayed when the user selects
   * an item. If a custom spinner is not set then the default spinner will be used. If
   * custom component or string is provided then it will automatically be wrapped inside
   * a div with a _role="status" attribute. If a component is provided then it will be be
   * wrapped in a div that also contains a sibling node with a div contain "Loading..."
   * visible only to screen readers. */
  spinner: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** closeOnSelect a boolean, when true selecting an item will immendiately close the
   * command-palette  */
  closeOnSelect: PropTypes.bool,

  /** a React.func that defines the layout and contents of the commands in the
   * command list. For complete documentation see the storybook notes. */
  renderCommand: PropTypes.func
};

export default CommandPalette;
