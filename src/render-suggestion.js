import * as React from "react";

export default suggestion => {
  function suggestionHTML() {
    return { __html: suggestion.highlight };
  }

  return (
    <div className="item">
      {suggestion.highlight ? (
        <span dangerouslySetInnerHTML={suggestionHTML()} />
      ) : (
        <span>{suggestion.name}</span>
      )}
    </div>
  );
};
