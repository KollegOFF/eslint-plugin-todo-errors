# eslint-plugin-todo-errors

This plugin makes it easy to add `ESLint` or new rules for it to your project.
It creates a list of errors that will be ignored when linting code so that you can clear this list gradually.
This is a more flexible way than [ignoring code](https://eslint.org/docs/user-guide/configuring/ignoring-code), since a new code is checked in existing files.

## :exclamation: Requirements

- [ESLint](https://eslint.org/) `>= 6`
- [Node.js](https://nodejs.org/) `10.x || 12.x || 14.x || >= 16`

## :rocket: Usage

### 1. Install plugin

```shell
npm install --save-dev eslint-plugin-todo-errors
```

Or

```shell
yarn add --dev eslint-plugin-todo-errors
```

### 2. Add plugin to your config

Add `todo-errors` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "todo-errors"
  ]
}
```

### 3. Create todo list for your project

```shell
npx update-todo-errors
```

And don't forget to add a new task `"Fix ESLint errors"` to your todo list.

## :bulb: Credit

This plugin has been inspired by todo functionality in [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint).

## :unlock: License

This project is licensed under the [MIT License](LICENSE.md).
