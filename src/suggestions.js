import fuzzysort from "fuzzysort";

function getSuggestionHighlights(suggestion) {
  // fuzzysort returns different structures based on options:
  // - With 'key' (singular): Returns Result objects directly
  // - With 'keys' (plural): Returns KeysResult array-like objects

  // Check if suggestion is a Result object (has target property and highlight method)
  if (suggestion && suggestion.highlight && typeof suggestion.highlight === 'function') {
    // Single key result: suggestion is a Result object
    const highlighted = suggestion.highlight('<b>', '</b>');
    return highlighted || null;
  }

  // Check if this is a KeysResult (array-like with multiple results)
  if (suggestion && typeof suggestion.length === 'number' && suggestion.length > 0) {
    if (suggestion.length >= 2) {
      // Multiple keys: return array of highlights
      return Array.from({ length: suggestion.length }).map((_, i) => {
        const result = suggestion[i];
        if (!result || !result.highlight) return null;
        const highlighted = result.highlight('<b>', '</b>');
        return highlighted || null;
      });
    } else {
      // Single key in keys array: get the first result
      const result = suggestion[0];
      if (!result || !result.highlight) return null;
      const highlighted = result.highlight('<b>', '</b>');
      return highlighted || null;
    }
  }

  /* istanbul ignore next: Defensive fallback - fuzzysort always returns Result or KeysResult objects per its API contract */
  return null;
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

  // Clean up options: if keys (plural) is set with multiple keys, remove key (singular)
  // fuzzysort prioritizes 'key' over 'keys', but we want 'keys' to work when specified
  const cleanedOptions = { ...options };
  if (cleanedOptions.keys && Array.isArray(cleanedOptions.keys) && cleanedOptions.keys.length > 1) {
    delete cleanedOptions.key;
  }

  // If the user specified an autosuggest term
  // search for close matches
  const suggestionResults = fuzzysort.go(search, allCommands, cleanedOptions);

  // if the user didnt suggest a specific term or there's a search term
  // but no matches were found return all the commands
  if (!search || !suggestionResults.length) {
    return allCommands;
  }

  // Otherwise return the search results
  return formatSuggestions(suggestionResults);
};

export default getSuggestions;
