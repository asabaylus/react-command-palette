/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';

// TODO:
// 1. render modal portals inside each documentation container
// see: reactcommunity.org/react-modal/#custom-parent
// 2. Add position: absolute to #docs-root > .css-1gk97hb

// storybook addons
import { withKnobs, select, object, number, text, boolean } from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';
import { withTests } from '@storybook/addon-jest';
import { checkA11y } from '@storybook/addon-a11y';

// sample component
import sampleHeader from '../examples/sampleHeader';
import sampleAtomCommand from '../examples/sampleAtomCommand';
import sampleChromeCommand from '../examples/sampleChromeCommand';
import sampleSublimeCommand from '../examples/sampleSublimeCommand';

// sample styles
import '../.storybook/styles.css';
import '../themes/chrome.css';
import '../themes/atom.css';
import '../themes/sublime.css';
import chrome from '../themes/chrome-theme';
import atom from '../themes/atom-theme';
import sublime from '../themes/sublime-theme';

// command palette scripts
import CommandPalette from '../src/command-palette';
import commands from '../src/__mocks__/commands';
import lotsOfCommands from '../src/__mocks__/lots_of_commands';
import results from '../.jest-test-results.json';

// add noop command to this big list of command names
function addCommandToArray(c) {
  return c.map(item => ({
    name: item.name,
    command: Function.prototype,
  }));
}

function Trigger() {
  return (
    <button type="button">
      Press &ldquo;<kbd>shft+/</kbd>&rdquo; to run a command
    </button>
  );
}

const styleSheet = (
  <link
    rel="stylesheet"
    type="text/css"
    href="https://raw.githubusercontent.com/asabaylus/react-command-palette/master/themes/atom.css"
  />
);

const proccessedCommands = addCommandToArray(lotsOfCommands);

export default {
  title: 'Command Palette',

  decorators: [
    withOptions({
      name: 'Command Palette',
      addonPanelInRight: false,
    }),
    checkA11y,
    withKnobs,
    story => <div className="storyContainer">{story()}</div>,
    withTests({ results }),
  ],

  parameters: {
    component: CommandPalette,
    jest: ['command-palette.test.js'],
  },
};

export const withEverything = () => (
  <CommandPalette
    commands={commands}
    renderCommand={sampleAtomCommand}
    header={sampleHeader()}
    maxDisplayed={6}
    trigger={Trigger()}
    hotKeys="shift+/"
    open
  />
);

withEverything.story = {
  name: 'with everything',
};

export const withATheme = () => {
  const label = 'theme';
  const options = {
    Chrome: chrome,
    Atom: atom,
    Sublime: sublime,
  };
  const defaultValue = chrome;
  const theme = select(label, options, defaultValue);
  return <CommandPalette commands={commands} theme={theme} open />;
};

withATheme.story = {
  name: 'with a theme',
};

export const atomTheme = () => (
  <CommandPalette commands={commands} renderCommand={sampleAtomCommand} theme={atom} open />
);

atomTheme.story = {
  name: 'atom theme',
};

export const chromeTheme = () => (
  <CommandPalette commands={commands} renderCommand={sampleChromeCommand} theme={chrome} open />
);

chromeTheme.story = {
  name: 'chrome theme',
};

export const sublimeTheme = () => (
  <CommandPalette
    commands={commands}
    renderCommand={sampleSublimeCommand}
    theme={sublime}
    placeholder=""
    maxDisplayed={12}
    open
  />
);

sublimeTheme.story = {
  name: 'sublime theme',

  parameters: {
    backgrounds: [
      {
        name: 'dark',
        value: 'rgba(39, 40, 34)',
        default: true,
      },
    ],
  },
};

export const withACustomCommand = () => (
  <CommandPalette commands={commands} renderCommand={sampleAtomCommand} open />
);

withACustomCommand.story = {
  name: 'with a custom command',

  parameters: {
    notes: `By default, react-command-palette will render the _suggestion.name_ for each command.  However, when passed a custom react component _renderCommand_ will display the command using any template you can imageine. See: https://github.com/asabaylus/react-command-palette/blob/master/examples/sampleAtomCommand.js`,
  },
};

export const isToggledOpen = () => <CommandPalette commands={commands} open />;

isToggledOpen.story = {
  name: 'is toggled open',

  parameters: {
    notes: `Adding an _open_ prop will force the command palette to be displayed 
        when it mounts. By default command palette will be hidden until the _trigger_
        is cliked.`,
  },
};

