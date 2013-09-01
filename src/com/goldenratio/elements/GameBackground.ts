/**
 * Author: bear
 * Date: 8/29/13
 */

///<reference path='../geom/Rectangle.ts' />
///<reference path='../utils/Device.ts' />
module com.goldenratio.elements
{
    export class BackgroundParticle
    {
        public static DARK_COL:string = "rgba(25, 25, 25, 1)";
        public static LIGHT_COL:string = "rgba(65, 65, 65, 1)";

        public id:number = 0;
        public color:string = BackgroundParticle.LIGHT_COL;

        constructor(public x:number = 0, public y:number = 0)
        {

        }
    }

    export class GameBackground
    {
        private _starList:BackgroundParticle[] = [];

        constructor(public context:CanvasRenderingContext2D, public stageSize:com.goldenratio.geom.Rectangle)
        {
            var particleCount:number = utils.Device.isMobileOS() ? 10 : 20;

            for(var i:number = 0; i < particleCount; i++)
            {
                var tx:number = (Math.random() * this.stageSize.width) >> 0;
                var ty:number = (Math.random() * this.stageSize.height) >> 0;
                var tempParticle:BackgroundParticle = new BackgroundParticle(tx, ty);
                tempParticle.id = i;
                var rnd:number = (Math.random() * 10) >> 0;
                if(rnd > 5)
                {
                    tempParticle.color = BackgroundParticle.DARK_COL;
                }

                this._starList.push(tempParticle);
            }

        }

        public update():void
        {

            for(var i:number = 0; i < this._starList.length; i++)
            {
                this.context.beginPath();
                this.context.rect(this._starList[i].x, this._starList[i].y, 4, 4);
                this.context.fillStyle = this._starList[i].color;
                this.context.fill();

                this._starList[i].y += 2;
                if(this._starList[i].y > (this.stageSize.height + 10))
                {
                    this._starList[i].y = 0;
                    this._starList[i].x = (Math.random() * this.stageSize.width) >> 0;
                }
            }
        }

        public dispose():void
        {
            this.context = null;
            this.stageSize = null;
            this._starList.length = 0;
            this._starList = null;
        }
    }
}