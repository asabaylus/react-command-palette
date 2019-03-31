import fuzzysort from "fuzzysort";
// import once from "lodash.once";

// Teach Autosuggest how to calculate suggestions for any given input value.
export default function getSuggestions(value = "", allCommands, options) {
  // return all commands when user didnt suggest a specific term
  if (!value) {
    return allCommands;
  }

  // TODO: preparing fuzzysort results make them much faster
  // however prepare is expensiveand should only be run when
  // the commands change lodash.once get close to this
  // but the implementation needs to work within the react lifecyle
  // lets come back to this later
  // once(() => {
  //   allCommands.forEach(s => (s.namePrepared = fuzzysort.prepare(s.name)));
  // });

  // If the user specified an autosuggest term
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

  // When the user specified a search term but there we no matches found
  // return all the commands
  if (!formattedSuggestions.length) return allCommands;

  // Otherwise return the search results
  return formattedSuggestions;
}
