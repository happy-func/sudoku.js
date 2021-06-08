import { genOptions, sudokuList } from "./type";
declare const gen: ({ level, mask }: genOptions) => sudokuList;
export default gen;
