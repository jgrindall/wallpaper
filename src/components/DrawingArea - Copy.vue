<template>
  <div>
    <canvas id='canvas' class='md-elevation-4' style='border:1px solid #ccc;' width="1024" height="768" />
  </div>
</template>

<script lang="ts">
    import Wallpaper from "../Wallpaper";
    import WallpaperGroup from "../WallpaperGroup";
    import {transformSegmentList, transformSegment} from "../Segment";
    import {Polygon, PolygonTransform, Rect, SegmentList, Segment, Point} from "../Types";
    import {ArcGeometry, SegmentGeometry, RectGeometry, Geometry} from "../Geometry";
    import {fundamentalPolygonIntersections} from "../PolygonIntersection";

    export default {
      mounted(){
          const sideLength:number = 200;
          const RT3:number = Math.sqrt(3);
          const canvas:HTMLCanvasElement = (document.getElementById("canvas") as HTMLCanvasElement);

          const clear = () => {
              const ctx = canvas.getContext("2d");
              ctx.clearRect(0, 0, canvas.width, canvas.height);
          };

          const fundamentalPolygon: Polygon = [
              [300, 300],
              [300, 300 + sideLength],
              [300 + sideLength*RT3/2, 300 + sideLength/2]
          ];

          const g: WallpaperGroup = Wallpaper.generateGroup(Wallpaper.P3M1, fundamentalPolygon);

          const redraw = (x:number, y:number):void => {

              const screen:Rect = [
                  [x, y],
                  [x, y + 300],
                  [x + 500, y + 300],
                  [x + 500, y]
              ];

              const transforms:Array<PolygonTransform> = g.coverRectangle(screen);

              const geometries:Array<Geometry> = [];

              geometries.push(new SegmentGeometry([
                  fundamentalPolygon[0],
                  fundamentalPolygon[1]
              ]));
              geometries.push(new SegmentGeometry([
                  fundamentalPolygon[1],
                  fundamentalPolygon[2]
              ]));
              geometries.push(new SegmentGeometry([
                  fundamentalPolygon[2],
                  fundamentalPolygon[0]
              ]));

              const addSegment = (pt0:Point, pt1:Point)=>{
                  geometries.push(new SegmentGeometry([
                      pt0, pt1
                  ]));
              };

              const addArc = (center:Point, extremity:Point)=>{
                  geometries.push(new ArcGeometry({
                      center:center,
                      extremity: extremity,
                      angle0:0,
                      angle1:2*Math.PI
                  }));
              };

              addSegment([320, 320], [400, 400]);
              addArc([350, 400], [360, 400]);

              clear();

              geometries.forEach(geom=>{
                  transforms.forEach(transform=>{
                      const geom2:Geometry = geom.transform(transform.t);
                      geom2.draw(canvas, {
                          strokeStyle: 'rgba(200, 200, 200, 0.66)'
                      });
                  });
              });

              const screenGeom = new RectGeometry(screen);
              screenGeom.draw(canvas, {
                  strokeStyle: 'rgba(200, 250, 200, 0.75)',
                  fillStyle: 'rgba(200, 250, 200, 0.5)'
              });
  
          }

          redraw(230, 250);


      }
    }
</script>
