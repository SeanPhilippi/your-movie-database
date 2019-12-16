module.exports = {
  "parser":"babel-eslint",
  "extends": ["react-app", "prettier"],
  "rules": {
    "arrow-parens": ["error", "as-needed"],
    "no-return-assign": "off",
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "import/newline-after-import": "off",
    "comma-dangle": "off",
    "eol-last": ["error", "never"],
    "no-shadow": "off",
    "consistent-return": "off",
    "react/jsx-filename-extension": [0],
    "import/extensions": "off",
    "template-curly-spacing": ["error", "always"],
    "no-plusplus": "off",
  }
}