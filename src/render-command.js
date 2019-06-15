import React from "react";
import PropTypes from "prop-types";
import DefaultCommand from "./default-command";

const RenderCommand = function(props) {
  const { suggestion, renderCommand } = props;
  if (renderCommand) {
    return <div>{renderCommand(suggestion)}</div>;
  }
  return <DefaultCommand suggestion={suggestion} />;
};

RenderCommand.defaultProps = {
  suggestion: { highlight: null }
};

RenderCommand.propTypes = {
  /** a single suggestion that appears in the command palette. It must have a _name_ and
   * a _command_. The _name_ is a user friendly string that will be display to the user.
   * The command is a function that will be executed when the user clicks or presses the
   * enter key. For single match a _highlight_ string will be passed, for mutliple mathes the _highlight_ should be an array */
  suggestion: PropTypes.shape({
    name: PropTypes.string.isRequired,
    highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    command: PropTypes.func.isRequired
  }),

  /** trigger a string or a React.ComponentType that customises the layout and content of
   * the commands in the command list. For complete documentation see the storybook
   * notes. */
  renderCommand: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ])
};

export default RenderCommand;
