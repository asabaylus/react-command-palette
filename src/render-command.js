import React from "react";
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

export default RenderCommand;
