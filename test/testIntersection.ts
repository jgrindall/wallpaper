
import {rectContainsPoint, segmentIntersect, convexPolygonContainsPoint,
    convexPolyPolyNonZeroOverlap, convexPolyPolyOverlap, polygonArea} from "../src/PolygonIntersection";
import {Polygon, Rect} from "../src/Types";
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

    const int1 = segmentIntersect([0, 0], [1, 0], [0, -0.5], [0, 0.5]);
    expect(int1.p).to.be.equalTo([0, 0]);
    expect(int1.t0).to.equal(0);
    expect(int1.t1).to.equal(0.5);

});

describe('test polygonArea',() => {
    const poly1:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    expect(polygonArea(poly1)).to.equal(1);

    const poly2:Polygon = [
        [0, 0],
        [0, 10],
        [10, 10],
        [20, 5],
        [10, 0]
    ];
    expect(polygonArea(poly2)).to.equal(150);

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

describe('test convexPolyPolyNonZeroOverlap',() => {
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

    const poly1:Polygon = [
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 1]
    ];

    const poly2:Polygon = [
        [0.5, 0.4],
        [0.5, 0.6],
        [1.5, 0.6],
        [1.5, 0.4]
    ];

    const poly3:Polygon = [
        [0.5, 0.5],
        [0.5, 1.5],
        [1.5, 1.5],
        [1.5, 0.5]
    ];

    const poly4:Polygon = [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 1]
    ];

    let a = 0.001;
    const poly5:Polygon = [
        [1 + a, 1 + a],
        [1 + a, 2 + a],
        [2 + a, 2 + a],
        [2 + a,  + a]
    ];

    a = -0.001;
    const poly6:Polygon = [
        [1 + a, 1 + a],
        [1 + a, 2 + a],
        [2 + a, 2 + a],
        [2 + a, 1 + a]
    ];

    const overlap0 = (convexPolyPolyOverlap(container, poly0));
    const overlap1 = (convexPolyPolyOverlap(container, poly1));
    const overlap2 = (convexPolyPolyOverlap(container, poly2));
    const overlap3 = (convexPolyPolyOverlap(container, poly3));
    const overlap4 = (convexPolyPolyOverlap(container, poly4));
    const overlap5 = (convexPolyPolyOverlap(container, poly5));
    const overlap6 = (convexPolyPolyOverlap(container, poly6));

    //TODO - add tests here

    expect(convexPolyPolyNonZeroOverlap(container, poly0)).to.equal(true);
    expect(convexPolyPolyNonZeroOverlap(container, poly1)).to.equal(false);
    expect(convexPolyPolyNonZeroOverlap(container, poly2)).to.equal(true);
    expect(convexPolyPolyNonZeroOverlap(container, poly3)).to.equal(true);
    expect(convexPolyPolyNonZeroOverlap(container, poly4)).to.equal(false);
    expect(convexPolyPolyNonZeroOverlap(container, poly5)).to.equal(false);
    expect(convexPolyPolyNonZeroOverlap(container, poly6)).to.equal(true);

});
