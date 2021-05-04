import React, { Component } from "react";
import CommandPalette from "../command-palette";
import sampleVSCodeCommand from "./sampleVSCodeCommand";
import vscode from "../themes/vscode-theme";

// Demonstrates how to dynamicaly swap out the contents of the
// command palette as the user as the user navigates from one 
// list of commands to another. Users can either type a 
// "navigation" command using a hotkey such as "?" or ">". Or 
// the user can click a special command intended to load a set
// of child commands such as "Files" or "Categories". These actions
// will dynamicaly swap out the set of loded commands.
import categories from "../__mocks__/categories";
import globalCommands from "../__mocks__/global_commands";
import files from "../__mocks__/files";

export class DynamicListCommandPalette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: categories,
      showSpinnerOnSelect: false,
      inputValue: ">",
      placeholder: "",
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  nextCommands(keyword) {
    // filters the list of commands based upon user input (eg: userQuery)
    return (
      [
        {
          userQuery: ["", "Files"],
          placeholder: "Search files by name",
          inputValue: "",
          showSpinnerOnSelect: false,
          commands: files,
        },
        {
          userQuery: ["?", "Commands"],
          placeholder: "",
          inputValue: "?",
          showSpinnerOnSelect: false,
          commands: globalCommands,
        },
        {
          userQuery: [">"],
          placeholder: "",
          inputValue: ">",
          showSpinnerOnSelect: false,
          commands: categories,
        },
      ].find(({ userQuery }) => userQuery.indexOf(keyword) >= 0) || null
    );
  }

  handleClose() {
    // reset the palette when closed
    this.setState(() => this.nextCommands(">"));
  }

  handleChange(value = null, userQuery) {
    // calculate the next set of commands to load
    this.setState(this.nextCommands(userQuery));
  }

  handleSelect(userQuery) {
    const { name } = userQuery;
    const nextState = this.nextCommands(name);
    if (nextState !== null) {
      // calculate the next state matching the users input
      this.setState(() => nextState);
    } else {
      // when there are no child menus to load then display
      // the spinner because the user selected a command to run
      this.setState({ showSpinnerOnSelect: true });
    }
  }

  render() {
    const {inputValue} = this.state;
    return (
      <div>
        <CommandPalette
          commands={this.state.commands}
          renderCommand={sampleVSCodeCommand}
          theme={vscode}
          defaultInputValue={inputValue}
          filterSearchQuery={(inputValue) => {
            // strip action keys "? or >" from input before searching commands, ex:
            // "?something" or ">something" should search using "something" as the query
            return inputValue.replace(/^(>|\?)/g, "");
          }}
          getSuggestionValue={() => inputValue}
          placeholder={this.state.placeholder}
          maxDisplayed={11}
          highlightFirstSuggestion
          showSpinnerOnSelect={this.state.showSpinnerOnSelect}
          resetInputOnOpen
          onRequestClose={this.handleClose}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          open
        />
      </div>
    );
  }
}

export default DynamicListCommandPalette;
