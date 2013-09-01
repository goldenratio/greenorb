/**
 * Author: bear
 * Date: 8/25/13
 */

///<reference path='BaseParticle.ts' />
///<reference path='../geom/Rectangle.ts' />
///<reference path='../geom/Point.ts' />
///<reference path='../utils/Device.ts' />


module com.goldenratio.particle
{
    export class HeroParticle extends BaseParticle
    {
        public speed:number = 10;

        constructor(public context:CanvasRenderingContext2D)
        {
            super(context);

            this.radius = 12;
            this.color = "rgba(0, 255, 0, 1)";

            this.position = new com.goldenratio.geom.Point(162, 380);

        }

        public setPosition(x:number, y:number):void
        {
            var distance:Number = Math.sqrt(Math.pow((x - this.position.x), 2) + Math.pow((y - this.position.y), 2));
            var tx:number = this.position.x;
            var ty:number = this.position.y;

            if(distance > 5)
            {
                var deltaY:number = this.position.y - y;
                var deltaX:number = this.position.x - x;

                var rad:number = Math.atan2(deltaY, deltaX) * 180 / Math.PI; // in radians

                tx -= (Math.cos(rad / 180 * Math.PI) * this.speed) >> 0;
                ty -= (Math.sin(rad / 180 * Math.PI) * this.speed) >> 0;
            }
            else
            {
                tx = x;
                ty = y;
            }


            //console.log(tx + ", " + ty);
            super.setPosition(tx, ty);

        }


        public dispose():void
        {
            this.context = null;
            super.dispose();
        }
    }
}