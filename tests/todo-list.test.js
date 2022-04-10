const assert = require('assert');
const proxyquire = require('proxyquire');

describe('todo-list', function () {
  describe('set', function () {
    it('success', function () {
      let actual;
      const { set } = proxyquire('../lib/utils/todo-list', {
        path: {
          relative: (from, to) => to,
        },
        fs: {
          writeFileSync: (name, content) => {
            actual = content;
          },
        },
      });

      set({
        'src/file-with-error.js': [
          { ruleId: 'rule-id', line: 0, column: 0, endLine: 0 },
          { ruleId: 'rule-id', line: 1, column: 1 },
        ],
        'src/another-file.js': [
          { ruleId: 'rule-id', line: 0, column: 0 },
        ],
      });

      assert.equal(
        actual,
`{
  "src/file-with-error.js": [
    { "ruleId": "rule-id", "line": 0, "column": 0 },
    { "ruleId": "rule-id", "line": 1, "column": 1 }
  ],
  "src/another-file.js": [
    { "ruleId": "rule-id", "line": 0, "column": 0 }
  ]
}
`,
        'invalid todo list format',
      );
    });

    it('empty todo list', function () {
      let actual;
      const { set } = proxyquire('../lib/utils/todo-list', {
        fs: {
          writeFileSync: (name, content) => {
            actual = content;
          },
        },
      });

      set({});

      assert.equal(actual, '{}\n', 'not empty todo list');
    });
  });

  describe('get', function () {
    it('success', function () {
      const { get } = proxyquire('../lib/utils/todo-list', {
        process: {
          cwd: () => '/home/my-project',
        },
        path: {
          join: (...args) => args.join('/'),
        },
        fs: {
          readFileSync: () => JSON.stringify({
            'src/file-with-error.js': [
              { ruleId: 'rule-id', line: 0, column: 0 },
            ],
          }),
        },
      });

      assert.deepStrictEqual(get(), {
        '/home/my-project/src/file-with-error.js': [
          { ruleId: 'rule-id', line: 0, column: 0 },
        ],
      }, 'invalid todo list');
    });

    it('error when read file', function () {
      const { get } = proxyquire('../lib/utils/todo-list', {
        fs: {
          readFileSync: () => {
            throw new Error();
          },
        },
      });

      assert.deepStrictEqual(get(), {}, 'not empty todo list');
    });

    it('empty file', function () {
      const { get } = proxyquire('../lib/utils/todo-list', {
        fs: {
          readFileSync: () => '',
        },
      });

      assert.deepStrictEqual(get(), {}, 'not empty todo list');
    });

    it('invalid file format', function () {
      const { get } = proxyquire('../lib/utils/todo-list', {
        fs: {
          readFileSync: () => 'null',
        },
      });

      assert.deepStrictEqual(get(), {}, 'not empty todo list');
    });
  });
});
