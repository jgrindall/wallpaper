import {NumberPairList, NumberPair, Segment, SegmentList} from "./Types";
import {getTForPointOnSegment, segmentsAreColinear, getPointForTOnSegment} from "./Segment";
import {compT} from "./NumPairComparator";
import _ from "lodash";

const _eq = (a:number, b:number):boolean=>{
    const EPSILON:number = 0.00000001;
    return Math.abs(a - b) < EPSILON;
};

export const groupColinear = (segs:SegmentList):Array<SegmentList>=>{
    const gps:Array<SegmentList> = [];
    segs.forEach(s=>{
        if(gps.length === 0){
            gps.push([s]);
        }
        else{
            for(let i = 0; i < gps.length; i++){
                if(segmentsAreColinear(gps[i][0], s)){
                    gps[i].push(s);
                    return;
                }
            }
            gps.push([s]);
        }
    });
    return gps;
};

export const unionAxis = (arr:NumberPairList):NumberPairList => {
    const points = [];
    arr.forEach( (tpair:NumberPair, i:number) => {
        const t0:number = tpair[0];
        const t1:number = tpair[1];
        if(t0 != t1){
            points.push({
                t:t0,
                index:i,
                start:(t0 <= t1)
            });
            points.push({
                t:t1,
                index:i,
                start:(t0 > t1)
            });
        }
    });
    points.sort(compT);
    const numPoints:number = points.length;
    if(numPoints === 0){
        return [];
    }
    if(numPoints === 2){
        return [ [points[0], points[1]] ];
    }
    let union:NumberPairList = [];
    let inSegments:Array<number> = [0];
    let currentT:number = points[0].t;
    for(let i:number = 1; i < numPoints; i++){
        let obj = points[i];
        if(inSegments.length >= 1){
            if(obj.start){
                inSegments.push(obj.index);
            }
            else{
                inSegments = _.without(inSegments, obj.index);
                if(inSegments.length === 0){
                    union.push([currentT, obj.t]);
                }
            }
        }
        else{
            inSegments.push(obj.index);
            if(_eq(obj.t, _.last(union)[1])){
                currentT = _.last(union)[0];
                union.pop();
            }
            else{
                currentT = obj.t;
            }
        }
    }
    return union;
};

export const unionColinear = (segs:SegmentList):SegmentList=>{
    if(segs.length <= 1){
        return segs;
    }
    const index:Segment = segs[0];
    const convertToTValues = (s:Segment):NumberPair =>{
        return [
            getTForPointOnSegment(index, s[0]),
            getTForPointOnSegment(index, s[1])
        ];
    }
    const tValues:NumberPairList = segs.map(convertToTValues);
    const unionT:NumberPairList = unionAxis(tValues);
    return unionT.map( (pair:NumberPair) =>{
        const seg:Segment = [
            getPointForTOnSegment(index, pair[0]),
            getPointForTOnSegment(index, pair[1])
        ];
        return seg;
    });
};

export const unionSegments = (arr:SegmentList):SegmentList => {
    const gps = groupColinear(arr);
    let union:SegmentList = [];
    gps.forEach(gp=>{
        union = union.concat(unionColinear(gp));
    });
    return union;
};
