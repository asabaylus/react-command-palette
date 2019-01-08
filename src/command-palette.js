import * as React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

import take from "lodash.take";
import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";
import Mousetrap from "mousetrap";
import theme from "./theme";
import Spinner from "./spinner";

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

// Use your imagination to define how suggestions are rendered.
//
// The signature is:
//
// function renderSuggestion(suggestion, { query, isHighlighted })
// where:
//
// suggestion - The suggestion to render
// query - Used to highlight the matching string. As user types in the input,
// query will be equal to the trimmed value of the input. Then, if user
// interacts using the Up or Down keys, the input will get the value of the
// highlighted suggestion, but query will remain to be equal to the trimmed
// value of the input prior to the Up and Down interactions.
// isHighlighted - Whether or not the suggestion is highlighted.

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
          this.setState({ isLoading: true }, () => {
            // console.log("Show Spinner", that.state.isLoading);
          });
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
    const { commands } = this.props;
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
    return (
      <Autosuggest
        ref={input => {
          this.commandPaletteInput = input;
        }}
        suggestions={take(suggestions, 7)}
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
    const { trigger } = this.props;

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
          {isLoading ? <Spinner /> : this.renderAutoSuggest(suggestions, value)}
        </ReactModal>
      </div>
    );
  }
}

CommandPalette.defaultProps = {
  hotKeys: "command+shift+p",
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
  }
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

  /** hotKeys a string that contains a keyboard shortcut for opening/closing the palette.
  Defaults to "_cmd */
  hotKeys: PropTypes.string,

  /** options controls how fuzzy search is configured see [fusejs options]
  (http://fusejs.io/) */
  options: PropTypes.object,

  /** open a boolean, when set to true it forces the command palette to be displayed.
  Defaults to "false". */
  open: PropTypes.bool,

  /** trigger a string or a React.ComponentType the opens the command palette when
  clicked. If a custom trigger is not set then by default a button will be used. If a
  custom component or string is provided then it will automatically be wrapped inside
  an accessible div that will allow it be keyboard accessible, clickable and focusable
  for assistive technologies. */
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default CommandPalette;
