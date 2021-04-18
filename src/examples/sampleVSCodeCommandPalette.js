import React, { Component } from "react";
import CommandPalette from "../command-palette";
import sampleVSCodeCommand from "./sampleVSCodeCommand";
import vscode from "../themes/vscode-theme";

// sample lists of commands, we can use these to demonstrate how to 
// dynamicaly swap out the contents of the command palette as the user
//  navigates from one list of commands to another.
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
    // accepts user typed input and returns the next state.
    // This state change loads child commands and updates the
    // text in the placeholder
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
    // When a user types an "action" key like "?, :, >, #"
    // of commands is loaded in the command palette
    this.setState(() => this.nextCommands(userQuery));
  }

  handleSelect(userQuery) {
    // calculate the next state for matched user typed input
    const { name } = userQuery;
    const nextState = this.nextCommands(name);
    
    if (nextState !== null) {
      // when selecting an action command load the child menu
      this.setState(() => nextState);
    } else {
      // when selecting a non-action command show the spinner
      // because there are no child menus
      this.setState({ showSpinnerOnSelect: true });
    }
  }

  render() {
    return (
      <div>
        <CommandPalette
          commands={this.state.commands}
          renderCommand={sampleVSCodeCommand}
          theme={vscode}
          defaultInputValue={this.state.inputValue}
          filterSearchQuery={(inputValue) => {
            // strip action keys "? or >" from input before searching commands, ex:
            // "?something" or ">something" should search using "something" as the query
            return inputValue.replace(/^(>|\?)/g, "");
          }}
          getSuggestionValue={() => {
            return this.state.inputValue;
          }}
          placeholder={this.state.placeholder}
          maxDisplayed={11}
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
