
import Wallpaper from "./Wallpaper";
import WallpaperGroup from "./WallpaperGroup";
import {Polygon} from "./Types";

const sideLength:number = 150;

const RT3:number = Math.sqrt(3);

const fundamentalPolygon: Polygon = [
    {x:0, y:0},
    {x:sideLength, y:0},
    {x:sideLength/2, y:sideLength*RT3/2}
];

const g: WallpaperGroup = Wallpaper.generateGroup(Wallpaper.P3M1, fundamentalPolygon);

const p:Polygon = [
    {x:50, y:50},
    {x:1000, y:50},
    {x:1000, y:800},
    {x:50, y:800}
];

g.coverRectangle(p);
