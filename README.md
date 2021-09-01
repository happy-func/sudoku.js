# sudoku
![version](https://img.shields.io/github/package-json/v/happy-func/sudoku.js/main)
![typescript](https://img.shields.io/npm/types/js-sudoku)
![umd](https://img.shields.io/static/v1?label=build&message=umd&color=blue)
![esm](https://img.shields.io/static/v1?label=build&message=esm&color=blue)
![cmd](https://img.shields.io/static/v1?label=build&message=cmd&color=blue)
![npm bundle size (version)](https://img.shields.io/bundlephobia/min/js-sudoku/latest)
![GitHub Repo stars](https://img.shields.io/github/stars/happy-func/sudoku.js?style=social)

## Live Demo
[demo](https://happy-func.github.io/sudoku.js/)

## Usage
### In Browser
Locally…
```html
<script src="sudoku.js"></script>
```
… or Directly from CDN. In which case you don't even need to install.
```html
<script src="https://unpkg.com/js-sudoku@latest/dist/index.js"></script>
```
```javascript
// generate sudokuList to show
const list = sudoku.gen({ gzip: false, mask: false, level: sudoku.Level.LOW });
// verify users result
const isValid = sudoku.verify(list);
```
### Install
```shell
npm install js-sudoku
# or
yarn add js-sudoku
```
es model...

```ts
import { gen, Level } from 'js-sudoku';
const list = gen({ gzip: false, mask: false, level: Level.LOW });
```

...node
```typescript
const { gen, Level } = require('js-sudoku');
const list = gen({ gzip: false, mask: false, level: Level.LOW });
```

## type

```typescript
enum Level {
    LOW,
    MIDDLE,
    HIGH
}

type sudokuList = number[][];

interface genOptions {
    mask?: boolean;
    gzip?: boolean;
    level?: Level;
}
```
## Methods

```typescript
gen: (opt: genOptions) => sudokuList | string;
```

| params  | type | description |
| :--- | :--- | :--- |
| mask | boolean | random position fill 0 |
| gzip | boolean | gzip result |
| level | Level | degree of difficulty working when mask |

```typescript
verify: (list: sudokuList) => boolean;
```

| params  | type | description |
| :--- | :--- | :--- |
| list | sudokuList | none |

## Support By
[<img src="https://raw.githubusercontent.com/happy-func/next-official/6f30e1bb4140f195d5176a6ddc61082be8b25505/public/images/jetbrains.png" alt="Jetbrains" title="Jetbrains" width="100" />](https://www.jetbrains.com/)