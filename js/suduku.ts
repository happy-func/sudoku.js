/*
* 数独格式
5 9 6 2 7 1 4 8 3
7 1 8 6 4 3 9 5 2
2 3 4 9 0 5 1 6 7
9 8 7 4 6 2 3 1 5
1 2 3 5 9 7 8 4 6
4 6 0 3 1 8 2 7 9
6 5 9 1 2 4 7 3 8
8 4 2 7 3 6 5 9 1
3 7 1 8 5 9 6 2 4
* */

/*
* 方案
* 优先解决对角线区域 [0, 0], [1, 1], [2, 2]
* */

interface processInnerVal {
    is_set: boolean,
    value: number,
}
//@ts-ignore
export default class Suduku {
    originalList: number[][];
    processList: processInnerVal[][];
    areaQueue: number[][] = [[0, 0], [1, 1], [2, 2], [0, 2], [2, 0], [0, 1], [1, 0], [1, 2], [2, 1]];
    initData = (list: number[][]) => {
        this.originalList = list;
        this.processList = this.genProcessList();
    };
    genProcessList = (): processInnerVal[][] => {
        let processArr = [];
        for (let i = 0; i < 9; i++) {
            let arr: processInnerVal[] = [];
            for (let x = 0; x < 9; x++) {
                if (this.originalList[i][x]) {
                    arr.push({
                        is_set: true,
                        value: this.originalList[i][x],
                    })
                } else {
                    arr.push({
                        is_set: false,
                        value: 0,
                    })
                }
            }
            processArr.push(arr);
        }
        return processArr;
    };
    getAreaData = (position: number[]): void => {
        let [x, y] = position;
        x *= 3;
        y *= 3;
        const area = this.getAreaPosition([x, y]);
        area.forEach(item => {
            if (!this.processList[item[0]][item[1]].is_set) {
                this.processList[item[0]][item[1]].value = this.getValue(item);
            }
        })
    }
    getValue = (position: number[]): number => {
        const [x, y] = position;
        let queue = [];
        for (let i = 1; i <= 9; i++) {
            if (this.checkRow(x, i) && this.checkColumn(y, i) && this.checkArea(position, i)) {
                queue.push(i);
            }
        }
        if (!queue.length) {
            throw (new Error('不存在有效值'));
        }
        let index = Math.floor((Math.random() * queue.length));
        return queue[index];
    };
    getAreaPosition = (position: number[]): number[][] => {
        const [x, y] = position;
        const originX = Math.floor(x / 3) * 3;
        const originY = Math.floor(y / 3) * 3;
        let area = [];
        for (let j = 0; j < 3; j++) {
            for (let x = 0; x < 3; x++) {
                area.push([originX + j, originY + x]);
            }
        }
        return area;
    }
    checkRow = (x: number, val: number): Boolean => {//检查行
        let bool = true;
        for (let i = 0; i < 9; i++) {
            if (this.processList[x][i].value === val) {
                bool = false;
                break;
            }
        }
        return bool;
    };
    checkColumn = (y: number, val: number): Boolean => {//检查列
        let bool = true;
        for (let i = 0; i < 9; i++) {
            if (this.processList[i][y].value === val) {
                bool = false;
                break;
            }
        }
        return bool;
    };
    checkArea = (position: number[], val: number): Boolean => {
        let bool = true;
        const area = this.getAreaPosition(position);
        let existArr = [];
        for (let i = 0; i < 9; i++) {
            if (this.processList[area[i][0]][area[i][1]].value) {
                existArr.push(this.processList[area[i][0]][area[i][1]].value)
            }
        }
        if (existArr.indexOf(val) != -1) {
            bool = false;
        }
        return bool;
    };
    getResult = (): processInnerVal[][] => {
        for (let i = 0; i < 9; i++) {
            try {
                this.getAreaData(this.areaQueue[i]);
            }catch (e) {
                this.processList=this.genProcessList();
                return this.getResult();
            }
        }
        return this.processList;
    };
    recursionGetResult = ():processInnerVal[][] =>{
        try{
            return this.getResult();
        }catch {
            return this.recursionGetResult();
        }
    };
}
