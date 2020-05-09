
import {rectContainsPoint, segmentIntersect, convexPolygonContainsPoint,
    polygonIntersections, convexPolyPolyOverlap, convexPolygonContainsPoly} from "../src/PolygonIntersection";
import {Polygon, Rect, Point} from "../src/Types";
import chai from 'chai';
let expect = chai.expect;

describe('test rectContainsPoint',() => {

    const sqr:Rect = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    expect(rectContainsPoint(sqr, [0.5, 0.5])).to.equal(true);
    expect(rectContainsPoint(sqr, [0, 0])).to.equal(true);
    expect(rectContainsPoint(sqr, [0, 1])).to.equal(true);
    expect(rectContainsPoint(sqr, [1, 1])).to.equal(true);
    expect(rectContainsPoint(sqr, [1, 0])).to.equal(true);
    expect(rectContainsPoint(sqr, [2, 2])).to.equal(false);
});

describe('test segmentIntersect',() => {
    const int0 = segmentIntersect([0, 0], [1, 0], [0.5, -0.5], [0.5, 0.5]);
    expect(int0.p).to.be.equalTo([0.5, 0]);
    expect(int0.t0).to.equal(0.5);
    expect(int0.t1).to.equal(0.5);
});

describe('test polygonContainsPoint',() => {
    const poly:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    expect(convexPolygonContainsPoint(poly, [0.5, 0.5])).to.equal(true);
    expect(convexPolygonContainsPoint(poly, [0, 0])).to.equal(true);
    expect(convexPolygonContainsPoint(poly, [0, 1])).to.equal(true);
    expect(convexPolygonContainsPoint(poly, [1, 1])).to.equal(true);
    expect(convexPolygonContainsPoint(poly, [1, 0])).to.equal(true);
    expect(convexPolygonContainsPoint(poly, [2, 2])).to.equal(false);
});

describe('test convexPolygonContainsPoly',() => {
    const container:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const poly0:Polygon = [
        [0.4, 0.4],
        [0.4, 0.6],
        [0.6, 0.6],
        [0.6, 0.4]
    ];
    expect(convexPolygonContainsPoly(container, poly0)).to.equal(true);
    expect(convexPolygonContainsPoly(poly0, container)).to.equal(false);
    const poly1:Polygon = [
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 1]
    ];
    expect(convexPolygonContainsPoly(container, poly1)).to.equal(false);
    expect(convexPolygonContainsPoly(poly1, container)).to.equal(false);
    const poly2:Polygon = [
        [0.5, 0.4],
        [0.5, 0.6],
        [1.5, 0.6],
        [1.5, 0.4]
    ];
    expect(convexPolygonContainsPoly(container, poly2)).to.equal(false);
    expect(convexPolygonContainsPoly(poly2, container)).to.equal(false);
});

describe('test polygonIntersections',() => {
    const poly:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const int0:Array<Point> = polygonIntersections(poly, [-10, 0.5], [10, 0.5]);
    expect(int0.length).to.equal(2);
    expect(int0[0][0]).to.equal(0);
    expect(int0[0][1]).to.equal(0.5);
    expect(int0[1][0]).to.equal(1);
    expect(int0[1][1]).to.equal(0.5);

    const int1:Array<Point> = polygonIntersections(poly, [10, 0.5], [-10, 0.5]);
    expect(int1.length).to.equal(2);
    expect(int1[0][0]).to.equal(1);
    expect(int1[0][1]).to.equal(0.5);
    expect(int1[1][0]).to.equal(0);
    expect(int1[1][1]).to.equal(0.5);
});

describe('test polygonIntersections 1',() => {
    const poly0:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const poly1:Polygon = [
        [0.5, 0.5],
        [0.5, 1.5],
        [1.5, 1.5],
        [1.5, 0.5]
    ];
    expect(convexPolyPolyOverlap(poly0, poly1)).to.equal(true);
});

describe('test polygonIntersections 2',() => {
    const poly0:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const poly1:Polygon = [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 1]
    ];
    expect(convexPolyPolyOverlap(poly0, poly1)).to.equal(true);
});

describe('test polygonIntersections 3',() => {
    const poly0:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const a = 0.001;
    const poly1:Polygon = [
        [1 + a, 1 + a],
        [1 + a, 2 + a],
        [2 + a, 2 + a],
        [2 + a,  + a]
    ];
    expect(convexPolyPolyOverlap(poly0, poly1)).to.equal(false);
});

describe('test polygonIntersections 4',() => {
    const poly0:Polygon = [
        [1.4, 2.5],
        [2.5, 3.6],
        [3.6, 2.5],
        [2.5, 1.4]
    ];
    const poly1:Polygon = [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 1]
    ];
    expect(convexPolyPolyOverlap(poly0, poly1)).to.equal(true);
});
