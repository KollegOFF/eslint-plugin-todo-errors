'use strict';

const postprocess = require('./processors/todo-errors');

module.exports = {
  processors: {
    '.js': { postprocess },
    '.ts': { postprocess },
    '.jsx': { postprocess },
    '.tsx': { postprocess },
    'todo-errors': { postprocess },
  },
};
