import { sudokuList } from "./type";
import { getAreaPosition, getAreaQueue } from "./utils";

/* verification the answer */
const verify = (list: sudokuList): boolean => {
  let isLegal: boolean = true;
  let rowList = [1, 2, 3, 4, 5, 6, 7, 8, 9], columnList = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    areaList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const areaQueue = getAreaQueue();
  try {
    /* area check */
    areaQueue.forEach(([x,y])=>{
      const area = getAreaPosition([x, y]);
      area.forEach(position => {
        if (areaList.indexOf(list[position[0]][position[1]]) === -1) {
          throw new Error(`area value it's not valid`);
        } else {
          areaList.splice(areaList.indexOf(list[position[0]][position[1]]), 1);
        }
      })
      if (areaList.length) {
        throw new Error(`area value it's not valid`);
      }
      areaList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    })
    list.forEach((item, x) => {
      item.forEach((ite, y) => {
        if (!ite) {
          throw new Error(`value it's not valid`);
        }
        /* row check */
        if (rowList.indexOf(list[x][y]) === -1) {
          throw new Error(`row value it's not valid`);
        } else {
          rowList.splice(rowList.indexOf(list[x][y]), 1);
        }
        /* column check */
        if (columnList.indexOf(list[y][x]) === -1) {
          throw new Error(`column value it's not valid`);
        } else {
          columnList.splice(columnList.indexOf(list[y][x]), 1);
        }
      })
      if (rowList.length) {
        throw new Error(`row value it's not valid`);
      }
      rowList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      if (columnList.length) {
        throw new Error(`column value it's not valid`);
      }
      columnList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    })
  } catch {
    isLegal = false;
  }
  return isLegal;
};

export default verify;
