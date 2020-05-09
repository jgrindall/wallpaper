import {compose} from "./Transforms";
import {Matrix} from  "transformation-matrix";

class MatrixUtils{

    public static composeAllWith (a:Array<Matrix>, b:Matrix){
        return a.map(t=>compose(t, b));
    }

}

export default MatrixUtils;
