import {Point, Matrix} from "transformation-matrix";
import {transformSegment} from "./Segment";
import {Segment, Arc, Polygon, Rect, applyToPoint, applyToPoints} from "./Types";

interface DrawProps {
    strokeStyle?: string;
    fillStyle?: string;
}

abstract class Geometry {
    draw(canvas:HTMLCanvasElement, props:DrawProps):void{
        const ctx = canvas.getContext("2d");
        if(props.strokeStyle){
            ctx.strokeStyle = props.strokeStyle;
        }
        if(props.fillStyle){
            ctx.fillStyle = props.fillStyle;
        }
    }
    abstract transform(t:Matrix):Geometry;
}

class SegmentGeometry extends Geometry{
    private segment:Segment;
    constructor(segment:Segment){
        super();
        this.segment = segment;
    }
    public transform(t:Matrix):Geometry{
        return new SegmentGeometry(transformSegment(t, this.segment));
    }
    public draw(canvas:HTMLCanvasElement, props:DrawProps):void{
        super.draw(canvas, props);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(this.segment[0][0], this.segment[0][1]);
        ctx.lineTo(this.segment[1][0], this.segment[1][1]);
        ctx.closePath();
        ctx.stroke();
    }
}

class ArcGeometry extends Geometry{
    private arc:Arc;
    constructor(arc: Arc){
        super();
        this.arc = arc;
    }
    public transform(t:Matrix):Geometry{
        return new ArcGeometry({
            center:applyToPoint(t, this.arc.center),
            extremity:applyToPoint(t, this.arc.extremity),
            angle0:this.arc.angle0,
            angle1:this.arc.angle1
        });
    }
    private getRadius(){
        const dx = this.arc.center[0] - this.arc.extremity[0], dy = this.arc.center[1] - this.arc.extremity[1];
        return Math.sqrt(dx*dx + dy*dy);
    }
    public draw(canvas:HTMLCanvasElement, props:DrawProps):void{
        super.draw(canvas, props);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const radius = this.getRadius();
        ctx.arc(this.arc.center[0], this.arc.center[1], radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    }
}


class PolygonGeometry extends Geometry{
    private polygon:Polygon;
    constructor(polygon:Polygon){
        super();
        this.polygon = polygon;
    }
    public transform(t:Matrix):Geometry{
        const points = applyToPoints(t, this.polygon);
        return new PolygonGeometry(points);
    }
    public draw(canvas:HTMLCanvasElement, props:DrawProps):void{
        super.draw(canvas, props);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(this.polygon[0][0], this.polygon[0][1]);
        const numPoints = this.polygon.length;
        for(let i = 1; i < numPoints; i++){
            ctx.lineTo(this.polygon[i][0], this.polygon[i][1]);
        }
        ctx.lineTo(this.polygon[0][0], this.polygon[0][1]);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

class RectGeometry extends Geometry{
    private rect:Rect;
    constructor(rect:Rect){
        super();
        this.rect = rect;
    }
    public transform(t:Matrix):Geometry{
        const points = applyToPoints(t, this.rect);
        return new RectGeometry([points[0], points[1], points[2], points[3]]);
    }
    public draw(canvas:HTMLCanvasElement, props:DrawProps):void{
        super.draw(canvas, props);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(this.rect[0][0], this.rect[0][1]);
        ctx.lineTo(this.rect[1][0], this.rect[1][1]);
        ctx.lineTo(this.rect[2][0], this.rect[2][1]);
        ctx.lineTo(this.rect[3][0], this.rect[3][1]);
        ctx.lineTo(this.rect[0][0], this.rect[0][1]);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

class PointGeometry extends Geometry{
    private point:Point;
    constructor(point:Point){
        super();
        this.point = point;
    }
    public transform(t:Matrix):Geometry{
        return new PointGeometry(null);
    }
    public draw(canvas:HTMLCanvasElement, props:DrawProps):void{
        super.draw(canvas, props);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const radius = 8;
        ctx.arc(this.point[0], this.point[1], radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    };
}

export {
    Geometry,
    PointGeometry,
    ArcGeometry,
    SegmentGeometry,
    PolygonGeometry,
    RectGeometry
}
