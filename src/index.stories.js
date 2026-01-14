/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import * as React from "react";

// sample component
import sampleHeader from "./examples/sampleHeader";
import sampleAtomCommand from "./examples/sampleAtomCommand";
import sampleChromeCommand from "./examples/sampleChromeCommand";
import sampleSublimeCommand from "./examples/sampleSublimeCommand";

// sample styles
import "./themes/chrome.css";
import "./themes/atom.css";
import "./themes/sublime.css";
import chrome from "./themes/chrome-theme";
import atom from "./themes/atom-theme";
import sublime from "./themes/sublime-theme";

// command palette scripts
import CommandPalette from "./command-palette";
import commands from "./__mocks__/commands";
import lotsOfCommands from "./__mocks__/lots_of_commands";

// add noop command to this big list of command names
function addCommandToArray(c) {
  return c.map(item => ({
    name: item.name,
    command: Function.prototype
  }));
}

function Trigger() {
  return (
    <button type="button">
      Press &ldquo;<kbd>shft+/</kbd>&rdquo; to run a command
    </button>
  );
}

const processedCommands = addCommandToArray(lotsOfCommands);

export default {
  title: "Command Palette",
  component: CommandPalette,
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          minHeight: "764px",
          minWidth: "428px"
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    info: {
      disabled: false,
      inline: false,
      header: false
    }
  }
};

export const WithEverything = {
  render: () => (
    <CommandPalette
      commands={commands}
      renderCommand={sampleAtomCommand}
      header={sampleHeader()}
      maxDisplayed={6}
      trigger={Trigger()}
      hotKeys="shift+/"
      open
    />
  )
};

export const WithATheme = {
  render: (args) => (
    <CommandPalette commands={commands} theme={args.theme} open />
  ),
  argTypes: {
    theme: {
      control: 'select',
      options: ['chrome', 'atom', 'sublime'],
      mapping: {
        chrome: chrome,
        atom: atom,
        sublime: sublime
      }
    }
  },
  args: {
    theme: 'chrome'
  }
};

export const AtomTheme = {
  render: () => (
    <CommandPalette
      commands={commands}
      renderCommand={sampleAtomCommand}
      theme={atom}
      open
    />
  )
};

export const ChromeTheme = {
  render: () => (
    <CommandPalette
      commands={commands}
      renderCommand={sampleChromeCommand}
      theme={chrome}
      open
    />
  )
};

export const SublimeTheme = {
  render: () => (
    <CommandPalette
      commands={commands}
      renderCommand={sampleSublimeCommand}
      theme={sublime}
      placeholder=""
      maxDisplayed={12}
      open
    />
  )
};

export const WithACustomCommand = {
  render: () => <CommandPalette commands={commands} renderCommand={sampleAtomCommand} open />,
  parameters: {
    docs: {
      description: {
        story: 'By default, react-command-palette will render the _suggestion.name_ for each command. However, when passed a custom react component _renderCommand_ will display the command using any template you can imagine. See: https://github.com/asabaylus/react-command-palette/blob/master/examples/sampleAtomCommand.js'
      }
    }
  }
};

export const IsToggledOpen = {
  render: (args) => <CommandPalette commands={commands} open={args.open} />,
  args: {
    open: true
  },
  argTypes: {
    open: { control: 'boolean' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Adding an _open_ prop will force the command palette to be displayed when it mounts. By default command palette will be hidden until the _trigger_ is clicked.'
      }
    }
  }
};

export const WithDefaults = {
  render: (args) => <CommandPalette commands={args.commands} />,
  args: {
    commands: commands
  },
  argTypes: {
    commands: { control: 'object' }
  }
};

export const WithoutAModal = {
  render: () => <CommandPalette commands={commands} display="inline" />
};

export const OnSelect = {
  render: () => (
    <CommandPalette
      open
      commands={commands}
      onSelect={command => {
        alert(`A suggested command was selected: \n
        ${JSON.stringify(command)}
        `);
      }}
    />
  )
};

export const OnChange = {
  render: () => (
    <CommandPalette
      open
      commands={commands}
      onChange={(inputValue, userQuery) => {
        console.log(
          `The input value was changed to: \n
        ${inputValue}\n
        The user typed:\n
        ${userQuery}
        `
        );
      }}
    />
  )
};

export const HighlightFirstSuggestion = {
  render: (args) => (
    <CommandPalette
      commands={commands}
      highlightFirstSuggestion={args.highlightFirstSuggestion}
      open
    />
  ),
  args: {
    highlightFirstSuggestion: true
  },
  argTypes: {
    highlightFirstSuggestion: { control: 'boolean' }
  }
};

export const OnHighlight = {
  render: () => (
    <CommandPalette
      commands={commands}
      onHighlight={command => {
        console.log(`A command was highlighted ${JSON.stringify(command)}`);
      }}
      open
    />
  )
};

export const GetSuggestionValue = {
  render: () => (
    <CommandPalette
      commands={commands}
      getSuggestionValue={() => ">"}
      open
    />
  )
};

