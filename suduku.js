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
var Suduku = /** @class */ (function () {
    function Suduku(list) {
        var _this = this;
        this.areaQueue = [[0, 0], [1, 1], [2, 2], [0, 2], [2, 0], [0, 1], [1, 0], [1, 2], [2, 1]];
        this.genProcessList = function () {
            var processArr = [];
            for (var i = 0; i < 9; i++) {
                var arr = [];
                for (var x = 0; x < 9; x++) {
                    if (_this.originalList[i][x]) {
                        arr.push({
                            is_set: true,
                            value: _this.originalList[i][x],
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
        this.getAreaData = function (position) {
            var x = position[0], y = position[1];
            x *= 3;
            y *= 3;
            var area = _this.getAreaPosition([x, y]);
            area.forEach(function (item) {
                if (!_this.processList[item[0]][item[1]].is_set) {
                    _this.processList[item[0]][item[1]].value = _this.getValue(item);
                }
            });
        };
        this.getValue = function (position) {
            var x = position[0], y = position[1];
            var queue = [];
            for (var i = 1; i <= 9; i++) {
                if (_this.checkRow(x, i) && _this.checkColumn(y, i) && _this.checkArea(position, i)) {
                    queue.push(i);
                }
            }
            if (!queue.length) {
                throw (new Error('不存在有效值'));
            }
            var index = Math.floor((Math.random() * queue.length));
            return queue[index];
        };
        this.getAreaPosition = function (position) {
            var x = position[0], y = position[1];
            var originX = Math.floor(x / 3) * 3;
            var originY = Math.floor(y / 3) * 3;
            var area = [];
            for (var j = 0; j < 3; j++) {
                for (var x_1 = 0; x_1 < 3; x_1++) {
                    area.push([originX + j, originY + x_1]);
                }
            }
            return area;
        };
        this.checkRow = function (x, val) {
            var bool = true;
            for (var i = 0; i < 9; i++) {
                if (_this.processList[x][i].value === val) {
                    bool = false;
                    break;
                }
            }
            return bool;
        };
        this.checkColumn = function (y, val) {
            var bool = true;
            for (var i = 0; i < 9; i++) {
                if (_this.processList[i][y].value === val) {
                    bool = false;
                    break;
                }
            }
            return bool;
        };
        this.checkArea = function (position, val) {
            var bool = true;
            var area = _this.getAreaPosition(position);
            var existArr = [];
            for (var i = 0; i < 9; i++) {
                if (_this.processList[area[i][0]][area[i][1]].value) {
                    existArr.push(_this.processList[area[i][0]][area[i][1]].value);
                }
            }
            if (existArr.indexOf(val) != -1) {
                bool = false;
            }
            return bool;
        };
        this.getResult = function () {
            for (var i = 0; i < 9; i++) {
                try {
                    _this.getAreaData(_this.areaQueue[i]);
                }
                catch (e) {
                    _this.processList = _this.genProcessList();
                    return _this.getResult();
                }
            }
            return _this.processList;
        };
        this.recursionGetResult = function () {
            try {
                return _this.getResult();
            }
            catch (_a) {
                return _this.recursionGetResult();
            }
        };
        this.originalList = list;
        this.processList = this.genProcessList();
    }
    ;
    return Suduku;
}());
