# suduku——数独
>javascript数独算法，数独类。数独小游戏
## 项目预览
<a href="https://happy-func.github.io/sudukujs/" title="数独小游戏">数独小游戏</a>
##  数独类
<a href="https://github.com/happy-func/sudukujs/blob/master/js/suduku.ts" title="Suduku.ts">Suduku</a>
### 关键方法
>initData
>>初始化数据

>recursionGetResult
>>根据已有参数生成可行解

>verify
>>验证答案是否合法

### 使用用例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>数独</title>
</head>
<body>
 <script src="js/index.js" type="module" rel="script"></script>
</body>
</html>
```
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
import Suduku from './suduku.js';
// 数独初始化数据
let initArr: number[][] = [];
for (let i = 0; i < 9; i++) {
    let innerArr: number[] = [];
    for (let x = 0; x < 9; x++) {
        initArr.push([i, x]);
    }
    initArr.push(innerArr);
}
const suduku = new Suduku();
suduku.initData(initArr);
// 可行解
const list = suduku.recursionGetResult();
```
