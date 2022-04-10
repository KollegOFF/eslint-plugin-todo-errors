"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  plugins: ["todo-errors"],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.test.js"],
      env: { mocha: true },
    },
  ],
};
