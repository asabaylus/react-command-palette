import * as React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import CommandPalette from "./command-palette";
import commands from "./__mocks__/commands";

const app = document && document.getElementById("app");

if (app) {
  ReactDOM.render(<CommandPalette commands={commands} />, app);
}
