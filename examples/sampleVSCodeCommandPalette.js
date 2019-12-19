import React, { Component } from 'react'
import CommandPalette from '../src/command-palette';
import sampleVSCodeCommand from './sampleVSCodeCommand';
import vscode from "../themes/vscode-theme";

// sample lists of commands, we can use these to demonstrate how to dynamicaly swap out
// the contents of the command palette as the user navigates from one list to another.
import categories from "../src/__mocks__/categories";
import globalCommands from '../src/__mocks__/global_commands';

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
    
    // The VS code theme has "action" command keys such as "?, :, >, #". When a user
    // types these characters the palette immediately displays the resulting "action"
    // commands. The user need not select or press enter. Simply typing the character
    // trigger the action command.
    handleChange(value) {
        // given the user enters a special character eg "?" or ">"
        // it should dynamicaly load the appropriate list of commands.
        // note that the user will not need to press the enter key or select
        // the special character to trigger this action. Where navigating sublists, eg: "Command >> Start All Data Imports" requires the user to select or press enter to navigate to the next sublist
        if (value === "?" || value == ">") {
        this.setState({
            showSpinnerOnSelect: false,
            commands: (function() {
            if (value === "?") {
                return globalCommands;
            }

            if (value === ">") {
                return categories;
            }

            if (value === "") {
                return [];
            }

            // else {
            //    allCommands.filter(command => {
            //         if (command.category !== value.name) {
            //         return false;
            //         }
            //         return command;
            //     });
            // }
            })()
        });
        }
    }

    // The action command keys also has a plain language command equivalent ex: "> Show
    // and Run Commands". To trigger these actions the user must select the command in
    // the UI by clicking it or pressing enter on the keyboard.
    handleSelect(command) {
        if(command.name === "Show and Run Commands") {
            this.setState({
              showSpinnerOnSelect: false,
              commands: categories
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
              showSpinnerOnSelect={false}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              open
            />
          </div>
        );
        }
    }

export default DynamicListCommandPalette
