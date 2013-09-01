/**
 * Author: bear
 * Date: 8/31/13
 */

///<reference path='../geom/Rectangle.ts' />
module com.goldenratio.elements
{
    export class HealthBar
    {
        private _prop:com.goldenratio.geom.Rectangle = new com.goldenratio.geom.Rectangle(160, 10, 150, 10);

        constructor(public context:CanvasRenderingContext2D)
        {

        }

        public update(healthValue:number):void
        {
            this.context.beginPath();
            this.context.rect(this._prop.x, this._prop.y, this._prop.width, this._prop.height);
            this.context.fillStyle = "rgba(0, 0, 0, 0)";
            this.context.fill();
            this.context.lineWidth = 1;
            this.context.strokeStyle = "rgba(255, 255, 255, 1)";
            this.context.stroke();

            var healthWidth:number = (healthValue / 100) * (this._prop.width - 6)
            this.context.beginPath();
            this.context.rect(this._prop.x + 3, this._prop.y + 3, healthWidth, this._prop.height - 6);
            this.context.fillStyle = "rgba(255, 255, 255, 1)";
            this.context.fill();
        }

        public dispose():void
        {
            this.context = null;
            this._prop = null;
        }
    }
}