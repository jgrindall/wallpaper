import {Polygon} from "../Types";
import {PointGeometry, SegmentGeometry} from "../Geometry";



export type PointRecord = {
    id: number;
    in?: Array<number>;
    geometry:PointGeometry
};

export type SegmentRecord = {
    type: string;
    id: number;
    geometry:SegmentGeometry
};

export type GeometryRecord = SegmentRecord;

export interface GeomData{
    fundamentalPolygon: Polygon;
    points: Array<PointRecord>;
    geometries: Array<GeometryRecord>;
}
