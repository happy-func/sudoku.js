import Suduku from './suduku';
const suduku = new Suduku();
/* 生成游戏棋盘 */
function genGame() {
    let initArr: number[][] = [];
    for (let i = 0; i < 9; i++) {
        let innerArr: number[] = [];
        for (let x = 0; x < 9; x++) {
            initArr.push([i, x]);
        }
        initArr.push(innerArr);
    }
    suduku.initData(initArr);
    const res = suduku.recursionGetResult();
    console.log(res)
}
genGame();
