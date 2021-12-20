module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
    es2021: true,
    node: true,
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
  ],
  rules: {
    "semi": ["error", "never"],
    "react/sort-comp": "off",
    "react/require-default-props": "warn",
    "@typescript-eslint/indent": ["error", 2],
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/display-name": "off"
  },
  settings: {
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}