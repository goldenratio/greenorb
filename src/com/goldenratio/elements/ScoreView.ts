/**
 * Author: bear
 * Date: 8/31/13
 */

///<reference path='../geom/Rectangle.ts' />
///<reference path='../geom/Point.ts' />
///<reference path='../Res.ts' />
module com.goldenratio.elements
{
    export class ScoreView
    {
        private _position:com.goldenratio.geom.Point;

        constructor(public context:CanvasRenderingContext2D)
        {

        }

        public update(scoreValue:number):void
        {
            var scoreStr:string = scoreValue.toString();
            this._position = new com.goldenratio.geom.Point(8, 8);

            for(var i:number = 0; i < scoreStr.length; i++)
            {
                var sourceRect:com.goldenratio.geom.Rectangle = this.getSourceRect(scoreStr.charAt(i));
                if(sourceRect)
                {
                    this.context.drawImage(Res.gfxSprite, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
                        this._position.x, this._position.y, sourceRect.width, sourceRect.height);

                    this._position.x += sourceRect.width + 3;
                }

            }

        }

        private getSourceRect(value:string):com.goldenratio.geom.Rectangle
        {
            if(value == "0")
                return Res.data_0().sourceRect;
            else if(value == "1")
                return Res.data_1().sourceRect;
            else if(value == "2")
                return Res.data_2().sourceRect;
            else if(value == "3")
                return Res.data_3().sourceRect;
            else if(value == "4")
                return Res.data_4().sourceRect;
            else if(value == "5")
                return Res.data_5().sourceRect;
            else if(value == "6")
                return Res.data_6().sourceRect;
            else if(value == "7")
                return Res.data_7().sourceRect;
            else if(value == "8")
                return Res.data_8().sourceRect;
            else if(value == "9")
                return Res.data_9().sourceRect;

            return null;
        }

        public dispose():void
        {
            this.context = null;
            this._position = null;
        }

    }
}