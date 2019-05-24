module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "jest": true,
    "node": true
  },
  "rules": {
    "semi": ["error", "never"],
    "react/sort-comp": "off",
    "react/require-default-props": "warn",
    "@typescript-eslint/explicit-function-return-type": false,
    "@typescript-eslint/indent": ["error", 2],
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  settings: {
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}