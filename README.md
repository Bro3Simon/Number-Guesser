# Why the File `.npmcheckrc`?

Packages that seem to be unused are mentioned in this file so that they are ignored
when running `npm-check` on the command line.

## `@fontsource/roboto` and `@types/react-dom`

These packages are required for [MUI](https://mui.com/material-ui/getting-started/installation/#default-installation).

## `@types/node`

This is for TypeScript intellisense in a node environment.

## `babel-jest` and `jest-environment-jsdom`

These are required for using Jest with Next.

## `husky`

This package is used for a [pre-commit hook](.husky\pre-commit) and a [pre-push hook](.husky\pre-push).
