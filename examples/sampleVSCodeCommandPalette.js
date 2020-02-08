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
           // When a user types an "Action" key such as "?, :, >, #" it triggers an
           // context change in the command palette. "Action" keys do not require the user
           // to explicity press "enter" on the keyboard or make a selection on the menu
           // of commands. Simply typing the "action" character will trigger the
           // associated action command.
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

         // The action command keys also has a plain language command equivalent ex: ">"
         // "Show and Run Commands". To trigger these actions the user must select the
         // command in the UI by clicking it or pressing enter on the keyboard.
         handleSelect(command) {
           if (command.name === "Show and Run Commands") {
             this.setState({
               showSpinnerOnSelect: false,
               commands: categories
             });
           } 
           
           // when selecting a non-action command show the spinner
           if (
             command !== "?" ||
             command !== ">" ||
             command !== "" ||
             command.name !== "Show and Run Commands"
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
