import {Point, Matrix, applyToPoints, applyToPoint, fromTriangles} from "transformation-matrix";

type Polygon = Array<Point>;

type Rect = [Point, Point, Point, Point];

type RealIntersectionData = {
    p: Point;
    t0: number;
    t1: number;
};

type IntersectionData = RealIntersectionData | null;

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
    applyToPoint,
    applyToPoints,
    fromTriangles
}
