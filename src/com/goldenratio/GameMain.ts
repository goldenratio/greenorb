/**
 * Author: bear
 * Date: 8/24/13
 */

///<reference path='geom/Rectangle.ts' />
///<reference path='InputControls.ts' />
///<reference path='particle/HeroParticle.ts' />
///<reference path='Trace.ts' />
///<reference path='utils/Device.ts' />
///<reference path='GameManager.ts' />
///<reference path='elements/GameBackground.ts' />
///<reference path='elements/HealthBar.ts' />
///<reference path='elements/ScoreView.ts' />
///<reference path='elements/GameOverView.ts' />
///<reference path='Res.ts' />

module com.goldenratio
{
    export class GameMain
    {
        private _isRAF:bool = false;
        private _canvas:HTMLCanvasElement;
        private _context:CanvasRenderingContext2D;
        private _frameRateID:number;

        private _stageProp:geom.Rectangle;
        private _gameDimension:geom.Rectangle;

        private _inputControls:InputControls;
        private _gameManager:GameManager;
        private _hero:particle.HeroParticle;

        private _gameBackground:elements.GameBackground;
        private _healthBar:elements.HealthBar;
        private _score:elements.ScoreView;
        private _gameOver:elements.GameOverView;

        private _pauseTextPosition:geom.Point = new geom.Point(90, 200);
        private _pauseSourceRect:geom.Rectangle;

        // binds
        private updateBind:any;


        constructor(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D, stageProp:geom.Rectangle, gameDimension:geom.Rectangle)
        {
            this._canvas = canvas;
            this._context = context;
            this._stageProp = stageProp;
            this._gameDimension = gameDimension;

            Trace.log(this._stageProp.toString());
            Trace.log(navigator.userAgent);

            if(window["requestAnimationFrame"])
            {
                Trace.log("using RAF");
                this._isRAF = true;
            }
            this.bindHandlers();

            this.init();
            this.update();
        }

        private init():void
        {
            this._pauseSourceRect = utils.Device.isTouchDevice() ? Res.data_tap_to_resume().sourceRect : Res.data_click_to_resume().sourceRect;

            this._inputControls = new InputControls(this._canvas);
            this._inputControls.updateGameDimension(this._gameDimension);

            this._gameBackground = new elements.GameBackground(this._context, this._stageProp);
            this._hero = new particle.HeroParticle(this._context);
            this._gameManager = new GameManager(this._context, this._stageProp);

            this._healthBar = new elements.HealthBar(this._context);
            this._score = new elements.ScoreView(this._context);
            this._gameOver = new elements.GameOverView(this._context, this._canvas);
        }

        private bindHandlers():void
        {
            this.updateBind = this.update.bind(this);
        }

        public dispose():void
        {
            this._isRAF ? window["cancelAnimationFrame"](this._frameRateID) : window.clearTimeout(this._frameRateID);

            if(this._inputControls)
            {
                this._inputControls.dispose();
                this._inputControls = null;
            }

            if(this._gameBackground)
            {
                this._gameBackground.dispose();
                this._gameBackground = null;
            }

            if(this._healthBar)
            {
                this._healthBar.dispose();
                this._healthBar = null;
            }

            if(this._hero)
            {
                this._hero.dispose();
                this._hero = null;
            }

            if(this._gameManager)
            {
                this._gameManager.dispose();
                this._gameManager = null;
            }

            if(this._score)
            {
                this._score.dispose();
                this._score = null;
            }

            if(this._gameOver)
            {
                this._gameOver.dispose();
                this._gameOver = null;
            }

            this._pauseTextPosition = null;
            this._pauseSourceRect = null;

            this._context = null;
            this._canvas = null;

            this._stageProp = null;
            this._gameDimension = null;
            this.updateBind = null;
        }

        public updateGameDimension(dimension:geom.Rectangle):void
        {
            if(this._inputControls)
            {
                this._inputControls.updateGameDimension(dimension);
            }
        }

        private update():void
        {

            if(this._inputControls && this._inputControls.isPaused)
            {
                this._context.drawImage(Res.gfxSprite, this._pauseSourceRect.x, this._pauseSourceRect.y, this._pauseSourceRect.width, this._pauseSourceRect.height,
                    this._pauseTextPosition.x, this._pauseTextPosition.y, this._pauseSourceRect.width, this._pauseSourceRect.height);

                this._frameRateID = this._isRAF ? window["requestAnimationFrame"](this.updateBind) : window.setTimeout(this.updateBind, 17);
                return;
            }

            this._context.globalCompositeOperation = "source-over";
            this._context.fillStyle = "rgba(0, 0, 0, 0.4)";
            this._context.fillRect(0, 0, this._stageProp.width, this._stageProp.height);

            this._context.globalCompositeOperation = "lighter";


            if(this._inputControls)
            {
                this._inputControls.update();
            }

            if(this._gameBackground)
            {
                this._gameBackground.update();
            }


            if(this._hero)
            {
                if(this._hero.isAlive && this._inputControls)
                {
                    this._hero.setPosition(this._inputControls.playerPosition.x, this._inputControls.playerPosition.y);
                }

                this._hero.update();

                if(this._hero.canRemove)
                {
                    this._hero.dispose();
                    this._hero = null;

                    if(this._inputControls)
                    {
                        this._inputControls.dispose();
                        this._inputControls = null;
                    }
                }

            }

            if(this._gameManager)
            {
                var heroBound:geom.Rectangle = null;
                if(this._hero)
                {
                    heroBound = this._hero.getBounds();
                }
                this._gameManager.update(heroBound);

                if(this._hero && this._gameManager.killHero && this._hero.isAlive)
                {
                    this._hero.die();
                }

                if(this._inputControls && this._gameManager.waveComplete)
                {
                    this._inputControls.dispose();
                    this._inputControls = null;
                }
            }

            if(this._healthBar && this._gameManager)
            {
                this._healthBar.update(this._gameManager.heroHealth);
            }

            if(this._score)
            {
                this._score.update(this._gameManager.score);
            }

            if((this._gameOver && this._gameManager.killHero) || this._gameManager.waveComplete)
            {
                this._gameOver.youWin(this._gameManager.waveComplete);
                this._gameOver.update();
            }

            this._frameRateID = this._isRAF ? window["requestAnimationFrame"](this.updateBind) : window.setTimeout(this.updateBind, 17);

        }


    }

}


