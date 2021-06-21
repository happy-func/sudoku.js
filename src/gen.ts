import {CheckLevel, getResult} from "./utils";
import { genOptions, sudokuList } from "./type";
import Level from "./level";

/*
* 生成数独
* */
const gen = (opt: genOptions): sudokuList | string => {
  const payload = Object.assign({
    mask: true,
    gzip: false,
    level: Level.LOW,
  }, opt);
  if (!CheckLevel(payload.level)) {
    throw new Error("invalid level input");
  }
  try {
    return getResult(payload);
  } catch (e) {
    return gen(payload);
  }
}

export default gen;
