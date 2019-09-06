const path = require("path");

module.exports = [
  {
    name: "@storybook/preset-typescript",
    options: {
      tsLoaderOptions: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }
    }
  }
];