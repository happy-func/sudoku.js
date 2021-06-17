import Level from "./level";

export type sudokuList = number[][]

export interface genOptions {
  mask?: boolean;
  gzip?: boolean;
  level?: Level;
}
