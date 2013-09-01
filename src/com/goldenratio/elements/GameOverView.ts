/**
 * Author: bear
 * Date: 9/1/13
 */

///<reference path='../geom/Rectangle.ts' />
///<reference path='../geom/Point.ts' />
///<reference path='../Res.ts' />
///<reference path='../utils/Device.ts' />
module com.goldenratio.elements
{
    export class GameOverView
    {
        private _positionGame:com.goldenratio.geom.Point = new com.goldenratio.geom.Point(-221, 100);
        private _positionOver:com.goldenratio.geom.Point = new com.goldenratio.geom.Point(326, 170);


        private _positionClick:com.goldenratio.geom.Point = new com.goldenratio.geom.Point(90, 280);
        private _clickSourceRect:com.goldenratio.geom.Rectangle;

        private _showClickText:bool = false;
        private _clickCounter:number = 0;

        private _youWin:bool = false;

        private _minPositionFirstLineX:number = 0;
        private _minPositionSecondLineX:number = 0;

        private _minPositionGameX:number = 50;
        private _minPositionOverX:number = 65;

        private _minPositionYouX:number = 70;
        private _minPositionWinX:number = 75;

        private _clickListenerAdded:bool = false;

        // bind
        private onStageClickBind:any;

        constructor(public context:CanvasRenderingContext2D, public canvas:HTMLCanvasElement)
        {
            if(utils.Device.isTouchDevice())
            {
                this._clickSourceRect = Res.data_tap_to_continue().sourceRect;
                this._positionClick.x = 100;
            }
            else
            {
                this._clickSourceRect = Res.data_click_to_continue().sourceRect;
            }

            this._minPositionFirstLineX = this._minPositionGameX;
            this._minPositionSecondLineX = this._minPositionOverX

        }

        private addClickListener():void
        {
            this._clickListenerAdded = true;

            this.onStageClickBind = this.onStageClickHL.bind(this);
            this.canvas.addEventListener("click", this.onStageClickBind, false);
        }

        private onStageClickHL(event:MouseEvent):void
        {
            event.preventDefault();

            var domEvent:Event = document.createEvent("Event");
            domEvent.initEvent("showtitle", true, true);

            document.dispatchEvent(domEvent);
        }

        public youWin(flag:bool):void
        {
            if(this._youWin != flag)
            {
                this._youWin = flag;

                if(this._youWin)
                {
                    this._minPositionFirstLineX = this._minPositionYouX;
                    this._minPositionSecondLineX = this._minPositionWinX;
                }
                else
                {
                    this._minPositionFirstLineX = this._minPositionGameX;
                    this._minPositionSecondLineX = this._minPositionOverX;
                }
            }


        }

        public update():void
        {
            if(this._positionGame.x <= this._minPositionFirstLineX)
            {
                this._positionGame.x += 4;
            }
            else
            {
                this._showClickText = true;

                if(!this._clickListenerAdded)
                {
                    this.addClickListener();
                }
            }

            if(this._positionOver.x >= this._minPositionSecondLineX)
            {
                this._positionOver.x -= 4;
            }

            var sourceRect:com.goldenratio.geom.Rectangle;

            if(!this._youWin)
            {
                sourceRect = Res.data_game().sourceRect;
                this.context.drawImage(Res.gfxSprite, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
                    this._positionGame.x, this._positionGame.y, sourceRect.width, sourceRect.height);

                sourceRect = Res.data_over().sourceRect;
                this.context.drawImage(Res.gfxSprite, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
                    this._positionOver.x, this._positionOver.y, sourceRect.width, sourceRect.height);


            }
            else
            {
                sourceRect = Res.data_you().sourceRect;
                this.context.drawImage(Res.gfxSprite, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
                    this._positionGame.x, this._positionGame.y, sourceRect.width, sourceRect.height);

                sourceRect = Res.data_win().sourceRect;
                this.context.drawImage(Res.gfxSprite, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
                    this._positionOver.x, this._positionOver.y, sourceRect.width, sourceRect.height);

            }

            if(this._showClickText)
            {
                if(this._clickCounter  <= 100)
                {
                    this.context.drawImage(Res.gfxSprite, this._clickSourceRect.x, this._clickSourceRect.y, this._clickSourceRect.width, this._clickSourceRect.height,
                        this._positionClick.x, this._positionClick.y, this._clickSourceRect.width, this._clickSourceRect.height);
                }

                this._clickCounter += 1;

                if(this._clickCounter >= 150)
                {
                    this._clickCounter = 0;
                }

            }

        }



        public dispose():void
        {
            if(this.canvas)
            {
                this.canvas.removeEventListener("click", this.onStageClickBind, false);
            }
            this.canvas = null;
            this.context = null;
            this._positionGame = null;
            this._positionOver = null;

            this._positionClick = null;
            this._clickSourceRect = null;

            this.onStageClickBind = null;
        }
    }
}