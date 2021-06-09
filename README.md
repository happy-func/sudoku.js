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
//index.ts
/* 数独格式 待解答区域填0
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
*/
import { gen } from 'js-sudoku';
// 数独初始化数据
const list = gen({ gzip: false, mask: false });
// gzip 压缩结果'5.9.6.2.7.1.4.8.3,7.1.8.6.4.3.9.5.2   .......'
// mask 是否将数独区域部分数字填写为0，目前是每行5个随机位置的数字覆写为0
```

## 关键方法
>gen
>>生成数独
>
>verify
>>验证答案是否合法
