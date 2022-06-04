'use strict';

const processor = require('./processors/todo-errors');

module.exports = {
  processors: {
    '.js': processor,
    '.ts': processor,
    '.jsx': processor,
    '.tsx': processor,
    'todo-errors': processor,
  },
};
