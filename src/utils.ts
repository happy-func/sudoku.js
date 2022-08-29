import { genOptions, sudokuList } from "./type";
import Level from "./level";

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
  return [[0, 0], [1, 1], [0, 1], [2, 2], [0, 2], [2, 0], [1, 0], [1, 2], [2, 1]];
}

/* 生成1-9随机数 */
function genRandomOTN(): number {
  return Math.floor(Math.random() * 9) + 1;
}

/* 生成数独 */
export const getResult = (opt: genOptions): sudokuList | string => {
  let processList = getOriginalList();
  const areaQueue = getAreaQueue();
  for (let i = 0; i < 9; i++) {
    try {
      getAreaData({ position: areaQueue[i], processList });
    } catch (e) {
      processList = getOriginalList();
      return getResult(opt);
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
  if (opt.mask) {
    const Empty = opt.level * 9 + 40;
    let count = 0;
    for (let j = 0; j < 9; j++) {
      if (count >= Empty) break;
      for (let i = 0; i < 9; i++) {
        if ((list[j][i] > 0) && (genRandomOTN() < 5)) {
          count += 1;
          list[j][i] = 0;
        }
      }
      if (j === 8 && (count < Empty)) {
        j = 0;
      }
    }
  }
  if (opt.gzip) {
    return list.map((row) => row.map((val) => val.toString()).join('.')).join(',');
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
    throw new Error(`value it's not valid`);
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

/* 检查level是否合法 */
export function CheckLevel(level: Level) {
  const l = Object.values(Level);
  return l.includes(level);
}
