'use strict';

const process = require('process');
const path = require('path');
const fs = require('fs');

const TODO_FILE_NAME = '.eslint-todo-errors.json';
const CWD = process.cwd();

const beautifyError = (error) => `    { "ruleId": "${error.ruleId}", "line": ${error.line}, "column": ${error.column} }`;

const beautifyFilePath = (filePath) => path.relative(CWD, filePath).split(path.sep).join(path.posix.sep);

const beautifyTodoList = (errors) => {
  const beautifulTodoList = Object.keys(errors).map((filePath) => {
    const beautifulErrors = errors[filePath]
      .map(beautifyError)
      .join(',\n');

    return `  "${beautifyFilePath(filePath)}": [\n${beautifulErrors}\n  ]`;
  }).join(',\n');

  return `{${beautifulTodoList ? `\n${beautifulTodoList}\n` : ''}}\n`;
};

const set = (errors) => {
  fs.writeFileSync(path.join(CWD, TODO_FILE_NAME), beautifyTodoList(errors));
};

const get = () => {
  let beautifulTodoList;
  try {
    beautifulTodoList = JSON.parse(fs.readFileSync(path.join(CWD, TODO_FILE_NAME)));
    if (!(beautifulTodoList instanceof Object)) {
      throw new Error();
    }
  } catch {
    beautifulTodoList = {};
  }

  return Object.keys(beautifulTodoList).reduce((todoList, relativePath) => {
    todoList[path.join(CWD, relativePath)] = beautifulTodoList[relativePath];

    return todoList;
  }, {});
};

module.exports = { set, get };
