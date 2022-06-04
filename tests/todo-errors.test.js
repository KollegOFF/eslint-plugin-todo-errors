const assert = require('assert');
const proxyquire = require('proxyquire');

describe('todo-errors', function () {
  it('some errors in todo', function () {
    const processor = proxyquire('../lib/processors/todo-errors', {
      '../utils/todo-list': {
        get: () => ({
          'src/file.js': [
            { ruleId: 'rule-1', line: 0, column: 0 },
            { ruleId: 'rule-2', line: 5, column: 10 },
          ],
        }),
      },
    });

    const expected = [
      { ruleId: 'rule-2', severity: 2, message: 'error', line: 1, column: 1 },
    ];

    const actual = processor.postprocess([[
      ...expected,
      { ruleId: 'rule-1', severity: 2, message: 'error', line: 0, column: 0 },
      { ruleId: 'rule-2', severity: 2, message: 'error', line: 5, column: 10 },
    ]], 'src/file.js');

    assert.deepStrictEqual(actual, expected);
  });

  it('all errors in todo', function () {
    const processor = proxyquire('../lib/processors/todo-errors', {
      '../utils/todo-list': {
        get: () => ({
          'src/file.js': [
            { ruleId: 'rule-1', line: 0, column: 0 },
            { ruleId: 'rule-2', line: 1, column: 1 },
            { ruleId: 'rule-2', line: 5, column: 10 },
          ],
        }),
      },
    });

    const expected = [];

    const actual = processor.postprocess([[
      { ruleId: 'rule-1', severity: 2, message: 'error', line: 0, column: 0 },
      { ruleId: 'rule-2', severity: 2, message: 'error', line: 1, column: 1 },
      { ruleId: 'rule-2', severity: 2, message: 'error', line: 5, column: 10 },
    ]], 'src/file.js');

    assert.deepStrictEqual(actual, expected);
  });

  it('no errors no todos', function () {
    const processor = proxyquire('../lib/processors/todo-errors', {
      '../utils/todo-list': {
        get: () => ({}),
      },
    });

    const expected = [];

    const actual = processor.postprocess([expected], 'src/file.js');

    assert.deepStrictEqual(actual, expected);
  });

  it('no errors in todos', function () {
    const processor = proxyquire('../lib/processors/todo-errors', {
      '../utils/todo-list': {
        get: () => ({
          'src/file.js': [
            { ruleId: 'rule-1', line: 10, column: 5 },
            { ruleId: 'rule-2', line: 0, column: 0 },
          ],
        }),
      },
    });

    const expected = [
      { ruleId: 'rule-1', severity: 2, message: 'error', line: 0, column: 0 },
      { ruleId: 'rule-2', severity: 2, message: 'error', line: 1, column: 1 },
      { ruleId: 'rule-3', severity: 1, message: 'warning', line: 5, column: 10 },
    ];

    const actual = processor.postprocess([expected], 'src/file.js');

    assert.deepStrictEqual(actual, expected);
  });
});
