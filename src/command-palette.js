/* eslint-disable react/jsx-no-bind */
import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

// third party libs
import equal from "fast-deep-equal";
import Autosuggest from "react-autosuggest";
import Mousetrap from "mousetrap";

// command palette modules
import fuzzysortOptions from "./fuzzysort-options";
import PaletteSpinner from "./palette-spinner";
import RenderCommand from "./render-command";
import PaletteTrigger from "./palette-trigger";
import getSuggestions from "./suggestions";
import defaultTheme from "./themes/theme";
import { noop, override, after } from "./utils";

import "./themes/atom.css";

const allSuggestions = [];
let initialSuggestions = [];

const Header = (props) => {
  const { theme, children } = props;
  return <div className={theme.header}>{children}</div>;
};

Header.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

class CommandPalette extends React.Component {
  constructor(props) {
    super(props);

    const { defaultInputValue } = this.props;

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      isLoading: false,
      showModal: false,
      value: defaultInputValue,
      suggestions: allSuggestions,
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.onSuggestionHighlighted = this.onSuggestionHighlighted.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.commandTemplate = this.commandTemplate.bind(this);
    this.renderModalCommandPalette = this.renderModalCommandPalette.bind(this);
    this.renderInlineCommandPalette = this.renderInlineCommandPalette.bind(
      this
    );
    this.fetchData = this.fetchData.bind(this);

    this.commandPaletteInput = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }

  componentDidMount() {
    const { hotKeys, open, display } = this.props;

    this.setState({
      suggestions: initialSuggestions = this.fetchData(),
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
    const { commands, open } = this.props;
    if (open !== prevProps.open) {
      if (open) {
        this.handleOpenModal();
      } else {
        this.handleCloseModal();
      }
    }

    if (!equal(prevProps.commands, commands)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        suggestions: this.fetchData(),
      });
    }
  }

  onChange(event, { newValue }) {
    const { onChange } = this.props;
    this.setState({
      value: newValue,
    });
    return onChange(newValue, this.getInputOnTextTyped(event, newValue));
  }

  onSelect(suggestion = null) {
    const { onSelect } = this.props;
    return onSelect(suggestion);
  }

  onSuggestionHighlighted({ suggestion }) {
    const { onHighlight } = this.props;
    onHighlight(suggestion);
  }

