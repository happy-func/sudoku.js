import { getResult } from "./utils";
import { genOptions, sudokuList } from "./type";

/*
* 生成数独
* */
const gen = ({ level, mask }: genOptions): sudokuList => {
  try {
    return getResult({ level, mask });
  } catch {
    return gen({ level, mask });
  }
}

export default gen;
