# sudoku——数独
>javascript typescript sudoku 数独

## Support
> cmd umd esm

## Size
> 3kb

## Usage

### In Browser
Locally…
```html
<script src="sudoku.js"></script>
```
… or Directly from CDN. In which case you don't even need to install.
```html
<script src="https://unpkg.com/js-sudoku@1.0.8/dist/index.js"></script>
```
```javascript
// generate sudokuList to show
const list = sudoku.gen({ gzip: false, mask: false });
// verify users result
const isValid = sudoku.verify(list);
```
### Install
```shell
npm install js-sudoku
# or
yarn add js-sudoku
```
### es model

```ts
import { gen } from 'js-sudoku';
const list = gen({ gzip: false, mask: false });
```

### node
```typescript
const { gen } = require('js-sudoku');
const list = gen({ gzip: false, mask: false });
```

## type
> sudokuList
```javascript
/* 
* gzip false
[
    [5, 9, 6, 2, 7, 1, 4, 8, 3],
    [7, 1, 8, 6, 4, 3, 9, 5, 2],
    [2, 3, 4, 9, 0, 5, 1, 6, 7],
    [9, 8, 7, 4, 6, 2, 3, 1, 5],
    [1, 2, 3, 5, 9, 7, 8, 4, 6],
    [4, 6, 0, 3, 1, 8, 2, 7, 9],
    [6, 5, 9, 1, 2, 4, 7, 3, 8],
    [8, 4, 2, 7, 3, 6, 5, 9, 1],
    [3, 7, 1, 8, 5, 9, 6, 2, 4]
]
* gzip true
* "6.3.1.2.4.7.5.9.8,8.9.4.6.1.5.3.7.2,7.5.2.8.3.9.6.4.1,3.4.5.7.2.1.8.6.9,1.7.6.9.5.8.4.2.3,9.2.8.3.6.4.7.1.5,2.6.7.5.9.3.1.8.4,5.1.9.4.8.6.2.3.7,4.8.3.1.7.2.9.5.6"
*/
```

## Methods

```typescript
gen: (opt: genOptions) => sudokuList | string;
```

| 参数  | 值类型 | 描述 |
| :--- | :---: | :--- |
| mask | boolean | 是否将结果填充0 |
| gzip | boolean | 是否返回压缩结果 |

```typescript
verify: (list: sudokuList) => boolean;
```

| 参数  | 值类型 | 描述 |
| :--- | :---: | :--- |
| list | sudokuList | none |
