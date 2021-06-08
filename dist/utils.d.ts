import { genOptions, sudokuList } from "./type";
export declare const getAreaQueue: () => number[][];
export declare const getResult: ({ level, mask }: genOptions) => sudokuList;
export declare const getAreaPosition: (position: number[]) => sudokuList;
