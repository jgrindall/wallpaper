
import Wallpaper from "./Wallpaper";
import WallpaperGroup from "./WallpaperGroup";
import {Polygon, PolygonTransform, Matrix, Rect} from "./Types";

const sideLength:number = 150;

const RT3:number = Math.sqrt(3);

const ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");

const drawPoly = (p:Polygon, strokeStyle:string, fillStyle:string)=>{
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(p[0][0], p[0][1]);
    const numPoints = p.length;
    for(let i = 1; i < numPoints; i++){
        ctx.lineTo(p[i][0], p[i][1]);
    }
    ctx.lineTo(p[0][0], p[0][1]);
    ctx.closePath();
    ctx.fill();
};

const fundamentalPolygon: Polygon = [
    [0, 0],
    [0, sideLength],
    [sideLength*RT3/2, sideLength/2]
];

const g: WallpaperGroup = Wallpaper.generateGroup(Wallpaper.P3M1, fundamentalPolygon);

const screen:Rect = [
    [300, 320],
    [300, 620],
    [800, 620],
    [800, 320]
];

drawPoly(screen, 'rgba(100, 100, 100, 1)', 'rgba(100, 100, 100, 0.5)');
drawPoly(fundamentalPolygon, 'rgba(200, 0, 0, 1)', 'rgba(200, 0, 0, 0.5)');
const ts:Array<PolygonTransform> = g.coverRectangle(screen);

ts.forEach(t=>{
    drawPoly(t.poly1, 'rgba(50, 200, 50, 1)', 'rgba(50, 200, 50, 0.5)');
});
