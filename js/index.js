"use strict";
import Suduku from "./suduku";
var suduku = new Suduku();
/* 生成游戏棋盘 */
function genGame() {
    var initArr = [];
    for (var i = 0; i < 9; i++) {
        var innerArr = [];
        for (var x = 0; x < 9; x++) {
            initArr.push([i, x]);
        }
        initArr.push(innerArr);
    }
    suduku.initData(initArr);
    var res = suduku.recursionGetResult();
    console.log(res);
}
genGame();
