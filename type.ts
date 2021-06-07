import LEVEL from "./level";

export type sudukuList = number[][]

export interface genOptions {
  level: LEVEL,
  mask: boolean;
}
