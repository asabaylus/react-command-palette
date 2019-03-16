import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

import take from "lodash.take";
import equal from "fast-deep-equal";
import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";
import Mousetrap from "mousetrap";
import theme from "./theme";
import PaletteSpinner from "./palette-spinner";

import RenderSuggestion from "./render-suggestion";
import PaletteTrigger from "./palette-trigger";

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
const getSuggestionValue = suggestion => suggestion.item.name;

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
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.commandPaletteInput = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }

  componentDidMount() {
    const { hotKeys, open } = this.props;
    this.fetchData();
    // Use hot key to open command palette
    Mousetrap.bind(hotKeys, () => {
      this.handleOpenModal();
      // prevent default which opens Chrome dev tools command palatte
      return false;
    });

    if (open) {
      return this.handleOpenModal();
    }

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
    if (typeof suggestion.item.command === "function") {
      // after the command executes display a spinner
      override(
        suggestion.item,
        "command",
        after(() => {
          // close the command palette if prop is set
          const { closeOnSelect } = this.props;
          if (closeOnSelect) {
            this.handleCloseModal();
          } else {
            // otherwise show the loading spinner
            this.setState({ isLoading: true });
          }
        })
      );
      return suggestion.item.command();
    }
    throw new Error("command must be a function");
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(value = "") {
    const { options } = this.props;

    // return all commands when user didnt suggest a specific term
    if (!value) {
      return this.allCommands;
    }

    // If the user specified an autosuggest term
    const suggestions = this.allCommands.map(suggestion => suggestion.item);
    const fuse = new Fuse(suggestions, options);
    const filteredSuggestions = fuse.search(value);
    if (!filteredSuggestions.length) {
      return this.allCommands;
    }
    return filteredSuggestions;
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

    this.allCommands = commands.map(obj => ({
      item: {
        id: obj.id,
        name: obj.name,
        command: obj.command,
        section: obj.section
      }
    }));
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
    return {
      placeholder: "Type a command",
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };
  }

  // eslint-disable-next-line react/sort-comp
  renderAutoSuggest(suggestions, value) {
    const { maxDisplayed } = this.props;
    return (
      <Autosuggest
        ref={input => {
          this.commandPaletteInput = input;
        }}
        suggestions={take(suggestions, maxDisplayed)}
        highlightFirstSuggestion
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={RenderSuggestion}
        inputProps={this.defaultInputProps(value)}
        alwaysRenderSuggestions
        theme={theme}
      />
    );
  }

  render() {
    const { value, suggestions, showModal, isLoading } = this.state;
    const { trigger, spinner } = this.props;

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
          {isLoading ? (
            <PaletteSpinner spinner={spinner} />
          ) : (
            this.renderAutoSuggest(suggestions, value)
          )}
        </ReactModal>
      </div>
    );
  }
}

CommandPalette.defaultProps = {
  hotKeys: "command+shift+p",
  maxDisplayed: 7,
  options: {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    includeMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 1,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "section"]
  },
  closeOnSelect: false
};

CommandPalette.propTypes = {
  /** commands appears in the command palette. For each command in the array the object
  must have a _name_ and a _command_. The _name_ is a user friendly string that will
  be display to the user. The command is a function that will be executed when the
  user clicks or presses the enter key. */
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
        `Invalid prop ${propName} supplied to ${componentName}
         Cannot be greater than 500.`
      );
    }
    return null;
  },

  /** hotKeys a string that contains a keyboard shortcut for opening/closing the palette.
  Defaults to "_cmd */
  hotKeys: PropTypes.string,

  /** options controls how fuzzy search is configured see [fusejs options]
  (http://fusejs.io/) */
  options: PropTypes.object,

  /** open a boolean, when set to true it forces the command palette to be displayed.
  Defaults to "false". */
  open: PropTypes.bool,

  /** trigger a string or a React.ComponentType that opens the command palette when
  clicked. If a custom trigger is not set, then by default a button will be used. If a
  custom component or string is provided then it will automatically be wrapped inside
  an accessible div which will allow it be keyboard accessible, clickable and focusable
  for assistive technologies. */
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** spinner a string or a React.ComponentType that is displayed when the user selects
  an item. If a custom spinner is not set then the default spinner will be used. If
  custom component or string is provided then it will automatically be wrapped inside
  a div with a _role="status" attribute. If a component is provided then it will be be
  wrapped in a div that also contains a sibling node with a div contain "Loading..."
  visible only to screen readers. */
  spinner: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** closeOnSelect a boolean, when true selecting an item will immendiately close the
  command-palette  */
  closeOnSelect: PropTypes.bool
};

export default CommandPalette;
