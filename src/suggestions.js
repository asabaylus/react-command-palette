import fuzzysort from "fuzzysort";
import once from "lodash.once";

// Teach Autosuggest how to calculate suggestions for any given input value.
export default function getSuggestions(value = "", allCommands, options) {
  // return all commands when user didnt suggest a specific term
  if (!value) {
    return allCommands;
  }

  // If the user specified an autosuggest term
  once(() => {
    console.log("called!");
    allCommands.forEach(s => (s.namePrepared = fuzzysort.prepare(s.name)))
  });

  const filteredSuggestions = fuzzysort.go(value, allCommands, options);
  const formattedSuggestions = filteredSuggestions.map(suggestion => {
    const { target } = suggestion[0];
    return {
      id: 1,
      name: target,
      command: Function.prototype,
      section: "",
      highlight: fuzzysort.highlight(suggestion[0])
    };
  });

  if (!formattedSuggestions.length) return allCommands;
  return formattedSuggestions;
}