export const OnAfterOpen = {
  render: () => (
    <CommandPalette
      commands={commands}
      onAfterOpen={() => {
        alert("The palette was opened.");
      }}
    />
  )
};

export const OnRequestClose = {
  render: () => (
    <CommandPalette
      commands={commands}
      onRequestClose={() => {
        alert("The palette will close.");
      }}
    />
  )
};

export const WithACustomTrigger = {
  render: () => <CommandPalette commands={commands} trigger="Click Me!" />,
  parameters: {
    docs: {
      description: {
        story: 'Use the _trigger_ prop to customize the component that the user will click to open the command palette. The property accepts either a string or a React component. Note that component will be wrapped with a _div_ that behaves like a button. So there is no need to add any events. This component will also be focusable and may be activated via keyboard to maintain accessibility. If a trigger is not specified then a default command palette will be used.'
      }
    }
  }
};

export const DefaultInputValue = {
  render: () => <CommandPalette commands={commands} open defaultInputValue=">" />
};

export const AlwaysRenderCommands = {
  render: (args) => (
    <CommandPalette
      commands={commands}
      open
      alwaysRenderCommands={args.alwaysRenderCommands}
    />
  ),
  args: {
    alwaysRenderCommands: false
  },
  argTypes: {
    alwaysRenderCommands: { control: 'boolean' }
  }
};

export const ShowSpinnerOnSelect = {
  render: (args) => (
    <CommandPalette
      commands={commands}
      open
      showSpinnerOnSelect={args.showSpinnerOnSelect}
    />
  ),
  args: {
    showSpinnerOnSelect: true
  },
  argTypes: {
    showSpinnerOnSelect: { control: 'boolean' }
  }
};

export const WithCustomHotkeys = {
  render: () => <CommandPalette commands={commands} hotKeys="/" />
};

export const WithMultipleCustomHotkeys = {
  render: () => <CommandPalette commands={commands} hotKeys={["/", "command+k"]} />
};

export const WithCustomHeader = {
  render: () => <CommandPalette commands={commands} header={sampleHeader()} open />
};

export const WithCloseOnSelect = {
  render: () => <CommandPalette commands={commands} closeOnSelect open />
};

export const WithResetInputOnOpen = {
  render: () => <CommandPalette commands={commands} open resetInputOnOpen />
};

export const WithCustomPlaceholder = {
  render: (args) => (
    <CommandPalette
      commands={commands}
      placeholder={args.placeholder}
      open
    />
  ),
  args: {
    placeholder: "What do you want?"
  },
  argTypes: {
    placeholder: { control: 'text' }
  }
};

export const WithLotsOfCommands = {
  render: () => <CommandPalette commands={processedCommands} open />
};

export const WithACustomSpinner = {
  render: () => (
    <CommandPalette
      commands={commands}
      spinner={<div style={{ color: "white", textAlign: "center" }}>Waiting...</div>}
      open
    />
  )
};

export const WithMaxDisplayed = {
  render: (args) => (
    <CommandPalette commands={commands} maxDisplayed={args.maxDisplayed} open />
  ),
  args: {
    maxDisplayed: 3
  },
  argTypes: {
    maxDisplayed: {
      control: {
        type: 'range',
        min: 1,
        max: commands.length,
        step: 1
      }
    }
  }
};

export const WithSearchOptions = {
  render: (args) => (
    <CommandPalette
      commands={processedCommands}
      options={args.options}
      maxDisplayed={100}
      open
    />
  ),
  args: {
    options: {
      threshold: -Infinity,
      limit: 100,
      allowTypo: true,
      key: "name",
      keys: ["name"],
      scoreFn: null
    }
  },
  argTypes: {
    options: { control: 'object' }
  }
};

export const FilterSearchQuery = {
  render: () => (
    <CommandPalette
      commands={commands}
      placeholder="Try typing '?st', '>st' or 'st'"
      defaultInputValue=">"
      filterSearchQuery={inputValue => {
        // strip action keys from input before searching commands, ex:
        // "?something" or ">something" should search "something"
        // TODO: pass "/>|\?/g" as a prop
        return inputValue.replace(/^(>|\?)/g, '');
      }}
      open
    />
  )
};

export const WithMultipleHighlights = {
  render: () => {
    const opts = {
      keys: ["name", "category"]
    };
    return (
      <CommandPalette
        commands={commands}
        options={opts}
        maxDisplayed={10}
        renderCommand={sampleChromeCommand}
        theme={chrome}
        open
      />
    );
  }
};

export const WithReactModalParentSelector = {
  render: () => (
    <div id="main">
      <CommandPalette commands={commands} reactModalParentSelector="#main" open />
    </div>
  )
};

export const WithTriggerNull = {
  render: () => (
    <div id="main">
      <CommandPalette commands={commands} reactModalParentSelector="#main" trigger={null} open />
    </div>
  )
};
