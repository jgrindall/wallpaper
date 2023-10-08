import {GeomData, GeometryRecord, PointRecord, SegmentRecord} from "./GeomDataTypes";
import {Point, Polygon} from "../Types";
import {PointGeometry, SegmentGeometry} from "../Geometry";
//addPoint(getMidpoint(0, 1), [3]);
//addPoint(getMidpoint(1, 2), [4]);
//addPoint(getMidpoint(2, 0), [5]);

//addSegment(7, 8);
//addSegment(2, 6);

//console.log(JSON.stringify(data, null, 2));

export class Geom{
    private _id:number = -1;
    public data:GeomData = null;
    constructor(data:GeomData){
        this.data = data;
    }
    getId(){
        this._id++;
        return this._id;
    }
    updateIntersections(segment:GeometryRecord):void{
        this.data.geometries.forEach( (geom:GeometryRecord)=>{
            if(geom !== segment){

            }
        });
    }
    getPointWithId(id:number):PointGeometry{
        const record:PointRecord = this.data.points.find(record => record.id === id);
        return record.defn.position;
    }
    addPoint(p:Point, _in:Array<number>){
        this.data.points.push({
            id:this.getId(),
            in:_in,
            defn:{
                position:p
            }
        });
    }
    addSegment(id0:number, id1:number){
        const id = this.getId();
        const segment:GeometryRecord = {
            type: "segment",
            id,
            defn:{
                points:[
                    id0,
                    id1
                ]
            }
        };
        this.data.geometries.push(segment);
        this.data.points.forEach( (record:PointRecord)=>{
            if([id0, id1].includes(record.id)){
                record.in.push(id);
            }
        });
        //this.updateIntersections(segment);
    }
    getMidpoint(id0:number, id1:number):Point{
        const p0 = this.getPointWithId(id0), p1 = this.getPointWithId(id1);
        return [
            (p0[0] + p1[0])/2,
            (p0[1] + p1[1])/2
        ];
    }
    toString():string{
        return JSON.stringify(this.data, null, 2);
    }
    static from(fundamentalPolygon:Polygon):Geom{
        const len = fundamentalPolygon.length;
        const points = fundamentalPolygon.map( (p:Point, i:number) => {
            return {
                id:i,
                in: i === 0 ? [i + len, 2*len - 1] : [i + len, i + len - 1],
                geometry:new PointGeometry(p)
            };
        });
        const geometries = fundamentalPolygon.map( (p:Point, i:number) => {
            const s:SegmentRecord = {
                type: "edge",
                id: i + len,
                geometry:new SegmentGeometry([i, (i + 1) % len]){
                    points: [i, (i + 1) % len]
                }
            };
            return s;
        });
        return new Geom({
            fundamentalPolygon,
            points,
            geometries
        });
    }
}
