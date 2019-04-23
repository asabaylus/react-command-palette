const theme = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  highlight: {
    backgroundColor: "yellow"
  },
  content: {
    boxShadow: "rgb(0, 0, 0) 0px 2px 4px 0px",
    position: "absolute",
    top: "80px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, 0)",
    border: "0px none",
    background: "rgb(48, 51, 56)",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "10px",
    minWidth: "600px"
  },
  container: {
    fontFamily: "helvetica, sans-serif",
    fontSize: "12px",
    width: "605px"
  },
  containerOpen: {},
  input: {
    fontSize: "14px",
    border: "2px solid #2196F3",
    borderRadius: "4px",
    width: "590px",
    padding: "6px",
    outline: "none",
    backgroundColor: "#1f2021",
    color: "#ababab",
    caretColor: "#2196F3"
  },
  inputOpen: {},
  inputFocused: {},
  suggestionsContainer: {
    overflow: "hidden",
    borderTop: "1px solid #111",
    borderBottom: "1px solid #111",
    maxHeight: "315px",
    marginTop: "10px"
  },
  suggestionsContainerOpen: {},
  suggestionsList: {
    listStyle: "none",
    padding: "0",
    marginBottom: "0",
    marginTop: "0"
  },
  suggestion: {
    color: "#ababab",
    border: "1px solid #111",
    borderTop: "0px none",
    backgroundColor: "#2c313a",
    padding: "14px 12px"
  },
  suggestionFirst: {
    color: "#ffffff",
    backgroundColor: "#3a3f4b"
  },
  suggestionHighlighted: {
    color: "#ffffff",
    backgroundColor: "#3a3f4b"
  },
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {}
};

export default theme;
