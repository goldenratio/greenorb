/**
 * Author: bear
 * Date: 8/29/13
 */

///<reference path='BaseParticle.ts' />
///<reference path='../geom/Rectangle.ts' />
///<reference path='../geom/Point.ts' />

module com.goldenratio.particle
{
    export class EnemyParticle extends BaseParticle
    {
        public timeId:number = 0;
        public isSpawned:bool = false;

        constructor(public context:CanvasRenderingContext2D)
        {
            super(context);

            this.radius = 12;
            this.color = "rgba(255, 0, 0, 1)";

            this.position = new com.goldenratio.geom.Point(0, 0);
        }

        public setColor(color:string):void
        {
            this.color = color;
        }


        public dispose():void
        {
            this.context = null;
            super.dispose();
        }
    }
}