  onSuggestionSelected(event, { suggestion }) {
    if (typeof suggestion.command === "function") {
      // after the command executes display a spinner
      override(
        suggestion,
        "command",
        after(() => {
          // fire onSelect event
          this.onSelect(suggestion);
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
    const { options, filterSearchQuery } = this.props;
    this.setState({
      suggestions: getSuggestions(value, this.allCommands, options, filterSearchQuery),
    });
  }

  handleCloseModal() {
    const { onRequestClose } = this.props;

    this.setState({
      showModal: false,
      isLoading: false
    });

    return onRequestClose();
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

  // returns user typed queries only
  // wont return selections or keyboard navigation
  // just input
  getInputOnTextTyped(event, newValue) {
    const { key, type } = event;
    if (
      key !== "ArrowUp" &&
      key !== "ArrowDown" &&
      key !== "Enter" &&
      type !== "click"
    ) {
      return newValue;
    }
    return null;
  }

  afterOpenModal() {
    const { onAfterOpen } = this.props;
    this.focusInput();
    return onAfterOpen();
  }

  fetchData() {
    const { commands, maxDisplayed } = this.props;
    if (maxDisplayed > 500) {
      throw new Error(
        "Display is limited to a maximum of 500 items to prevent performance issues"
      );
    }

    return this.allCommands = commands;
  }

  focusInput() {
    this.commandPaletteInput.input.focus();
    // FIXME: apply "esc" on the modal instead of input
    // so that pressing esc on loading spinner works too
    const { hotKeys } = this.props;
    Mousetrap(this.commandPaletteInput.input).bind(
      ["esc"].concat(hotKeys),
      this.handleCloseModal
    );
  }

  handleOpenModal() {
    const {resetInputOnOpen, defaultInputValue} = this.props;

    if(resetInputOnOpen){
      this.setState({
        suggestions: initialSuggestions,
        value: defaultInputValue
      });
    }

    this.setState({
      showModal: true,
      suggestions: allSuggestions,
    });
  }

  // Autosuggest will pass through all these props to the input element.
  defaultInputProps(value) {
    const { placeholder } = this.props;
    return {
      placeholder,
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };
  }

  commandTemplate(suggestion) {
    return <RenderCommand {...this.props} suggestion={suggestion} />;
  }

  // eslint-disable-next-line react/sort-comp
  renderAutoSuggest() {
    const { suggestions, value, isLoading } = this.state;
    const { theme, getSuggestionValue } = this.props;
    const {
      maxDisplayed,
      spinner,
      showSpinnerOnSelect,
      display,
      header,
      highlightFirstSuggestion,
      alwaysRenderCommands,
    } = this.props;
    if (isLoading && showSpinnerOnSelect) {
      return (
        <PaletteSpinner
          spinner={spinner}
          display={display}
          theme={theme.spinner}
        />
      );
    }

    return (
      <div>
        <Header theme={theme}>{header}</Header>
        <Autosuggest
          ref={(input) => {
            this.commandPaletteInput = input;
          }}
          alwaysRenderSuggestions={alwaysRenderCommands}
          suggestions={suggestions.slice(0, maxDisplayed)}
          getSuggestionValue={getSuggestionValue}
          highlightFirstSuggestion={highlightFirstSuggestion}
          onSuggestionHighlighted={this.onSuggestionHighlighted}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          renderSuggestion={this.commandTemplate}
          inputProps={this.defaultInputProps(value)}
          theme={theme}
        />
      </div>
    );
  }

  renderModalCommandPalette() {
    const { showModal } = this.state;
    const {
      trigger,
      theme,
      reactModalParentSelector,
      shouldReturnFocusAfterClose,
      displayTrigger
    } = this.props;
    const modal = <ReactModal
      appElement={document.body}
      isOpen={showModal}
      parentSelector={() =>
        document.querySelector(reactModalParentSelector)
      }
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.handleCloseModal}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
      className={theme.modal}
      overlayClassName={theme.overlay}
      contentLabel="Command Palette"
      closeTimeoutMS={
        1
        /* otherwise the modal is not closed when
      suggestion is selected by pressing Enter */
      }
    >
      {this.renderAutoSuggest()}
    </ReactModal>
    if(displayTrigger) {
      return (
        <div className="react-command-palette">
          <PaletteTrigger
            onClick={this.handleOpenModal}
            trigger={trigger}
            theme={theme.trigger}
          />
          {modal}
        </div>
      );
    }
    return modal
    
  }

  renderInlineCommandPalette() {
    return (
      <div className="react-command-palette">{this.renderAutoSuggest()}</div>
    );
  }

  render() {
    const { display } = this.props;
    let commandPalette;
    if (display === "inline") {
      commandPalette = this.renderInlineCommandPalette();
    } else {
      commandPalette = this.renderModalCommandPalette();
    }
    return commandPalette;
  }
}

CommandPalette.defaultProps = {
  alwaysRenderCommands: true,
  placeholder: "Type a command",
  hotKeys: "command+shift+p",
  defaultInputValue: "",
  getSuggestionValue: (suggestion) => suggestion.name,
  header: null,
  highlightFirstSuggestion: true,
  maxDisplayed: 7,
  options: fuzzysortOptions,
  filterSearchQuery: (inputValue) => inputValue,
  onChange: noop,
  onHighlight: noop,
  onSelect: noop,
  onAfterOpen: noop,
  onRequestClose: noop,
  closeOnSelect: false,
  resetInputOnOpen: false,
  display: "modal",
  reactModalParentSelector: "body",
  renderCommand: null,
  shouldReturnFocusAfterClose: true,
  showSpinnerOnSelect: true,
  theme: defaultTheme,
  displayTrigger: true,
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
      command: PropTypes.func.isRequired,
    })
  ).isRequired,

  /** maxDisplayed a number between 1 and 500 that determines the maximum number of
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

  /** placeholder a string that contains a short text description which is displayed
   * inside the the input field until the user provides input. Defaults to "Type a
   * command" */
  placeholder: PropTypes.string,

  /** hotKeys a string or array of strings that contain a keyboard shortcut for
   * opening/closing the palette.
   * Defaults to "command+shift+p" */
  hotKeys: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),

