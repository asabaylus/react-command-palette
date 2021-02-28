import React, { Component } from 'react'
import CommandPalette from '../command-palette';
import sampleVSCodeCommand from './sampleVSCodeCommand';
import vscode from "../themes/vscode-theme";

// sample lists of commands, we can use these to demonstrate how to dynamicaly swap out
// the contents of the command palette as the user navigates from one list to another.
import categories from '../__mocks__/categories';
import globalCommands from '../__mocks__/global_commands';
import files from '../__mocks__/files';

export class DynamicListCommandPalette extends Component {
         constructor(props) {
           super(props);

           this.state = {
             commands: categories,
             showSpinnerOnSelect: false,
             defaultInputValue: ">",
             placeholder: ""
           };

           this.handleChange = this.handleChange.bind(this);
           this.handleSelect = this.handleSelect.bind(this);
         }

         handleChange(value, userQuery) {
          // When a user types an "action" key such as "?, :, >, #" a new list of commands is loaded in the command palette
          if (userQuery === "") {
            this.setState({
              showSpinnerOnSelect: false,
              placeholder: "Search files by name",
              defaultInputValue: value,
              commands: files
            })
          }

          if (userQuery === "?") {
            this.setState({
              showSpinnerOnSelect: false,
              placeholder: "",
              defaultInputValue: "?",
              commands: globalCommands
            })
          }

          if (userQuery === ">") {
            this.setState({
              showSpinnerOnSelect: false,
              placeholder: "",
              defaultInputValue: ">",
              commands: categories
            })
          }
         }

         handleSelect(command) { 
          // when selecting a non-action command show the spinner, 
          // otherwise update the default input value to an 'action' command
          if (
            command !== "?" ||
            command !== ">" ||
            command !== ""
            ) {
              this.setState({
              showSpinnerOnSelect: true
              });
            }
         }

         render() {
           return (
             <div>
               <CommandPalette
                 commands={this.state.commands}
                 renderCommand={sampleVSCodeCommand}
                 theme={vscode}
                 defaultInputValue={this.state.defaultInputValue}
                 filterSearchQuery={ inputValue => {
                    // strip action keys "? or >" from input before searching commands, ex:
                    // "?something" or ">something" should search using "something" as the query
                    return inputValue.replace(/^(>|\?)/g, '');
                  }}
                 getSuggestionValue={() => this.state.defaultInputValue}
                 placeholder={this.state.placeholder}
                 maxDisplayed={11}
                 showSpinnerOnSelect={this.state.showSpinnerOnSelect}
                 onChange={this.handleChange}
                 onSelect={this.handleSelect}
                 resetInputOnClose
                 open
               />
             </div>
           );
         }
       }

export default DynamicListCommandPalette
