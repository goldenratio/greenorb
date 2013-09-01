/**
/**
 * Author: bear
 * Date: 8/25/13
 */


module com.goldenratio.geom
{
    export class Rectangle
    {
        constructor(public x:number = 0, public y:number = 0,
                    public width:number = 0, public height:number = 0)
        {

        }

        public isIntersecting(target:Rectangle):bool
        {
            return (Math.abs(this.x - target.x) * 2 < (this.width + target.width)) &&
                    (Math.abs(this.y - target.y) * 2 < (this.height + target.height));

        }

        public toString():string
        {
            return "{x : " + this.x + ", y: " + this.y +", width: "+ this.width +", height: " + this.height +"}";
        }
    }

}