// options are defined in fuzzysort docss, see:
// https://github.com/farzher/fuzzysort

const fuzzysortOptions = {
  threshold: -Infinity, // Don't return matches worse than this (higher is faster)
  limit: 7, // Don't return more results than this (lower is faster)
  allowTypo: true, // Allwos a snigle transpoes (false is faster)
  key: "name", // For when targets are objects (see its example usage)
  keys: ["name"], // For when targets are objects (see its example usage)
  scoreFn: null // For use with `keys` (see its example usage)
};

export default fuzzysortOptions;
