
import Group_p3m1 from "./groups/Group_p3m1";
import WallpaperGroup from "./WallpaperGroup";
import {Polygon} from "./Types";

class Wallpaper {

    public static readonly P3M1 = "p3m1";
    public static readonly PMM = "pmm";

    public static generateGroup(type: string, polygon: Polygon): WallpaperGroup {
        let g:WallpaperGroup;
        if(type === Wallpaper.P3M1){
            g = new Group_p3m1(polygon);
        }
        if(!g){
            throw "Incorrect input";
        }
        return g;
    }
}

export default Wallpaper;
