import React, { Component } from 'react'
import CommandPalette from '../src/command-palette';
import sampleVSCodeCommand from './sampleVSCodeCommand';
import vscode from "../themes/vscode-theme";

// sample lists of commands, we can use these to demonstrate how to dynamicaly swap out
// the contents of the command palette as the user navigates from one list to another.
import categories from "../src/__mocks__/categories";
import globalCommands from '../src/__mocks__/global_commands';
import files from '../src/__mocks__/files';

export class DynamicListCommandPalette extends Component {
         constructor(props) {
           super(props);

           this.state = {
             commands: categories,
             showSpinnerOnSelect: false
           };

           this.handleChange = this.handleChange.bind(this);
           this.handleSelect = this.handleSelect.bind(this);
         }

         handleChange(value) {
          console.log('value: ', value)
          // When a user types an "action" key such as "?, :, >, #" a new list of commands is loaded in the command palette
          if (value === "?" || value === ">" || value === "") {
            this.setState({
              showSpinnerOnSelect: false,
              commands: (() => {
                if (value === "?") {
                  return globalCommands;
                }

                if (value === ">") {
                  return categories;
                }

                if (value === "") {
                  return files;
                }
              })()
            });
          }
         }

         handleSelect(command) { 
           
          alert("Hi Brian!!!");
          // when selecting a non-action command show the spinner
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
                 defaultInputValue=">"
                 placeholder="Type '?' to get help on the actions you can take from here"
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
