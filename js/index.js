import Suduku from './suduku.js';
const suduku = new Suduku();
const Empty = 15;
function genRandomOTN() {
    return Math.floor(Math.random() * 9) + 1;
}
;
function genGame() {
    let initArr = [];
    for (let i = 0; i < 9; i++) {
        let innerArr = [];
        for (let x = 0; x < 9; x++) {
            initArr.push([i, x]);
        }
        initArr.push(innerArr);
    }
    suduku.initData(initArr);
    let list = suduku.recursionGetResult().reduce((pre, cur) => {
        const arr = cur.reduce((prev, curV) => {
            prev.push(curV.value);
            return prev;
        }, []);
        pre.push(arr);
        return pre;
    }, []);
    let count = 0, newArr = [];
    try {
        list.forEach(item => {
            let tempArr = [];
            item.forEach(ite => {
                if (count < Empty && genRandomOTN() > 5) {
                    count++;
                    tempArr.push(0);
                }
                else {
                    tempArr.push(ite);
                }
            });
            newArr.push(tempArr);
        });
    }
    catch (e) {
    }
    reSetHtml(newArr);
}
;
function reSetHtml(list) {
}
;
genGame();
