import { genOptions, sudokuList } from "./type";
import LEVEL from "./level";

function getOriginalList() {
  let initArr: sudokuList = [];
  for (let i = 0; i < 9; i++) {
    let innerArr: number[] = [];
    for (let x = 0; x < 9; x++) {
      innerArr.push(0);
    }
    initArr.push(innerArr);
  }
  return initArr;
}

/* 生成数独块队列 */
export const getAreaQueue = (): number[][] => {
  return [[0, 0], [1, 1], [2, 2], [0, 2], [2, 0], [0, 1], [1, 0], [1, 2], [2, 1]];
}

/* 生成1-9随机数 */
function genRandomOTN(level: LEVEL): number {
  return Math.floor(Math.random() * level) + 1;
}

/* 生成数独 */
export const getResult = ({ level, mask }: genOptions): sudokuList => {
  if ([3, 6, 9].indexOf(level) === -1) {
    throw new Error("its not a valid level, use LEVEL.HIGH LEVEL.MIDDLE LEVEL.LOW or 3 6 9");
  }
  let processList = getOriginalList();
  const areaQueue = getAreaQueue();
  for (let i = 0; i < 9; i++) {
    try {
      getAreaData({ position: areaQueue[i], processList });
    } catch (e) {
      processList = getOriginalList();
      return getResult({ level, mask });
    }
  }
  const list = processList.reduce((pre: sudokuList, cur: number[]) => {
    const arr = cur.reduce((prev: number[], curV: number) => {
      prev.push(curV);
      return prev;
    }, [])
    pre.push(arr);
    return pre;
  }, []);
  if (mask) {
    const Empty = Math.ceil(level / 2);
    for (let j = 0; j < level; j++) {
      let count = 0;
      for (let i = 0; i < level; i++) {
        if ((list[j][i] > 0) && (count < Empty) && (genRandomOTN(level) < Empty)) {
          count += 1;
          list[j][i] = 0;
        } else if (list[j][i] === 0) {
          count += 1;
        }
        if ((i + 1) === level && (count < Empty)) {
          --j;
        }
      }
    }
  }
  return list;
};

/* 填充当前区域 */
const getAreaData = ({ position, processList }: { position: number[], processList: sudokuList }): void => {
  let [x, y] = position;
  x *= 3;
  y *= 3;
  const area = getAreaPosition([x, y]);
  area.forEach((poi) => {
    if (!processList[poi[0]][poi[1]]) {
      processList[poi[0]][poi[1]] = getValue({ position: poi, processList });
    }
  })
};

/* 求当前位置9宫格位置数组 */
export const getAreaPosition = (position: number[]): sudokuList => {
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

/* 求值 */
const getValue = ({ position, processList }: { position: number[]; processList: sudokuList }): number => {
  const [x, y] = position;
  let queue = [];
  for (let i = 1; i <= 9; i++) {
    if (checkRow({ x, val: i, processList }) && checkColumn({ y, val: i, processList }) && checkArea({
      position,
      val: i,
      processList
    })) {
      queue.push(i);
    }
  }
  if (!queue.length) {
    throw new Error('不存在有效值');
  }
  let index = Math.floor((Math.random() * queue.length));
  return queue[index];
};

/* 验证行 */
const checkRow = ({ x, val, processList }: { x: number; val: number, processList: sudokuList }): Boolean => {//检查行
  let bool = true;
  for (let i = 0; i < 9; i++) {
    if (processList[x][i] === val) {
      bool = false;
      break;
    }
  }
  return bool;
};
/* 验证列 */
const checkColumn = ({ y, val, processList }: { y: number; val: number; processList: sudokuList }): Boolean => {//检查列
  let bool = true;
  for (let i = 0; i < 9; i++) {
    if (processList[i][y] === val) {
      bool = false;
      break;
    }
  }
  return bool;
};

/* 验证当前格 */
const checkArea = ({ position, val, processList }: { position: number[]; val: number; processList: sudokuList }): Boolean => {
  let bool = true;
  const area = getAreaPosition(position);
  let existArr = [];
  for (let i = 0; i < 9; i++) {
    if (processList[area[i][0]][area[i][1]]) {
      existArr.push(processList[area[i][0]][area[i][1]])
    }
  }
  if (existArr.indexOf(val) != -1) {
    bool = false;
  }
  return bool;
};