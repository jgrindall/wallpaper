import {PointComparator, compX, compY} from "./PointComparator";
import {Polygon, Rect} from "./Types";
import _ from "lodash";

const _eq = (a:number, b:number):boolean=>{
    const EPSILON:number = 0.00000001;
    return Math.abs(a - b) < EPSILON;
};

export const orderBy = (p: Polygon, fn:PointComparator): Polygon => {
    return [...p].sort(fn);
};

export const orderByX = (p:Polygon):Polygon=>{
    return orderBy(p, compX);
};

export const orderByY = (p:Polygon):Polygon=>{
    return orderBy(p, compY);
};

export const isEquilateralTriangle = (polygon: Polygon): boolean => {
    if (polygon.length !== 3) {
        return false;
    }
    const p0x:number = polygon[0][0];
    const p0y:number = polygon[0][1];
    const p1x:number = polygon[1][0];
    const p1y:number = polygon[1][1];
    const p2x:number = polygon[2][0];
    const p2y:number = polygon[2][1];
    const d01 = (p0x - p1x)*(p0x - p1x) + (p0y - p1y)*(p0y - p1y);
    const d12 = (p1x - p2x)*(p1x - p2x) + (p1y - p2y)*(p1y - p2y);
    const d20 = (p2x - p0x)*(p2x - p0x) + (p2y - p0y)*(p2y - p0y);
    const equi = (_eq(d01, d12) &&  _eq(d12, d20) && _eq(d20, d01) && !_eq(d01, 0) && !_eq(d12, 0) && !_eq(d20, 0));
    if(!equi){
        return false;
    }
    return true;
};

export const getBoundingRect = (p:Polygon):Rect => {
    const orderedByX = orderByX(p);
    const orderedByY = orderByY(p);
    const left:number = _.first(orderedByX)[0];
    const right:number = _.last(orderedByX)[0];
    const bottom:number = _.first(orderedByY)[1];
    const top:number = _.last(orderedByY)[1];
    return [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
    ];
};
