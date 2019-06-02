module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "mocha": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
  },
  "rules": {
    // "comma-dangle": ["warn", "always-multiline"],
    // "indent": ["warn", 0],
    "linebreak-style": ["warn", "unix"],
    "quotes": ["warn", "single"],
    "semi": 0,
    "no-unused-vars": ["warn"],
    "no-console": 0,
    "no-debugger": 0
  },
};