export const withDefaults = () => {
  // Knobs Addon for Commands object
  const commandsInput = object('Commands', commands);
  return <CommandPalette commands={commandsInput} />;
};

withDefaults.story = {
  name: 'with defaults',
};

export const withoutAModal = () => <CommandPalette commands={commands} display="inline" />;

withoutAModal.story = {
  name: 'without a modal',
};

export const onAfterOpenStory = () => (
  <CommandPalette
    commands={commands}
    onAfterOpen={() => {
      alert('The palette was opened.');
    }}
  />
);

onAfterOpenStory.story = {
  name: 'onAfterOpen',
};

export const onRequestCloseStory = () => (
  <CommandPalette
    commands={commands}
    onRequestClose={() => {
      alert('The palette will close.');
    }}
  />
);

onRequestCloseStory.story = {
  name: 'onRequestClose',
};

export const withACustomTrigger = () => <CommandPalette commands={commands} trigger="Click Me!" />;

withACustomTrigger.story = {
  name: 'with a custom trigger',

  parameters: {
    notes: `Use the _trigger_ prop to customize the component that the user 
      will click to open the command palette. The property accepts either a
      string or a React component. Note that component will be wrapped with a 
      _div_ that behaves like a button. So there is no need to add any events.
      This component will also be focusable and may be activated via keyboard
      to maintain accessibility. If a trigger is not specified then the a 
      default command palette will be used.`,
  },
};

export const alwaysRenderCommandsFalse = () => (
  <CommandPalette
    commands={commands}
    open
    alwaysRenderCommands={boolean('alwaysRenderCommands', false)}
  />
);

alwaysRenderCommandsFalse.story = {
  name: 'alwaysRenderCommands false',
};

export const withCustomHotkeys = () => <CommandPalette commands={commands} hotKeys="/" />;

withCustomHotkeys.story = {
  name: 'with custom hotkeys',
};

export const withCustomHeader = () => (
  <CommandPalette commands={commands} header={sampleHeader()} open />
);

withCustomHeader.story = {
  name: 'with custom header',
};

export const withCloseOnSelect = () => <CommandPalette commands={commands} closeOnSelect open />;

withCloseOnSelect.story = {
  name: 'with closeOnSelect',
};

export const withCustomPlaceholder = () => (
  <CommandPalette commands={commands} placeholder={text('placeholder', 'What do you want?')} open />
);

withCustomPlaceholder.story = {
  name: 'with custom placeholder',
};

export const withLotsOfCommands = () => <CommandPalette commands={proccessedCommands} open />;

withLotsOfCommands.story = {
  name: 'with lots of commands',
};

export const withACustomSpinner = () => (
  <CommandPalette
    commands={commands}
    spinner={<div style={{ color: 'white', textAlign: 'center' }}>Waiting...</div>}
    open
  />
);

withACustomSpinner.story = {
  name: 'with a custom spinner',
};

export const withMaxDisplayed = () => {
  const label = 'maxDisplayed';
  const defaultValue = 3;
  const options = {
    range: true,
    min: 1,
    max: commands.length,
    step: 1,
  };
  const maxDisplayed = number(label, defaultValue, options);
  return <CommandPalette commands={commands} maxDisplayed={maxDisplayed} open />;
};

withMaxDisplayed.story = {
  name: 'with max displayed',
};

export const withSearchOptions = () => {
  // Knobs for Search Options Object
  const opts = {
    threshold: -Infinity,
    limit: 100,
    allowTypo: true,
    key: 'name',
    keys: ['name'],
    scoreFn: null,
  };
  const searchOptionsInput = object('Search Options', opts);
  return (
    <CommandPalette
      commands={proccessedCommands}
      options={searchOptionsInput}
      maxDisplayed={100}
      open
    />
  );
};

withSearchOptions.story = {
  name: 'with search options',
};

export const withMultipleHighlights = () => {
  const opts = {
    keys: ['name', 'category'],
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
};

withMultipleHighlights.story = {
  name: 'with multiple highlights',
};

export const withReactModalParentSelector = () => (
  <div id="main">
    <CommandPalette commands={commands} reactModalParentSelector="#main" open />
  </div>
);

withReactModalParentSelector.story = {
  name: 'with reactModalParentSelector',
};
