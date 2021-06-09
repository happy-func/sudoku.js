import { getResult } from "./utils";
import { genOptions, sudokuList } from "./type";

/*
* 生成数独
* */
const gen = (opt: genOptions): sudokuList | string => {
  const payload = { mask: !!opt?.mask, gzip: !!opt?.gzip };
  try {
    return getResult(payload);
  } catch (e) {
    return gen(payload);
  }
}

export default gen;
