/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";

// the highlight comes from input enterd by the user however, dangerouslySetInnerHTML
// should be safe because the raw markup originates from fuzzsort
// and is derived from the default, see:
// https://github.com/farzher/fuzzysort#fuzzysorthighlightresult-openb-closeb
const DefaultCommand = function(props) {
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
  suggestion: { highlight: null }
};

export default DefaultCommand;
