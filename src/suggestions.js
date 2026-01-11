import fuzzysort from "fuzzysort";

function getSuggestionHighlights(suggestion) {
  // if there's more than one suggestion, retun an array of
  // highlighted results. ex: ["first *result*", "second *result*"]
  if (Array.isArray(suggestion) && suggestion.length >= 2) {
    return suggestion.map((result) => result?.highlight?.('<b>', '</b>') || null);
  }
  // otherwise return the single suggestion as a string. ex:
  // "only *result*"
  return suggestion[0]?.highlight?.('<b>', '</b>') || null;
}

// format the output to include a code higlight for innerHTML
// and the command to invoke
function formatSuggestions(filteredSuggestions) {
  return filteredSuggestions.map((suggestion) => {
    const opts = {
      name: suggestion.obj.name,
      command: suggestion.obj.command,
      highlight: getSuggestionHighlights(suggestion),
    };
    return { ...opts, ...suggestion.obj };
  });
}

function filterFuzzySortSearch(search, filterSearchQuery) {
  // use the filterSearchQuery function prop to process the input before it's sent to fuzzysort
  // ex: strip action keys from input before searching commands, ex:
  // "?something" or ">something" should search "something"
  return filterSearchQuery(search);
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = function (unfilteredSearch, allCommands, options, filterSearchQuery) {
  
  const search = filterFuzzySortSearch(unfilteredSearch, filterSearchQuery);
  
  // TODO: preparing fuzzysort results make them much faster
  // however prepare is expensiveand should only be run when
  // the commands change lodash.once get close to this
  // but the implementation needs to work within the react lifecyle
  // lets come back to this later, ex:
  // once(() => {
  //   allCommands.forEach(s => (s.namePrepared = fuzzysort.prepare(s.name)));
  // });

  // If the user specified an autosuggest term
  // search for close matches
  const suggestionResults = fuzzysort.go(search, allCommands, options);

  // if the user didnt suggest a specific term or there's a search term
  // but no matches were found return all the commands
  if (!search || !suggestionResults.length) {
    return allCommands;
  }

  // Otherwise return the search results
  return formatSuggestions(suggestionResults);
};

export default getSuggestions;
