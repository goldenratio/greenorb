/**
 * Author: bear
 * Date: 8/30/13
 */

///<reference path='../../geom/Rectangle.ts' />
///<reference path='../../geom/Point.ts' />

module com.goldenratio.particle.explosion
{
    export class PixelExplosion
    {
        private static EXPLOSION_COUNT:number = 8;
        private static EXPLOSION_DISTANCE:number = 50;
        private static EXPLOSION_PIXEL_SIZE:number = 6;

        public explosionComplete:bool = false;

        private _isStarted:bool = false;
        private _pixelList:geom.Rectangle[] = [];
        private _color:string;
        private _currentDistance:number = 0;

        constructor(public context:CanvasRenderingContext2D)
        {

        }

        public start(startPosition:com.goldenratio.geom.Point, color:string):void
        {
            this._isStarted = true;
            this._color = color;
            this._currentDistance = 0;
            for(var i:number = 0; i < PixelExplosion.EXPLOSION_COUNT; i++)
            {
                var data:com.goldenratio.geom.Rectangle = new com.goldenratio.geom.Rectangle(startPosition.x, startPosition.y , PixelExplosion.EXPLOSION_PIXEL_SIZE, PixelExplosion.EXPLOSION_PIXEL_SIZE);
                this._pixelList.push(data);
            }
        }

        public update():void
        {
            if(!this._isStarted)
            {
                return;
            }

            this.context.beginPath();

            var separation:number = (360 / PixelExplosion.EXPLOSION_COUNT) >> 0;
            var angle:number = 0;
            for(var i:number = 0; i < this._pixelList.length; i++)
            {
                var rad:number = angle * Math.PI / 180;
                var dx:number = this._pixelList[i].x + Math.cos(rad) * this._currentDistance;
                var dy:number = this._pixelList[i].y + Math.sin(rad) * this._currentDistance;

                this.context.rect(dx, dy, this._pixelList[i].width, this._pixelList[i].height);
                this.context.fillStyle = this._color;
                this.context.fill();

                angle += separation;
            }

            if(this._currentDistance >= PixelExplosion.EXPLOSION_DISTANCE)
            {
                this.explosionComplete = true;
            }
            else
            {
                this._currentDistance += 3;
            }


        }

        public dispose():void
        {
            this.context = null;
            if(this._pixelList)
            {
                this._pixelList.length = 0;
                this._pixelList = null;
            }
        }
    }
}