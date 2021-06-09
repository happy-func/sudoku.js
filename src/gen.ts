import { getResult } from "./utils";
import { genOptions, sudokuList } from "./type";

/*
* 生成数独
* */
const gen = ({ mask = false, gzip = false }: genOptions): sudokuList | string => {
  try {
    return getResult({ mask, gzip });
  } catch {
    return gen({ mask, gzip });
  }
}

export default gen;
