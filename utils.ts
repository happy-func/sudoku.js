import { genOptions, sudukuList } from "./type";
import LEVEL from "./level";

function getOriginalList() {
  let initArr: sudukuList = [];
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
export const getResult = ({ level, mask }: genOptions): sudukuList => {
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
  const data = processList.reduce((pre: sudukuList, cur: number[]) => {
    const arr = cur.reduce((prev: number[], curV: number) => {
      prev.push(curV);
      return prev;
    }, [])
    pre.push(arr);
    return pre;
  }, []);
  if (mask) {
    let count = 0;
    const Empty = Math.ceil(level / 2);
    const newArr = [];
    data.forEach(item => {
      let tempArr = [],insideCount = 0;
      for (let i = 0; i < item.length; i++) {
        if (count < Empty && genRandomOTN(level) < Empty) {
          count++;
          insideCount++;
          tempArr.push(0);
        } else {
          tempArr.push(item[i]);
        }
        if ((i + 1) === item.length && tempArr.filter((val) => !val).length < Empty) {
          i--;
        }
      }
      newArr.push(tempArr);
    })
    return newArr;
  }
  return data;
};

/* 填充当前区域 */
const getAreaData = ({ position, processList }: { position: number[], processList: sudukuList }): void => {
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
export const getAreaPosition = (position: number[]): sudukuList => {
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
const getValue = ({ position, processList }: { position: number[]; processList: sudukuList }): number => {
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
const checkRow = ({ x, val, processList }: { x: number; val: number, processList: sudukuList }): Boolean => {//检查行
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
const checkColumn = ({ y, val, processList }: { y: number; val: number; processList: sudukuList }): Boolean => {//检查列
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
const checkArea = ({ position, val, processList }: { position: number[]; val: number; processList: sudukuList }): Boolean => {
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
