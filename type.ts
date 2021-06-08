import LEVEL from "./level";

export type sudokuList = number[][]

export interface genOptions {
  level: LEVEL,
  mask: boolean;
}
