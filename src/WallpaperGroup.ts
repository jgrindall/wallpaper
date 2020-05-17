import _ from "lodash";
import IValidator from "./IValidator";
import {Polygon, PolygonTransform, Matrix, Rect, applyToPoints} from "./Types";
import {getProduct, conjugates} from "./Transforms";
import {getTranslationsToCoverPolygon} from "./PolygonCovering";
import {convexPolyPolyNonZeroOverlap, anyPolygonContainsPoint} from "./PolygonIntersection";
import {getCentreOfMass} from "./PolygonUtils";

class WallpaperGroup {
    protected _polygon: Polygon;
    protected _validator:IValidator;

    constructor(polygon:Polygon){
        this._polygon = polygon;
        this._validator = this.getValidator();
        this._validator.validate(polygon);
    }
    protected getBaseTransforms(): Array<Matrix>{
        throw new Error("Method not implemented.");
    }
    protected getValidator():IValidator{
        throw new Error("Method not implemented.");
    }
    protected getTransformToBase():Matrix{
        throw new Error("Method not implemented.");
    }
    protected getBaseRect():Rect{
        throw new Error("Method not implemented.");
    }
    public coverRectangle(rect:Rect):Array<PolygonTransform>{
        const toBase:Matrix = this.getTransformToBase();
        const transformedRect:Polygon = applyToPoints(toBase, rect);
        const baseRect:Rect = this.getBaseRect();
        const cover:Array<Matrix> = getTranslationsToCoverPolygon(baseRect, transformedRect);
        const ts = getProduct(
            this.getBaseTransforms(),
            cover
        );
        const conjugated = conjugates(toBase, ts);
        const data:Array<PolygonTransform> = [];
        const polys:Array<Polygon> = [];
        conjugated.forEach(t=>{
            const transformedPoly = applyToPoints(t, this._polygon);
            if(convexPolyPolyNonZeroOverlap(rect, transformedPoly)){
                if(!anyPolygonContainsPoint(polys, getCentreOfMass(transformedPoly))){
                    data.push({
                        t: t,
                        poly0:this._polygon,
                        poly1:transformedPoly
                    });
                    polys.push(transformedPoly);
                }
            }
        });
        return data;
    }
}

export default WallpaperGroup;
