/**
 * Author: bear
 * Date: 8/31/13
 */

///<reference path='Trace.ts' />
///<reference path='Res.ts' />
///<reference path='utils/Device.ts' />
///<reference path='geom/Rectangle.ts' />
///<reference path='geom/Point.ts' />
///<reference path='elements/GameBackground.ts' />

module com.goldenratio
{
    export class TitleMain
    {
        private _isRAF:bool = false;
        private _frameRateID:number;

        private _clickTextPosition:geom.Point = new geom.Point(100, 420);
        private _textSourceRect:geom.Rectangle;

        private _titleTextPosition:geom.Point = new geom.Point(50, 100);
        private _titleSourceRect:geom.Rectangle;

        private _blinkCount:number = 0;
        
        private _background:elements.GameBackground;

        // binds
        private updateBind:any;
        private onCanvasClickBind:any;

        constructor(public canvas:HTMLCanvasElement, public context:CanvasRenderingContext2D, public stageProp:geom.Rectangle)
        {
            Trace.log("show title screen");

            if(window["requestAnimationFrame"])
            {
                Trace.log("using RAF");
                this._isRAF = true;
            }

            this.bindHandlers();
            this.init();

            this.update();
        }

        private bindHandlers():void
        {
            this.updateBind = this.update.bind(this);
            this.onCanvasClickBind = this.onCanvasClick.bind(this);
        }

        private init():void
        {
            this._textSourceRect = utils.Device.isTouchDevice() ? Res.data_tap_to_start().sourceRect : Res.data_click_to_start().sourceRect
            this._titleSourceRect = Res.data_title_green_orb().sourceRect;

            this._background = new elements.GameBackground(this.context, this.stageProp);
            this.canvas.addEventListener("click", this.onCanvasClickBind, false);
        }

        private onCanvasClick(event:MouseEvent):void
        {
            Trace.log("click.. start game");
            event.preventDefault();

            var domEvent:Event = document.createEvent("Event");
            domEvent.initEvent("startgame", true, true);

            document.dispatchEvent(domEvent);

        }

        public update():void
        {
            this.context.globalCompositeOperation = "source-over";
            this.context.fillStyle = "rgba(0, 0, 0, 0.4)";
            this.context.fillRect(0, 0, this.stageProp.width, this.stageProp.height);

            this.context.globalCompositeOperation = "lighter";

            if(this._background)
            {
                this._background.update();
            }

            this.context.drawImage(Res.gfxSprite, this._titleSourceRect.x, this._titleSourceRect.y, this._titleSourceRect.width, this._titleSourceRect.height,
                this._titleTextPosition.x, this._titleTextPosition.y, this._titleSourceRect.width, this._titleSourceRect.height);

            if(this._blinkCount <= 100)
            {
                this.context.drawImage(Res.gfxSprite, this._textSourceRect.x, this._textSourceRect.y, this._textSourceRect.width, this._textSourceRect.height,
                    this._clickTextPosition.x, this._clickTextPosition.y, this._textSourceRect.width, this._textSourceRect.height);
            }

            this._blinkCount += 1;

            if(this._blinkCount >= 150)
            {
                this._blinkCount = 0;
            }


            this._frameRateID = this._isRAF ? window["requestAnimationFrame"](this.updateBind) : window.setTimeout(this.updateBind, 17);
        }


        public dispose():void
        {
            this._isRAF ? window["cancelAnimationFrame"](this._frameRateID) : window.clearTimeout(this._frameRateID);

            if(this.canvas)
            {
                this.canvas.removeEventListener("click", this.onCanvasClickBind, false);
            }

            if(this._background)
            {
                this._background.dispose();
                this._background = null;
            }

            this.canvas = null;
            this.context = null;

            this.updateBind = null;
            this.onCanvasClickBind = null;
            this.stageProp = null;

            this._clickTextPosition = null;
            this._textSourceRect = null;

            this._titleSourceRect = null;
            this._titleTextPosition = null;

        }
    }
}