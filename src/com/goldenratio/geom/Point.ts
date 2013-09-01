/**
 * Author: bear
 * Date: 8/28/13
 */


module com.goldenratio.geom
{
    export class Point
    {
        constructor(public x:number = 0, public y:number = 0)
        {

        }

        public toString():string
        {
            return "{x : " + this.x + ", y: " + this.y +"}";
        }
    }
}