/**
 * Author: bear
 * Date: 8/31/13
 */

///<reference path='TitleMain.ts' />
///<reference path='GameMain.ts' />
///<reference path='utils/Device.ts' />
///<reference path='Res.ts' />

module com.goldenratio
{
    export class Main
    {
        private static GAME_BOUND_DESKTOP:geom.Rectangle = new geom.Rectangle(0, 0, 400, 575);

        private _canvas:HTMLCanvasElement;
        private _context:CanvasRenderingContext2D;

        private _title:TitleMain;
        private _game:GameMain;

        private _stageProp:geom.Rectangle = new geom.Rectangle(0, 0, 320, 460);
        private _gameDimension:geom.Rectangle = new geom.Rectangle(0, 0, 320, 460);

        // bind
        private resizeHandlerBind:any;
        private onGfxSpriteLoadedBind:any;
        private onStartGameBind:any;
        private onShowTitleBind:any;

        constructor()
        {
            this._canvas = <HTMLCanvasElement> document.getElementById("slate");
            this._context = this._canvas.getContext("2d");

            this.bindHandlers();
            this.setUpRequestAnimationFrame();
            this.initListeners();

            utils.Device.isTouchDevice() == false ? this.setupResizeForDesktop() : this.resizeGame();

            this.loadAssets();

        }

        private bindHandlers():void
        {
            this.resizeHandlerBind = this.onResizeWindow.bind(this);
            this.onGfxSpriteLoadedBind = this.onGfxSpriteLoadComplete.bind(this);
            this.onStartGameBind = this.onStartGameHandler.bind(this);
            this.onShowTitleBind = this.onShowTitleHandler.bind(this);
        }

        private initListeners():void
        {
            if(utils.Device.isTouchDevice())
            {
                Trace.log("touch device");
                window.addEventListener("resize", this.resizeHandlerBind, false);
                window.addEventListener("orientationchange", this.resizeHandlerBind, false);
            }

            document.addEventListener("startgame", this.onStartGameBind, false);
            document.addEventListener("showtitle", this.onShowTitleBind, false);
        }

        private loadAssets():void
        {
            Res.gfxSprite = <HTMLImageElement> new Image();
            Res.gfxSprite.addEventListener("load", this.onGfxSpriteLoadedBind, false);
            Res.gfxSprite.src = "gfx_sheet.png";
        }

        private onGfxSpriteLoadComplete():void
        {
            Res.gfxSprite.removeEventListener("load", this.onGfxSpriteLoadedBind, false);
            this.launchTitle();
        }



        private onStartGameHandler(event:Event):void
        {
            this.disposeTitle();
            this.launchGame();
        }

        private onShowTitleHandler(event:Event):void
        {
            this.disposeGame();
            this.launchTitle();
        }

        private launchGame():void
        {
            if(this._game)
                return;

            this._game = new GameMain(this._canvas, this._context, this._stageProp, this._gameDimension);
        }

        private disposeGame():void
        {
            if(this._game)
            {
                this._game.dispose();
                this._game = null;
            }
        }

        private launchTitle():void
        {
            if(this._title)
                return;

            this._title = new TitleMain(this._canvas, this._context, this._stageProp);
        }

        private disposeTitle():void
        {
            if(this._title)
            {
                this._title.dispose();
                this._title = null;
            }
        }


        private onResizeWindow():void
        {
            this.resizeGame();
        }

        private setupResizeForDesktop():void
        {
            this._gameDimension = Main.GAME_BOUND_DESKTOP;
            this.resizeGame(this._gameDimension.width, this._gameDimension.height);

            var gameArea:HTMLElement = <HTMLElement> document.getElementById("gameContainer");
            gameArea.style.paddingTop = "20px";
        }



        private resizeGame(width:number = null, height:number = null):void
        {
            var gameWidth:number = window.innerWidth;
            if(width)
                gameWidth = width;

            var gameHeight = window.innerHeight;
            if(height)
                gameHeight = height;


            var originalRatio:number = this._stageProp.width / this._stageProp.height;
            var newRatio:number = gameWidth / gameHeight;

            if(newRatio > originalRatio)
            {
                gameWidth = gameHeight * originalRatio;
                this._canvas.style.height = gameHeight + "px";
                this._canvas.style.width = gameWidth + "px";
            }
            else
            {
                gameHeight = gameWidth / originalRatio;
                this._canvas.style.height = gameHeight + "px";
                this._canvas.style.width = gameWidth + "px";
            }


            var gameArea:HTMLElement = <HTMLElement> document.getElementById("gameContainer");
            gameArea.style.width = gameWidth + "px";
            gameArea.style.height = gameHeight + "px";

            var topPadding:number = (window.innerHeight - gameHeight) >> 1;
            gameArea.style.paddingTop = topPadding + "px";

            this._gameDimension.width = gameWidth;
            this._gameDimension.height = gameHeight;

            if(this._game)
            {
                this._game.updateGameDimension(this._gameDimension);
            }

        }

        private setUpRequestAnimationFrame():void
        {
            if("requestAnimationFrame" in window && "cancelAnimationFrame" in window)
            {
                Trace.log("requestAnimationFrame & cancelAnimationFrame already available! setup exit!");
                return;
            }

            var vendors:string[] = ["ms","moz", "webkit", "o"];
            for(var x:number = 0; x < vendors.length && !window["requestAnimationFrame"]; x++)
            {
                window["requestAnimationFrame"] = window[vendors[x]+"RequestAnimationFrame"];
                window["cancelAnimationFrame"] = window[vendors[x]+"CancelAnimationFrame"]
                    || window[vendors[x]+"CancelRequestAnimationFrame"];
            }


            if(window["requestAnimationFrame"])
            {
                Trace.log("requestAnimationFrame setup success! using.. " + vendors[x]);
            }


        }


    }

}

//////////////// JS ////////////////////////////

window.addEventListener("load", onLoad, false);


function onLoad(event)
{
    new com.goldenratio.Main();
}

