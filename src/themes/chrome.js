const theme = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  highlight: {
    backgroundColor: "yellow"
  },
  content: {
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px",
    position: "absolute",
    top: "80px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, 0)",
    border: "0px none",
    background: "rgb(255, 255, 255)",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "0px",
    outline: "none",
    padding: "0px",
    minWidth: "600px"
  },
  container: {
    fontFamily: "helvetica, sans-serif",
    fontSize: "12px",
    width: "605px"
  },
  containerOpen: {},
  input: {
    fontSize: "12px",
    border: "0 none",
    borderBottom: "2px solid rgb(200, 200, 200)",
    borderRadius: "0px",
    width: "600px",
    padding: "10px 4px",
    outline: "none",
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(100, 100, 100)",
    caretColor: "rgb(60, 60, 60)"
  },
  inputOpen: {},
  inputFocused: {},
  suggestionsContainer: {
    overflow: "hidden",
    borderTop: "0px none",
    borderBottom: "0px none",
    maxHeight: "315px",
    marginTop: "0px"
  },
  suggestionsContainerOpen: {},
  suggestionsList: {
    listStyle: "none",
    padding: "0",
    marginBottom: "0",
    marginTop: "0"
  },
  suggestion: {
    color: "rgb(60, 60, 60)",
    border: "0 none",
    borderTop: "0px none",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "6px 4px"
  },
  suggestionFirst: {
    color: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255, 255, 255)"
  },
  suggestionHighlighted: {
    color: "#3a3f4b",
    backgroundColor: "rgb(240, 240, 240)"
  },
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {}
};

export default theme;
