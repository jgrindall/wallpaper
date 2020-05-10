import _ from "lodash";
import IValidator from "./IValidator";
import {Polygon, PolygonTransform, Matrix} from "./Types";

class WallpaperGroup {
    protected _polygon: Polygon;
    protected _validator:IValidator;

    constructor(polygon:Polygon){
        this._polygon = polygon;
        this._validator = this.getValidator();
        this._validator.validate(polygon);
    }
    protected getValidator():IValidator{
        throw new Error("Method not implemented.");
    }
    public coverRectangle(rect: Polygon): Array<PolygonTransform> {
        throw new Error("Method not implemented for ." + rect);
    }
}

export default WallpaperGroup;
