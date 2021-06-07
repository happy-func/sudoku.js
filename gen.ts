import LEVEL from "./level";
import { getResult } from "./utils";
import { genOptions, sudukuList } from "./type";

/*
* 生成数独
* */
const gen = ({ level, mask }: genOptions): sudukuList => {
  try {
    return getResult({ level, mask });
  } catch {
    return gen({ level, mask });
  }
}

export default gen;
