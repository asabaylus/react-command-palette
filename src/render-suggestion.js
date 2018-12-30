import * as React from "react";
import parse from "autosuggest-highlight/parse";

// export const RenderSuggestion = (suggestion, { query }) => {
export default suggestion => {
  // whereas fusejs returns matches "m" in
  // "match" as [[0,0]] parts expects it as [[0,1]]. So map over the fuse
  // matches and return the array modified for the format expected by parts
  const matches = (() => {
    if (!Array.isArray(suggestion.matches)) return [];
    if (!suggestion.matches.length) return [];
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
