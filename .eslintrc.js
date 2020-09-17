module.exports = {
  root: true,
  extends: '@react-native-community',
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}],
  },
  "extends": [
    "eslint:recommended", 
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
    "prettier/unicorn",
    "prettier/vue",
    
  ],
  "plugins": [
    "@typescript-eslint",
    "babel",
    "flowtype",
    "react",
    "standard",
    "unicorn",
    "vue"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2017
  },
  "env": {
    "es6": true,
    "node": true
  }

};
