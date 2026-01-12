module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [{
    name: '@storybook/addon-docs',
    options: {
      configureJSX: true
    }
  }, "@storybook/addon-links", "@storybook/addon-essentials", "@storybook/preset-create-react-app"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  core: {
    builder: "@storybook/builder-webpack5"
  }
};