const assert = require('assert');
const proxyquire = require('proxyquire');

describe('update-todo-errors', function () {
  it('it works', async function () {
    let actual;
    const expected = [
      { ruleId: 'rule-1', severity: 2, message: 'error', line: 0, column: 0 },
      { ruleId: 'rule-2', severity: 2, message: 'error', line: 5, column: 5 },
    ];

    await proxyquire('../bin/update-todo-errors', {
      '../lib/utils/todo-list': {
        set: (todo) => {
          actual = todo;
        },
      },
      eslint: {
        ESLint: function () {
          this.lintFiles = () => Promise.resolve([
            {
              filePath: '/src/file.js',
              messages: [
                ...expected,
                { ruleId: null, message: 'fatal error', line: 0, column: 0 },
                { ruleId: 'rule-3', severity: 1, message: 'warning', line: 10, column: 10 },
              ],
            },
            {
              filePath: '/src/perfect-file.js',
              messages: [],
            },
          ]);
        },
      },
    });

    assert.deepStrictEqual(actual, { '/src/file.js': expected });
  });
});
