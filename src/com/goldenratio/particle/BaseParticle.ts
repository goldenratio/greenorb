/**
 * Author: bear
 * Date: 8/25/13
 */

///<reference path='../geom/Rectangle.ts' />
///<reference path='../geom/Point.ts' />
///<reference path='explosion/PixelExplosion.ts' />

module com.goldenratio.particle
{
    export class BaseParticle
    {
        public radius:number = 0;
        public color:string = "rgba(0, 0, 0, 1)";
        public position:com.goldenratio.geom.Point = new com.goldenratio.geom.Point(0, 0);

        public isAlive:bool = true;
        public canRemove:bool = false;

        public canCollect:bool = false;

        private _explosion:explosion.PixelExplosion;

        constructor(public context:CanvasRenderingContext2D)
        {
            this._explosion = new explosion.PixelExplosion(context);
        }

        public update():void
        {
            if(this.canRemove)
                return;

            this.context.beginPath();
            var gradient:CanvasGradient;

            if(this.isAlive)
            {
                gradient = this.context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.radius);
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.4, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.4, this.color);
                gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

                this.context.fillStyle = gradient;
                this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
                this.context.fill();
            }
            else
            {
                // explode animation
                if(!this.canCollect)
                {
                    this._explosion.update();
                }

            }

            if(this._explosion.explosionComplete)
            {
                this.canRemove = true;
            }


        }

        public die():void
        {
            this.isAlive = false;
            this._explosion.start(this.position, this.color);
        }

        public setPosition(x:number, y:number):void
        {
            this.position.x = x;
            this.position.y = y;
        }


        public getBounds():com.goldenratio.geom.Rectangle
        {
            return new com.goldenratio.geom.Rectangle(this.position.x - (this.radius >> 1), this.position.y - (this.radius >> 1), this.radius * 2, this.radius * 2);
        }

        public dispose():void
        {
            this.context = null;
            this.position = null;

            if(this._explosion)
            {
                this._explosion.dispose();
                this._explosion = null;
            }
        }
    }
}