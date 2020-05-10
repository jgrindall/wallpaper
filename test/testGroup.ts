
import Wallpaper from "../src/Wallpaper";
import WallpaperGroup from "../src/WallpaperGroup";
import { expect } from 'chai';
import {Polygon, PolygonTransform, Rect} from "../src/Types";

const RT3 = Math.sqrt(3);

describe('groups',() => {
    it('should fail with incorrect input', () => {
        const p:Polygon = [];
        expect(()=>{
            Wallpaper.generateGroup("a", p);
        }).to.throw('Incorrect input');
        expect(()=>{
            Wallpaper.generateGroup(Wallpaper.P3M1, p);
        }).to.throw('Incorrect polygon');
        expect(()=>{
            const p:Polygon = [
                [0, 0],
                [100, 0],
                [50, 50]
            ];
            Wallpaper.generateGroup(Wallpaper.P3M1, p);
        }).to.throw('Incorrect polygon');
    });

    it('should return a group', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];
        const g = Wallpaper.generateGroup(Wallpaper.P3M1, p);
        expect(g).to.be.instanceof(WallpaperGroup);
    });

    it('should return a group', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];
        const g = Wallpaper.generateGroup(Wallpaper.P3M1, p);
        expect(g).to.be.instanceof(WallpaperGroup);
    });
});



describe('p3m1 should cover',() => {
    it('should return a group', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];
        const g = Wallpaper.generateGroup(Wallpaper.P3M1, p);
        expect(g).to.be.instanceof(WallpaperGroup);
        const screen:Rect = [
            [0, 0],
            [0, 300],
            [100*RT3, 300],
            [100*RT3, 0]
        ];
        const a:Array<PolygonTransform> = g.coverRectangle(screen);
        //expect(a.length).to.equal(14);
    });
});
