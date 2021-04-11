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
             inputValue: ">",
             placeholder: ""
           };

           this.handleClose = this.handleClose.bind(this);
           this.handleChange = this.handleChange.bind(this);
           this.handleSelect = this.handleSelect.bind(this);
         }

        getFirstCommandFromUserQuery(userQuery) {
          return [{
            userQuery: "",
            showSpinnerOnSelect: false,
            placeholder: "Search files by name",
            commands: files
          }, {
            userQuery: "?",
            showSpinnerOnSelect: false,
            placeholder: "",
            inputValue: "?",
            commands: globalCommands
          }, {
            userQuery: ">",
            showSpinnerOnSelect: false,
            placeholder: "",
            inputValue: ">",
            commands: categories
          }, {
            userQuery: "Files",
            showSpinnerOnSelect: false,
            placeholder: "Search files by name",
            inputValue: "",
            commands: files
          }, {
            userQuery: "Commands",
            showSpinnerOnSelect: false,
            placeholder: "",
            inputValue: "?",
            commands: globalCommands
          }].filter(command => command.userQuery === userQuery)[0];
         }

         handleClose() {
            this.setState({
              showSpinnerOnSelect: false,
              placeholder: "",
              inputValue: ">",
              commands: categories
            });
         }

         handleChange(value = null, userQuery) {
            // When a user types an "action" key like "?, :, >, #" 
            //  of commands is loaded in the command palette
            const nextCommands = this.getFirstCommandFromUserQuery(userQuery);
            this.setState(nextCommands);
         }

         handleSelect(userQuery) { 
            // when selecting a non-action command show the spinner, 
            // otherwise update the default input value to an 'action' command
            const { name } = userQuery;
            if (
              userQuery !== "?" ||
              userQuery !== ">" ||
              userQuery !== ""
              ) {
              this.setState({ showSpinnerOnSelect: true });
            }          
            const nextCommands = this.getFirstCommandFromUserQuery(name);
            this.setState(nextCommands);
         }
         
         render() {
           return (
             <div>
               <CommandPalette
                 commands={this.state.commands}
                 renderCommand={sampleVSCodeCommand}
                 theme={vscode}
                 defaultInputValue={this.state.inputValue}
                 filterSearchQuery={ inputValue => {
                   // strip action keys "? or >" from input before searching commands, ex:
                   // "?something" or ">something" should search using "something" as the query
                   return inputValue.replace(/^(>|\?)/g, '');
                  }}
                  getSuggestionValue={() => this.state.inputValue}
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

export default DynamicListCommandPalette
