import {Polygon, Rect, Point, RealIntersectionData, IntersectionData} from "./Types";
import {crossNorm, fromAToB, pMinusQ} from "./Vector";

type IntersectionDataComparator = (a:RealIntersectionData, b:RealIntersectionData) => number;

const compT1:IntersectionDataComparator = (a:RealIntersectionData, b:RealIntersectionData):number => {
    return a.t1 > b.t1 ? 1 : (a.t1 < b.t1 ? -1 : 0);
};

export const rectContainsPoint = (r:Rect, p:Point):boolean=>{
    if (p[0] < r[0][0] || p[0] > r[2][0] || p[1] < r[0][1] || p[1] > r[1][1]) {
        return false;
    }
    return true;
};

export const segmentIntersect = (p0:Point, q0:Point, p1:Point, q1:Point):IntersectionData => {
    const v0 = fromAToB(p0, q0), v1 = fromAToB(p1, q1);
    const cross = crossNorm(v1, v0);
    if(cross === 0){
        // parallel
        return null;
    }
    const p0MinusP1 = pMinusQ(p0, p1);
    const p1MinusP0 = pMinusQ(p1, p0);
    const q0MinusP0 = pMinusQ(q0, p0);
    const t1 = crossNorm(p0MinusP1, v0) / crossNorm(v1, v0);
    const t0 = crossNorm(p1MinusP0, v1) / crossNorm(v0, v1);
    if (t0 >= 0 && t1 >= 0 && t0 <= 1 && t1 <= 1){
        const p:Point = [
            p0[0] + t0*q0MinusP0[0],
            p0[1] + t0*q0MinusP0[1]
        ];
        return {
            p,
            t0,
            t1
        };
    }
    return null;
};

export const polygonIntersections = (poly:Polygon, a:Point, b:Point):Array<Point> => {
    const numPoints:number = poly.length;
    const inters:Array<RealIntersectionData> = [];
    for (let i:number = 0; i < numPoints; i++) {
        let p1:Point = poly[i], p2:Point = poly[(i + 1) % numPoints];
        let inter:IntersectionData = segmentIntersect(p1, p2, a, b);
        if(inter !== null){
            inter = inter as RealIntersectionData;
            inters.push(inter); // we need to order these by inters.t1
        }
    }
    inters.sort(compT1);
    return inters.map( (a:RealIntersectionData) => a.p);
};

export const convexPolygonContainsPoint = (poly:Polygon, p:Point):boolean=>{
    let pos:number = 0;
    let neg:number = 0;
    const numPoints:number = poly.length;
    const x:number = p[0];
    const y:number = p[1];
    for (let i:number = 0; i < numPoints; i++){
        let p1:Point = poly[i], p2:Point = poly[(i + 1) % numPoints];
        if (p1[0] === x && p1[1] === y){
            return true;
        }
        let d = crossNorm(fromAToB(p1, p), fromAToB(p1, p2));
        if (d > 0){
            pos++;
        }
        if (d < 0){
            neg++;
        }
        if (pos >= 1 && neg >= 1){
            return false;
        }
    }
    return true;
};

export const convexPolygonContainsPoly = (container:Polygon, poly:Polygon):boolean=>{
    const numPoints:number = poly.length;
    for (let i:number = 0; i < numPoints; i++){
        if(!convexPolygonContainsPoint(container, poly[i])){
            return false;
        }
    }
    return true;
};
/*
export const polygonContainsPoint = (poly:Polygon, p:Point):boolean=>{
    // http://web.archive.org/web/20110314030147/http://paulbourke.net/geometry/insidepoly/
    const r:Rect = getBoundingRect(poly);
    if (!rectContainsPoint(r, p)) {
        return false;
    }
    let counter:number = 0 ;
    const numPoints:number = poly.length;
    for (let i:number = 0; i < numPoints; i++) {
        let p1:Point = poly[i], p2:Point = poly[(i + 1) % numPoints];
        if (p[1] > Math.min(p1[1], p2[1])) {
            if (p[1] <= Math.max(p1[1], p2[1])) {
                if (p[0] <= Math.max(p1[0], p2[0])) {
                    if (p1[1] != p2[1]) {
                        const xinters:number = (p[1] - p1[1]) * (p2[0] - p1[0])/(p2[1] - p1[1]) + p1[0];
                        if (p1[0] === p2[0] || p[0] <= xinters){
                            counter++;
                        }
                    }
                }
            }
        }
    }
    return (counter % 2 === 1);
    //TODO - check if the point is one of the vertices?
};
*/

export const convexPolyPolyOverlap = (poly1:Polygon, poly2:Polygon):boolean =>{
    const num1 = poly1.length, num2 = poly2.length;
    for (let i = 0; i < num1; i++){
        for (let j = 0; j < num2; j++){
            let p1:Point = poly1[i], p2:Point = poly1[(i + 1) % num1];
            let p3:Point = poly2[j], p4:Point = poly2[(j + 1) % num2];
            if (segmentIntersect(p1, p2, p3, p4)){
                return true;
            }
        }
    }
    if (convexPolygonContainsPoint(poly1, poly2[0]) || convexPolygonContainsPoint(poly2, poly1[0])){
        return true;
    }
    return false;
};
