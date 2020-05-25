import {PointComparator, compX, compY, getCompAngle} from "./PointComparator";
import {Polygon, Rect, Point} from "./Types";
import * as _ from "lodash";

const _eq = (a:number, b:number):boolean=>{
    const EPSILON:number = 0.00000001;
    return Math.abs(a - b) < EPSILON;
};

export const orderBy = (p: Array<Point>, fn:PointComparator): Array<Point> => {
    return [...p].sort(fn);
};

export const orderByX = (p:Array<Point>):Array<Point>=>{
    return orderBy(p, compX);
};

export const orderByY = (p:Array<Point>):Array<Point>=>{
    return orderBy(p, compY);
};

export const orderByAngle = (p:Array<Point>, centre:Point):Array<Point> => {
    return orderBy(p, getCompAngle(centre));
}

export const wrapArray = <T>(arr:Array<T>, i:number):Array<T> => {
    const r:Array<T> = [];
    const numPoints:number = arr.length;
    for(let j = 0; j < numPoints; j++){
        const indexToPush:number = (i + j) % numPoints;
        r.push(arr[indexToPush]);
    }
    return r;
};

export const getCentreOfMass = (arr:Array<Point>):Point=>{
    let mx = 0;
    let my = 0;
    arr.forEach (p=>{
        mx += p[0];
        my += p[1];
    });
    return [mx/arr.length, my/arr.length];
};

export const getBottomLeftIndex = (arr:Array<Point>):number=>{
    let minX:number = Infinity;
    let minY:number = Infinity;
    let index:number = -1;
    const numPoints:number = arr.length;
    for(let i = 0; i < numPoints; i++){
        const p = arr[i];
        if( (p[0] < minX) || (p[0] === minX && p[1] < minY) ){
            minX = p[0];
            minY = p[1];
            index = i;
        }
    }
    return index;
};

export const sortVerticesInOrder = (arr:Array<Point>):Polygon=>{
    const numPoints:number = arr.length;
    if(numPoints <= 1){
        return arr;
    }
    const sorted:Array<Point> = orderByAngle(arr, getCentreOfMass(arr));
    //make sure we start with the bottomleft
    return wrapArray(sorted, getBottomLeftIndex(sorted));
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
