# Angular 11 + Tailwind CSS Starter kit

A base project for Angular applications. Scalable folder architecture, TailwindCSS, Husky and more features.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![https://user-images.githubusercontent.com/77569116/106332633-7223fc00-6287-11eb-944b-7685ba9af281.gif](https://user-images.githubusercontent.com/77569116/106332633-7223fc00-6287-11eb-944b-7685ba9af281.gif)

## Features

- [Commitizen-friendly](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly) repo
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) generation
- [Sass](https://sass-lang.com/guide) (CSS preprocessor) with global [theme variables](src/themes/theme-variables.scss)
- [Tailwind CSS 1.9.6](https://tailwindcss.com/docs/)
- [Web Components](https://developer.mozilla.org/es/docs/Web/Web_Components) support
- Pre commit hooks with [Husky](https://github.com/typicode/husky) (lint before commit and test before push)
- IE11+ support
- [Typescript 4.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html)
- Linting with [TSLint](https://palantir.github.io/tslint/) & [Prettier 2.2](https://prettier.io/docs/en/index.html)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [RxJS 6](https://github.com/ReactiveX/RxJS)
- Scalable folder architecture
- Clean imports with [Typescript Path Aliases](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [SCAM](https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b) approach
- Dynamic (JSON powered) forms with [Formly](https://formly.dev/)
- Date utilities with [date-fns](https://date-fns.org/)
- prototyping and mocking back-end with [json-server](https://github.com/typicode/json-server) and [faker.js](https://github.com/Marak/Faker.js)

## NPM scripts

| Script                                                              | Description                                                   |
| ------------------------------------------------------------------- | ------------------------------------------------------------- |
| npm **install**                                                     | Install all dependencies                                      |
| npm **run start**                                                   | Run development server on http://localhost:4200/              |
| npm **run test**                                                    | Run unit tests via Karma without watch mode                   |
| npm **run mock:server**                                             | Run json server on http://localhost:3000/                     |
| npm **run bundle-report**                                           | Generate report of Webpack bundle analyzer inside dist/folder |
| npm **run format:fix**                                              | Autofix code format issues with Prettier                      |
| npm **run format:check**                                            | Find code format issues and list them                         |
| npm **run generate:scam [*component - directive - pipe*] [*path*]** | Generate SCAM on given path                                   |
| npm **run commit**                                                  | Start commitizen commit                                       |
| npm **version [*major minor patch*]**                               | bump project version and generate conventional changelog      |

## Licence

[MIT](https://choosealicense.com/licenses/mit/)

## Credits

README.md and sample page layout inspired by [JohanVillanueva/angular10-starter-kit](https://github.com/JohanVillanueva/angular10-starter-kit) 👍
