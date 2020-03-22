import React from "react";
import PropTypes from "prop-types";

// the highlight comes from input enterd by the user however, dangerouslySetInnerHTML
// should be safe because the raw markup originates from fuzzsort
// and is derived from the default, see:
// https://github.com/farzher/fuzzysort#fuzzysorthighlightresult-openb-closeb
const DefaultCommand = function (props) {
  const { suggestion } = props;
  return (
    <div className="item">
      {suggestion.highlight ? (
        <span dangerouslySetInnerHTML={{ __html: suggestion.highlight }} />
      ) : (
        <span>{suggestion.name}</span>
      )}
    </div>
  );
};

DefaultCommand.defaultProps = {
  suggestion: { highlight: null },
};

DefaultCommand.propTypes = {
  /** a single suggestion that appears in the command palette. It must have a _name_ and
   * a _command_. The _name_ is a user friendly string that will be display to the user.
   * The command is a function that will be executed when the user clicks or presses the
   * enter key. */
  suggestion: PropTypes.shape({
    name: PropTypes.string.isRequired,
    highlight: PropTypes.string,
    command: PropTypes.func.isRequired,
  }),
};

export default DefaultCommand;
