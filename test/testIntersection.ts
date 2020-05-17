
import {rectContainsPoint, segmentIntersect, convexPolygonContainsPoint,
    convexPolyPolyNonZeroOverlap, convexPolyPolyOverlap, polygonArea, polygonIntersections, polygonsIntersectSegment} from "../src/PolygonIntersection";
import {Polygon, Rect, Point, Segment} from "../src/Types";
import chai from 'chai';
import chaiArrays from 'chai-arrays';
chai.use(chaiArrays);
let expect = chai.expect;

const _eq = (a:number, b:number):boolean=>{
    const EPSILON:number = 0.00000001;
    return Math.abs(a - b) < EPSILON;
};

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

describe('test polygon intersect 1',() => {
    const p00:Point = [0,0];
    const p01:Point = [0,1];
    const p11:Point = [1,1];
    const p10:Point = [1,0];
    const poly:Polygon = [p00, p01, p11, p10];
    const seg:Segment = [[0.5,0.5], [0.5, 1.5]];
    const inter:Array<Point> = polygonIntersections(poly, seg[0], seg[1]);
    expect(inter.length).to.equal(1);
    const pt = inter[0];
    expect(pt[0]).to.equal(0.5);
    expect(pt[1]).to.equal(1);
});


describe('test polygon intersect 2',() => {
    const p00:Point = [0,0];
    const p01:Point = [0,1];
    const p11:Point = [1,1];
    const p10:Point = [1,0];
    const poly:Polygon = [p00, p01, p11, p10];
    const seg:Segment = [[0,0], [1,1]];
    const inter:Array<Point> = polygonIntersections(poly, seg[0], seg[1]);
    expect(inter.length).to.equal(2);
    const pt0 = inter[0];
    const pt1 = inter[1];
    expect(pt0[0]).to.equal(0);
    expect(pt0[1]).to.equal(0);
    expect(pt1[0]).to.equal(1);
    expect(pt1[1]).to.equal(1);
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



describe('test polygonsIntersectSegment',() => {
    const EPS = 0.00000001;
    const p00:Point = [0,0];
    const p10:Point = [1,0];
    const p20:Point = [2,0];
    const p01:Point = [0,1];
    const p11:Point = [1,1];
    const p21:Point = [2,1];
    const p02:Point = [0,2];
    const p12:Point = [1,2];
    const p22:Point = [2,2];
    const polys:Array<Polygon> = [
        [p00, p01, p11, p10],
        [p01, p02, p12, p11],
        [p10, p11, p21, p20],
        [p11, p12, p22, p21]
    ];
    const seg:Segment = [[0,0], [1.5, 2]];
    const im = polygonsIntersectSegment(polys, seg);
    expect(im.length).to.equal(4);
    expect(im[0].length).to.equal(2);
    expect(im[1].length).to.equal(2);
    expect(im[2]).to.equal(null);
    expect(im[3].length).to.equal(2);

    expect(im[0][0][0]).to.be.closeTo(0, EPS);
    expect(im[0][0][1]).to.be.closeTo(0, EPS);
    expect(im[0][1][0]).to.be.closeTo(0.75, EPS);
    expect(im[0][1][1]).to.be.closeTo(1, EPS);

    expect(im[1][0][0]).to.be.closeTo(0.75, EPS);
    expect(im[1][0][1]).to.be.closeTo(1, EPS);
    expect(im[1][1][0]).to.be.closeTo(1, EPS);
    expect(im[1][1][1]).to.be.closeTo(1.33333333333, EPS);

    expect(im[3][0][0]).to.be.closeTo(1, EPS);
    expect(im[3][0][1]).to.be.closeTo(1.33333333333, EPS);
    expect(im[3][1][0]).to.be.closeTo(1.5, EPS);
    expect(im[3][1][1]).to.be.closeTo(2, EPS);

});
