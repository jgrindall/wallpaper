import {Point} from "./Types";

export type PointComparator = (a:Point, b:Point) => number;

export const compX:PointComparator = (a:Point, b:Point):number => {
    return a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0);
};

export const compY:PointComparator = (a:Point, b:Point):number => {
    return a[1] > b[1] ? 1 : (a[1] < b[1] ? -1 : 0);
};
