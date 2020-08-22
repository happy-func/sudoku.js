export default class Suduku {
    constructor() {
        this.areaQueue = [[0, 0], [1, 1], [2, 2], [0, 2], [2, 0], [0, 1], [1, 0], [1, 2], [2, 1]];
        this.initData = (list) => {
            this.originalList = list;
            this.processList = this.genProcessList();
        };
        this.genProcessList = () => {
            let processArr = [];
            for (let i = 0; i < 9; i++) {
                let arr = [];
                for (let x = 0; x < 9; x++) {
                    if (this.originalList[i][x]) {
                        arr.push({
                            is_set: true,
                            value: this.originalList[i][x],
                        });
                    }
                    else {
                        arr.push({
                            is_set: false,
                            value: 0,
                        });
                    }
                }
                processArr.push(arr);
            }
            return processArr;
        };
        this.getAreaData = (position) => {
            let [x, y] = position;
            x *= 3;
            y *= 3;
            const area = this.getAreaPosition([x, y]);
            area.forEach(item => {
                if (!this.processList[item[0]][item[1]].is_set) {
                    this.processList[item[0]][item[1]].value = this.getValue(item);
                }
            });
        };
        this.getValue = (position) => {
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
        this.getAreaPosition = (position) => {
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
        };
        this.checkRow = (x, val) => {
            let bool = true;
            for (let i = 0; i < 9; i++) {
                if (this.processList[x][i].value === val) {
                    bool = false;
                    break;
                }
            }
            return bool;
        };
        this.checkColumn = (y, val) => {
            let bool = true;
            for (let i = 0; i < 9; i++) {
                if (this.processList[i][y].value === val) {
                    bool = false;
                    break;
                }
            }
            return bool;
        };
        this.checkArea = (position, val) => {
            let bool = true;
            const area = this.getAreaPosition(position);
            let existArr = [];
            for (let i = 0; i < 9; i++) {
                if (this.processList[area[i][0]][area[i][1]].value) {
                    existArr.push(this.processList[area[i][0]][area[i][1]].value);
                }
            }
            if (existArr.indexOf(val) != -1) {
                bool = false;
            }
            return bool;
        };
        this.getResult = () => {
            for (let i = 0; i < 9; i++) {
                try {
                    this.getAreaData(this.areaQueue[i]);
                }
                catch (e) {
                    this.processList = this.genProcessList();
                    return this.getResult();
                }
            }
            return this.processList;
        };
        this.recursionGetResult = () => {
            try {
                return this.getResult();
            }
            catch (_a) {
                return this.recursionGetResult();
            }
        };
        this.verify = (list) => {
            this.originalList = list;
            this.genProcessList();
            let isLeagel = true;
            try {
                this.processList.forEach((item, x) => {
                    item.forEach((ite, y) => {
                        if (!ite || !this.checkArea([x, y], ite.value) || !this.checkRow(x, ite.value) || !this.checkColumn(y, ite.value)) {
                            throw (new Error('内容不合法'));
                        }
                    });
                });
            }
            catch (_a) {
                isLeagel = false;
            }
            return isLeagel;
        };
    }
}
