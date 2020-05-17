import {Point, Matrix, applyToPoints, applyToPoint, fromTriangles} from "transformation-matrix";

type Segment = [Point, Point];
type SegmentList = Array<Segment>;

type Polygon = Array<Point>;

type Rect = [Point, Point, Point, Point];

type RealIntersectionData = {
    p: Point;
    t0: number;
    t1: number;
};

type RealSegment = [number, number];

type RealSegmentList = Array<RealSegment>;

type IntersectionData = RealIntersectionData | null;

type TValue = {
    t:number;
};

type PolygonTransform = {
    poly0: Polygon;
    poly1: Polygon;
    t: Matrix;
};

export {
    Polygon,
    Matrix,
    Point,
    Rect,
    RealIntersectionData,
    IntersectionData,
    PolygonTransform,
    RealSegment,
    RealSegmentList,
    Segment,
    SegmentList,
    TValue,
    applyToPoint,
    applyToPoints,
    fromTriangles
}
