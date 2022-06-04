'use strict';

const { get } = require('../utils/todo-list');

const TODO_LIST = get();

const isSameError = (todoError, error) =>
  todoError.ruleId === error.ruleId &&
  todoError.line === error.line &&
  todoError.column === error.column;

const isTodoError = (todoList, error) =>  todoList.find((todoError) => isSameError(todoError, error)) !== undefined;

module.exports = {
  postprocess: ([messages], fileNmae) => {
    const fileTodoList = TODO_LIST[fileNmae];
    if (Array.isArray(fileTodoList) && fileTodoList.length > 0) {
      return messages.filter((message) => !isTodoError(fileTodoList, message));
    }

    return [...messages];
  },

  supportsAutofix: true,
};
