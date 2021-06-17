import {CheckLevel, getResult} from "./utils";
import { genOptions, sudokuList } from "./type";
import Level from "./level";

/*
* 生成数独
* */
const gen = (opt: genOptions): sudokuList | string => {
  if (opt?.level && !CheckLevel(opt.level)) {
    throw new Error("invalid level input");
  }
  const payload = { mask: !!opt?.mask, gzip: !!opt?.gzip, level: opt?.level || Level.LOW };
  try {
    return getResult(payload);
  } catch (e) {
    return gen(payload);
  }
}

export default gen;