  /** defaultInputValue a string that determines the value of the text in the input field.
   * By default the defaultInputValue is an empty string. */
  defaultInputValue: PropTypes.string,

  /** When highlightFirstSuggestion={true}, Autosuggest will automatically highlight the
   *  first suggestion. Defaults to false. */
  highlightFirstSuggestion: PropTypes.bool,

  /** When suggestion is clicked, react-autosuggest needs to populate the input element
   * based on the clicked suggestion. Teach react-autosuggest how to calculate the
   * input value for every given suggestion. By default the highlighed suggestion will be
   * displayed */
  getSuggestionValue: PropTypes.func,

  /** options controls how fuzzy search is configured see [fuzzysort options]
   * (https://github.com/farzher/fuzzysort#options) */
  options: PropTypes.object,

  /** a function that filters the search query. If this prop is not used the default
   * behavior will search the input exactly entered */
  filterSearchQuery: PropTypes.func,

  /** open a boolean, when set to true it forces the command palette to be displayed.
   * Defaults to "false". */
  open: PropTypes.bool,

  /** onHighlight a function that's called when the highlighted suggestion changes. */
  onHighlight: PropTypes.func,

  /** onSelect a function that's called when the selected suggestion changes, given the
   * user selects an item or the user clears the selection. It's called with the item that
   * was selected or null */
  onSelect: PropTypes.func,

  /** onChange a function that's called when the input value changes. */
  onChange: PropTypes.func,

  /** onAfterOpen a function that fires after the command palette modal is opened */
  onAfterOpen: PropTypes.func,

  /** onRequestClose a function that fires after the command palette modal is closed */
  onRequestClose: PropTypes.func,

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
   * a div with a role="status" attribute. If a component is provided then it will be be
   * wrapped in a div that also contains a sibling node with a div contain "Loading..."
   * visible only to screen readers. */
  spinner: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** showSpinnerOnSelect a boolean which displays a loading indicator immediately after
   * a command has been selected. When true the spinner is enabled when false the spinner
   * is disabled. */
  showSpinnerOnSelect: PropTypes.bool,

  /**
   * shouldReturnFocusAfterClose a boolean indicate if the modal should restore focus to
   * the element that had focus prior to its display. */
  shouldReturnFocusAfterClose: PropTypes.bool,

  /** closeOnSelect a boolean, when true selecting an item will immediately close the
   * command-palette  */
  closeOnSelect: PropTypes.bool,

  /** resetInputOnOpen a boolean which indicates whether to reset the user's query
   * to `defaultInputValue` when the command palette opens. */
  resetInputOnOpen: PropTypes.bool,

  /** a selector compatible with querySelector. By default, the modal portal will be
   * appended to the document's body. You can choose a different parent element by
   * selector. If you do this, please ensure that your app element is set correctly. The
   * app element should not be a parent of the modal, to prevent modal content from being
   * hidden to screenreaders while it is open. */
  reactModalParentSelector: PropTypes.string,

  /** a React.func that defines the layout and contents of the commands in the
   * command list. For complete documentation see the storybook notes. */
  renderCommand: PropTypes.func,

  /** Styles and object that contains a list of key value pairs where the keys map the
   * command palette components to their CSS class names. */
  theme: PropTypes.object,
  
  /** Determines whether you want the trigger button to display while in modal mode, defaults to true */
  displayTrigger: PropTypes.bool,
};

export default CommandPalette;
