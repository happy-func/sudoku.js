import { genOptions, sudokuList } from "./type";
declare const gen: ({ mask, gzip }: genOptions) => sudokuList | string;
export default gen;
