import { genOptions, sudokuList } from "./type";
export declare const getAreaQueue: () => number[][];
export declare const getResult: ({ mask, gzip }: genOptions) => sudokuList | string;
export declare const getAreaPosition: (position: number[]) => sudokuList;
