#!/usr/bin/env node
'use strict';

const process = require('process');
const { ESLint } = require('eslint');

const { set } = require('../lib/utils/todo-list');

(async function main() {
  set({});

  const eslint = new ESLint();
  const lintResult = await eslint.lintFiles('.');

  const todoList = lintResult.reduce((result, { filePath, messages }) => {
    const errors = messages.filter(({ ruleId, severity }) => ruleId !== null && severity === 2);
    if (errors.length) {
      result[filePath] = errors;
    }

    return result;
  }, {});

  set(todoList);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
