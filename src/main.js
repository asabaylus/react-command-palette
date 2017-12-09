/** @jsx */

import * as React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import CommandPalette from "./command-palette";
import commands from "./__mocks__/commands";

const app = document.getElementById("app");
ReactDOM.render(<CommandPalette commands={commands} />, app);
