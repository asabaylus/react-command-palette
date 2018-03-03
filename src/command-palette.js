import * as React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import parse from "autosuggest-highlight/parse";
import Fuse from "fuse.js";
import Mousetrap from "mousetrap";
import theme from "./theme";
import Spinner from "./spinner";

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

// export const RenderSuggestion = (suggestion, { query }) => {
export const RenderSuggestion = suggestion => {
  // whereas fusejs returns matches "m" in
  // "match" as [[0,0]] parts expects it as [[0,1]]. So map over the fuse
  // matches and return the array modified for the format expected by parts
  const matches = (() => {
    if (
      typeof suggestion.matches === "undefined" ||
      !suggestion.matches.length
    ) {
      return [];
    }

    return suggestion.matches[0].indices.map(item => [item[0], item[1] + 1]);
  })();

  const parts = parse(suggestion.item.name, matches);

  return (
    <div className="item">
      {parts.map((part, index) => {
        const id = `${part.text}_${index}`;
        const style = part.highlight
          ? { fontWeight: "bold", background: "none", color: "#03A9F4" }
          : null;
        return (
          <span style={style} key={id}>
            {part.text}
          </span>
        );
      })}
    </div>
  );
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
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.focusInput = this.focusInput.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    // Use hot key to open command palette
    Mousetrap.bind(this.props.hotKeys, () => {
      this.handleOpenModal();
      // prevent default which opens Chrome dev tools command palatte
      return false;
    });
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
    // const filterOptions = this.props.options;
    const filterOptions = this.props.options;

    // return all commands when user didnt suggest a specific term
    if (!value) {
      return this.allCommands;
    }

    // If the user specified an autosuggest term
    const suggestions = this.allCommands.map(suggestion => suggestion.item);
    const fuse = new Fuse(suggestions, filterOptions);
    const filteredSuggestions = fuse.search(value);
    if (!filteredSuggestions.length) {
      return this.allCommands;
    }
    return filteredSuggestions;
  }

  fetchData() {
    this.allCommands = this.props.commands.map(obj => ({
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
  }

  handleCloseModal() {
    this.setState({
      isLoading: false,
      showModal: false
    });
  }

  handleOpenModal() {
    this.setState(
      {
        showModal: true,
        value: "",
        suggestions: allSuggestions
      },
      () => {
        // use callback to set focus, see: https://goo.gl/hUiG4n
        this.focusInput();
        // FIXME: apply "esc" on the modal instead of input
        // so that pressing esc on loading spinner works too
        Mousetrap(this.commandPaletteInput.input).bind(
          ["esc", this.props.hotKeys],
          () => {
            this.handleCloseModal();
            return false;
          }
        );
      }
    );
  }

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: "Type a command",
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };
    const modalStyles = {
      content: theme.content,
      overlay: theme.overlay
    };
    return (
      <div className="react-command-palette">
        <button className="ui button" onClick={this.handleOpenModal}>
          Command Palette &nbsp;
          <kbd className="ui mini horizontal grey label">
            <span>Keyboard Shortcut</span>⇧⌘P
          </kbd>
        </button>
        <ReactModal
          appElement={document.body}
          style={modalStyles}
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Command Palette"
          closeTimeoutMS={
            1
            /* otherwise the modal is not closed when
            suggestion is selected by pressing Enter */
          }
        >
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <Autosuggest
              ref={input => {
                this.commandPaletteInput = input;
              }}
              suggestions={suggestions}
              highlightFirstSuggestion
              onSuggestionSelected={this.onSuggestionSelected}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={RenderSuggestion}
              inputProps={inputProps}
              alwaysRenderSuggestions
              theme={theme}
            />
          )}
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
  commands: PropTypes.array,
  hotKeys: PropTypes.string,
  options: PropTypes.object
};

export default CommandPalette;
