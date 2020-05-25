<template>
  <div>
    <canvas id='canvas' class='md-elevation-4' style='border:1px solid #ccc;' width="1024" height="768" />
  </div>
</template>

<script lang="ts">
    import Wallpaper from "../Wallpaper";
    import WallpaperGroup from "../WallpaperGroup";
    import {transformSegmentList} from "../Segment";
    import {Polygon, PolygonTransform, Rect, SegmentList, Segment, Point} from "../Types";
    import {fundamentalPolygonIntersections} from "../PolygonIntersection";
    export default {
      mounted(){
          console.log('d mounted');

          const sideLength:number = 200;

          const RT3:number = Math.sqrt(3);

          const canvas = (document.getElementById("canvas") as HTMLCanvasElement);
          const ctx = canvas.getContext("2d");

          const clear = ()=>{
              ctx.clearRect(0, 0, canvas.width, canvas.height)
          };

          const drawSegs = (segs:SegmentList, strokeStyle:string)=>{
              ctx.strokeStyle = strokeStyle;
              ctx.beginPath();
              let s:Segment;
              const numPoints = segs.length;
              for(let i = 0; i < numPoints; i++){
                  s = segs[i];
                  ctx.moveTo(s[0][0], s[0][1]);
                  ctx.lineTo(s[1][0], s[1][1]);
                  ctx.closePath();
                  ctx.stroke();
              }
          };

          const drawPts = (p:Polygon, strokeStyle:string, fillStyle:string)=>{
              ctx.fillStyle = fillStyle;
              ctx.strokeStyle = strokeStyle;
              const numPoints = p.length;
              for(let i = 0; i < numPoints; i++){
                  ctx.beginPath();
                   ctx.arc(p[i][0], p[i][1], 8, 0, Math.PI * 2, true);
                   ctx.closePath();
                   ctx.fill();
              }
          };

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
              [300, 300],
              [300, 300 + sideLength],
              [300 + sideLength*RT3/2, 300 + sideLength/2]
          ];

          const g: WallpaperGroup = Wallpaper.generateGroup(Wallpaper.P3M1, fundamentalPolygon);

          const redraw = (x:number, y:number):void=>{
              const screen:Rect = [
                  [x, y],
                  [x, y + 300],
                  [x + 500, y + 300],
                  [x + 500, y]
              ];
              clear();
              drawPoly(screen, 'rgba(100, 100, 100, 1)', 'rgba(100, 100, 100, 0.5)');
              drawPoly(fundamentalPolygon, 'rgba(200, 0, 0, 1)', 'rgba(200, 0, 0, 0.5)');
              const ts:Array<PolygonTransform> = g.coverRectangle(screen);

              ts.forEach(t=>{
                  drawPoly(t.poly1, 'rgba(50, 200, 50, 1)', 'rgba(50, 200, 50, 0.5)');
                  drawPts(t.poly1, 'rgba(50, 50, 0, 1)', 'rgba(50, 50, 0, 0.9)');
              });

              const s:SegmentList = [];
              s.push([ fundamentalPolygon[0], fundamentalPolygon[1] ]);
              s.push([ fundamentalPolygon[1], fundamentalPolygon[2] ]);
              s.push([ fundamentalPolygon[2], fundamentalPolygon[0] ]);
              for(let i = 0; i < ts.length; i++){
                  drawSegs(transformSegmentList(ts[i].t, s), 'rgba(50, 20, 250, 0.75)');
              }

              const appendSegment = (p:Point)=>{
                  const s:SegmentList = fundamentalPolygonIntersections(ts, [fundamentalPolygon[0], p]);
                  console.log(s);
                  for(let i = 0; i < ts.length; i++){
                      drawSegs(transformSegmentList(ts[i].t, s), 'rgba(50, 20, 250, 0.75)');
                  }
              };

              const p:Point = [600, 200];

              appendSegment(p);

          }

          redraw(230, 250);



          /**

          let dragging:boolean = false;

          const handleMouseDown = (event: MouseEvent) => {
              dragging = true;
          };

          const handleMouseUp = (event: MouseEvent) => {
              dragging = false;
          };

          const handleMouseMove = (event: MouseEvent) => {
              if(dragging){
                  redraw(event.clientX, event.clientY);
              }
          };

          document.addEventListener('mousemove', handleMouseDown);
          document.addEventListener('mouseup', handleMouseUp);
          document.addEventListener('mousemove', handleMouseMove);

          **/
      }
    }
</script>
