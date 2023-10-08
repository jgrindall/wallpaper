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
    import {fromAToBWithFraction} from "../Vector";
    import {Geom} from "./GeomData";

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
              [0, 0],
              [0, sideLength],
              [sideLength*RT3/2, sideLength/2]
          ];

          const g: WallpaperGroup = Wallpaper.generateGroup(Wallpaper.P3M1, fundamentalPolygon);

          const geom:Geom = Geom.from(fundamentalPolygon);

          console.log(geom.toString());

          const draw = (geom:Geom)=>{
              geom.data.points.forEach(point=>{
                  
              });
          };

          draw(geom);

      }
    }
</script>
