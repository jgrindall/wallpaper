
import {orderBy, isEquilateralTriangle, getBoundingRect, orderByX, orderByY, getCentreOfMass, sortVerticesInOrder, wrapArray} from "../src/PolygonUtils";
import {compX, compY} from "../src/PointComparator";
import {Polygon, Point} from "../src/Types";
import chai from 'chai';
import chaiArrays from 'chai-arrays';

let expect = chai.expect;
chai.use(chaiArrays);

const RT3 = Math.sqrt(3);
export type OrderByIndexFn = (prev:Array<number>, next:Array<number>) => boolean;

const ind = (i:number): OrderByIndexFn => ((prev:Array<number>, next:Array<number>) => prev[i] <= next[i]);

describe('test wrapArray',() => {
    const a:Array<number> = [5, 6, 7, 8, 9];
    const b:Array<number> = wrapArray(a, 2);
    expect(b[0]).to.equal(7);
    expect(b.length).to.equal(a.length);
    expect(b[4]).to.equal(6);
});

describe('test polygon',() => {

    const sqr:Polygon = [
        [100, 100],
        [200, 300],
        [400, 200],
        [300, 0]
    ];

    it('test order x', () => {
        const arr2X = orderBy(sqr, compX);
        expect(arr2X.length).to.equal(4);
        expect(arr2X[0][0]).to.equal(100);
        expect(arr2X[1][0]).to.equal(200);
        expect(arr2X[2][0]).to.equal(300);
        expect(arr2X[3][0]).to.equal(400);

    });

    it('test order y', () => {
        const arr2Y = orderBy(sqr, compY);

        expect(arr2Y.length).to.equal(4);

        expect(arr2Y[0][1]).to.equal(0);
        expect(arr2Y[1][1]).to.equal(100);
        expect(arr2Y[2][1]).to.equal(200);
        expect(arr2Y[3][1]).to.equal(300);

    });

});

describe('test isEquilateralTriangle',() => {
    it('detects correct', () => {

        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];

        expect(isEquilateralTriangle(p)).to.equal(true);

    });

    it('detects incorrect', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100]
        ];

        expect(isEquilateralTriangle(p)).to.equal(false);

    });

});

describe('test ordering', ()=>{
    const p:Polygon = [
        [0, 50],
        [100, 200],
        [50, 100]
    ];
    const ox = orderByX(p);
    const oy = orderByY(p);
    expect(ox).to.be.sorted(ind(0));
    expect(oy).to.be.sorted(ind(1));
});

describe('test ordering equal coords', ()=>{
    const p:Polygon = [
        [0, 0],
        [0, 100],
        [0, 200],
        [0, 300],
        [100, 300],
        [200, 300],
        [300, 300],
        [300, 200],
        [300, 100],
        [300, 0],
        [200, 0],
        [100, 0]
    ];
    const ox = orderByX(p);
    const oy = orderByY(p);
    expect(ox).to.be.sorted(ind(0));
    expect(oy).to.be.sorted(ind(1));
});

describe('test getBoundingRect',() => {
    const p:Polygon = [
        [0, 100],
        [100, 300],
        [300, 200],
        [200, 100],
        [300, 0]
    ];

    const b = getBoundingRect(p);
    expect(b[0][0]).to.equal(0);
    expect(b[0][1]).to.equal(0);

    expect(b[1][0]).to.equal(0);
    expect(b[1][1]).to.equal(300);

    expect(b[2][0]).to.equal(300);
    expect(b[2][1]).to.equal(300);

    expect(b[3][0]).to.equal(300);
    expect(b[3][1]).to.equal(0);
});


describe('test getCentreOfMass',() => {
    const p:Polygon = [
        [0, 100],
        [0, 300],
        [300, 300],
        [300, 100]
    ];
    const com = getCentreOfMass(p);
    expect(com[0]).to.equal(150);
    expect(com[1]).to.equal(200);
});

describe('test sortVerticesInOrder',() => {
    const p0:Array<Point> = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];
    const ordered0 = sortVerticesInOrder(p0);
    expect(ordered0[0][0]).to.equal(0);
    expect(ordered0[0][1]).to.equal(0);

    const p1:Array<Point> = [
        [0, 100],
        [300, 200],
        [100, 300],
        [300, 0],
        [200, 0],
    ];
    const ordered1 = sortVerticesInOrder(p1);
    expect(ordered1[0][0]).to.equal(0);
    expect(ordered1[0][1]).to.equal(100);
    expect(ordered1[1][0]).to.equal(100);
    expect(ordered1[1][1]).to.equal(300);
    expect(ordered1[2][0]).to.equal(300);
    expect(ordered1[2][1]).to.equal(200);
    expect(ordered1[3][0]).to.equal(300);
    expect(ordered1[3][1]).to.equal(0);
    expect(ordered1[4][0]).to.equal(200);
    expect(ordered1[4][1]).to.equal(0);
});
