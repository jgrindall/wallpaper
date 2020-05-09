import {getLengthSqr, dot, getDistanceSqr} from "../src/Vector";
import { expect } from 'chai';
import {Point} from "../src/Types";

describe('Test vector',() => {
    it('length', () =>{
        const p1:Point = [400, 300];
        const p2:Point = [700, 700];
        expect(getLengthSqr(p1)).to.equal(500*500);
        expect(getDistanceSqr(p1, p2)).to.equal(500*500);
    });
    it('dot', () => {
        const p1:Point = [400, 300];
        const p2:Point = [700, 700];
        expect(dot(p1, p2)).to.equal(490000);
    });

    it('mapSegmentToYAxis', () => {
        const p0:Point = [400, 300];
        const p1:Point = [700, 700];
        expect(dot(p0, p1)).to.equal(490000);
    });

});
