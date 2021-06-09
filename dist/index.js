(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['js-sudoku'] = {}));
}(this, (function (exports) { 'use strict';

  function getOriginalList() {
      let initArr = [];
      for (let i = 0; i < 9; i++) {
          let innerArr = [];
          for (let x = 0; x < 9; x++) {
              innerArr.push(0);
          }
          initArr.push(innerArr);
      }
      return initArr;
  }
  const getAreaQueue = () => {
      return [[0, 0], [1, 1], [0, 1], [2, 2], [0, 2], [2, 0], [1, 0], [1, 2], [2, 1]];
  };
  function genRandomOTN() {
      return Math.floor(Math.random() * 9) + 1;
  }
  const getResult = ({ mask, gzip }) => {
      let processList = getOriginalList();
      const areaQueue = getAreaQueue();
      for (let i = 0; i < 9; i++) {
          try {
              getAreaData({ position: areaQueue[i], processList });
          }
          catch (e) {
              processList = getOriginalList();
              return getResult({ mask });
          }
      }
      const list = processList.reduce((pre, cur) => {
          const arr = cur.reduce((prev, curV) => {
              prev.push(curV);
              return prev;
          }, []);
          pre.push(arr);
          return pre;
      }, []);
      if (mask) {
          const Empty = 5;
          for (let j = 0; j < 9; j++) {
              let count = 0;
              for (let i = 0; i < 9; i++) {
                  if ((list[j][i] > 0) && (count < Empty) && (genRandomOTN() < Empty)) {
                      count += 1;
                      list[j][i] = 0;
                  }
                  else if (list[j][i] === 0) {
                      count += 1;
                  }
                  if ((i + 1) === 9 && (count < Empty)) {
                      --j;
                  }
              }
          }
      }
      if (gzip) {
          return list.map((row) => row.map((val) => val.toString()).join('.')).join(',');
      }
      return list;
  };
  const getAreaData = ({ position, processList }) => {
      let [x, y] = position;
      x *= 3;
      y *= 3;
      const area = getAreaPosition([x, y]);
      area.forEach((poi) => {
          if (!processList[poi[0]][poi[1]]) {
              processList[poi[0]][poi[1]] = getValue({ position: poi, processList });
          }
      });
  };
  const getAreaPosition = (position) => {
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
  const getValue = ({ position, processList }) => {
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
  const checkRow = ({ x, val, processList }) => {
      let bool = true;
      for (let i = 0; i < 9; i++) {
          if (processList[x][i] === val) {
              bool = false;
              break;
          }
      }
      return bool;
  };
  const checkColumn = ({ y, val, processList }) => {
      let bool = true;
      for (let i = 0; i < 9; i++) {
          if (processList[i][y] === val) {
              bool = false;
              break;
          }
      }
      return bool;
  };
  const checkArea = ({ position, val, processList }) => {
      let bool = true;
      const area = getAreaPosition(position);
      let existArr = [];
      for (let i = 0; i < 9; i++) {
          if (processList[area[i][0]][area[i][1]]) {
              existArr.push(processList[area[i][0]][area[i][1]]);
          }
      }
      if (existArr.indexOf(val) != -1) {
          bool = false;
      }
      return bool;
  };

  const gen = ({ mask = false, gzip = false }) => {
      try {
          return getResult({ mask, gzip });
      }
      catch (_a) {
          return gen({ mask, gzip });
      }
  };

  const verify = (list) => {
      let isLegal = true;
      let rowList = [1, 2, 3, 4, 5, 6, 7, 8, 9], columnList = [1, 2, 3, 4, 5, 6, 7, 8, 9], areaList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const areaQueue = getAreaQueue();
      try {
          areaQueue.forEach(([x, y]) => {
              const area = getAreaPosition([x, y]);
              area.forEach(position => {
                  if (areaList.indexOf(list[position[0]][position[1]]) === -1) {
                      throw new Error('区域内容不合法');
                  }
                  else {
                      areaList.splice(areaList.indexOf(list[position[0]][position[1]]), 1);
                  }
              });
              if (areaList.length) {
                  throw new Error('区域内容不合法');
              }
              areaList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          });
          list.forEach((item, x) => {
              item.forEach((ite, y) => {
                  if (!ite) {
                      throw new Error('内容不合法');
                  }
                  if (rowList.indexOf(list[x][y]) === -1) {
                      throw new Error('行内容不合法');
                  }
                  else {
                      rowList.splice(rowList.indexOf(list[x][y]), 1);
                  }
                  if (columnList.indexOf(list[y][x]) === -1) {
                      throw new Error('列内容不合法');
                  }
                  else {
                      columnList.splice(columnList.indexOf(list[y][x]), 1);
                  }
              });
              if (rowList.length) {
                  throw new Error('行内容不合法');
              }
              rowList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
              if (columnList.length) {
                  throw new Error('列内容不合法');
              }
              columnList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          });
      }
      catch (_a) {
          isLegal = false;
      }
      return isLegal;
  };

  exports.gen = gen;
  exports.verify = verify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
