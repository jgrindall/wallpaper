import {Polygon, Rect, Point, RealIntersectionData, IntersectionData} from "./Types";
import {crossNorm, fromAToB, pMinusQ} from "./Vector";
import {sortVerticesInOrder} from "./PolygonUtils";

type IntersectionDataComparator = (a:RealIntersectionData, b:RealIntersectionData) => number;

const compT1:IntersectionDataComparator = (a:RealIntersectionData, b:RealIntersectionData):number => {
    return a.t1 > b.t1 ? 1 : (a.t1 < b.t1 ? -1 : 0);
};

const _eq = (p:Point, q:Point):boolean=>{
    const EPSILON:number = 0.00000001;
    return Math.abs(p[0] - q[0]) < EPSILON && Math.abs(p[1] - q[1]) < EPSILON;
};

const polygonHasVertex = (p:Polygon, pt:Point):boolean=>{
    p.forEach(q=>{
        if(_eq(pt, q)){
            return true;
        }
    });
    return false;
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
    const t1 = crossNorm(p0MinusP1, v0) / cross;
    const t0 = crossNorm(p1MinusP0, v1) / -cross;
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

export const anyPolygonContainsPoint = (polys:Array<Polygon>, p:Point):boolean=>{
    const numPolys:number = polys.length;
    for (let i:number = 0; i < numPolys; i++){
        if(convexPolygonContainsPoint(polys[i], p)){
            return true;
        }
    }
    return false;
};

export const polygonArea = (p:Polygon):number =>{
    let area:number = 0;
    let numPoints:number = p.length;
    if(numPoints <= 1){
        return 0;
    }
    for (let i:number = 0; i < numPoints; i++){
        let j:number = (i + 1) % numPoints;
        area +=  (p[j][0] + p[i][0]) * (p[j][1] - p[i][1]);
    }
    return Math.abs(area/2);
};

export const convexPolyPolyOverlap = (poly1:Polygon, poly2:Polygon):Polygon => {
    const pts:Array<Point> = [];
    const numPoints1:number = poly1.length;
    const addPoint = p =>{
        if(!polygonHasVertex(pts, p)){
            pts.push(p);
        }
    };
    poly1.forEach(p1=>{
        if(convexPolygonContainsPoint(poly2, p1)){
            addPoint(p1);
        }
    });
    poly2.forEach(p2=>{
        if(convexPolygonContainsPoint(poly1, p2)){
            addPoint(p2);
        }
    });
    for(let i:number = 0; i < numPoints1; i++){
        let j:number = (i + 1) % numPoints1;
        const inters:Array<Point> = polygonIntersections(poly2, poly1[i], poly1[j]);
        inters.forEach(p=>addPoint(p));
    }
    return sortVerticesInOrder(pts);
}

export const convexPolyPolyNonZeroOverlap = (poly1:Polygon, poly2:Polygon):boolean => {
    return polygonArea(convexPolyPolyOverlap(poly1, poly2)) > 0;
};
