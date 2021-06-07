import { sudukuList } from "./type";
import { getAreaPosition, getAreaQueue } from "./utils";

/* 验证解 */
const verify = (list: sudukuList): boolean => {
  let isLegal: boolean = true;
  let rowList = [1, 2, 3, 4, 5, 6, 7, 8, 9], columnList = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    areaList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const areaQueue = getAreaQueue();
  try {
    /* 检查区域 */
    areaQueue.forEach(([x,y])=>{
      const area = getAreaPosition([x, y]);
      area.forEach(position => {
        if (areaList.indexOf(list[position[0]][position[1]]) === -1) {
          throw new Error('区域内容不合法');
        } else {
          areaList.splice(areaList.indexOf(list[position[0]][position[1]]), 1);
        }
      })
      if (areaList.length) {
        throw new Error('区域内容不合法');
      }
      areaList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    })
    list.forEach((item, x) => {
      item.forEach((ite, y) => {
        if (!ite) {
          throw new Error('内容不合法');
        }
        /* 检查行 */
        if (rowList.indexOf(list[x][y]) === -1) {
          throw new Error('行内容不合法');
        } else {
          rowList.splice(rowList.indexOf(list[x][y]), 1);
        }
        /* 检查列 */
        if (columnList.indexOf(list[y][x]) === -1) {
          throw new Error('列内容不合法');
        } else {
          columnList.splice(columnList.indexOf(list[y][x]), 1);
        }
      })
      if (rowList.length) {
        throw new Error('行内容不合法');
      }
      rowList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      if (columnList.length) {
        throw new Error('列内容不合法');
      }
      columnList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    })
  } catch {
    isLegal = false;
  }
  return isLegal;
};

export default verify;
