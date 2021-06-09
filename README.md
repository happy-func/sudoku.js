# sudoku——数独
>javascript typescript sudoku 数独算法，数独类。数独小游戏

## 支持性
> cmd umd esm
> 
> package size 3kb

##安装
```shell
npm install js-sudoku
# or
yarn add js-sudoku
```

## 使用用例

```ts
/* 数独格式 mask false
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
import { gen } from 'js-sudoku';
// 数独初始化数据
const list = gen({ gzip: false, mask: false });
// gzip 是否压缩结果
// mask 是否将数独区域部分数字填写为0，目前是每行至少5个随机位置的数字覆写为0
```

## 关键方法
>生成数独
```typescript
gen: (opt: genOptions) => sudokuList | string;
```

| 参数  | 值类型 | 描述 |
| :--- | :---: | :--- |
| mask | bool | 是否将结果填充0 |
| gzip | bool | 是否返回压缩结果 |

>验证答案是否合法
```typescript
verify: (list: sudokuList) => boolean;
```

| 参数  | 值类型 | 描述 |
| :--- | :---: | :--- |
| list | number[][] | 结构同gen({ mask: false }) |
