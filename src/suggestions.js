import fuzzysort from "fuzzysort";

// Teach Autosuggest how to calculate suggestions for any given input value.
export default function getSuggestions(value = "", allCommands, options) {
  // return all commands when user didnt suggest a specific term
  if (!value) {
    return allCommands;
  }

  // If the user specified an autosuggest term
  // allCommands.forEach(s => (s.namePrepared = fuzzysort.prepare(s.name)));

  // TODO: add options as last arg to filteredSuggestions
  // console.log(value, options);
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
