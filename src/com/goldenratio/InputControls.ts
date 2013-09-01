/**
 * Author: bear
 * Date: 8/24/13
 */

/**
 * Responsible to handle input controls ("touch move and keyboard")
  */

///<reference path='../../../definitions/touch.d.ts' />
///<reference path='Trace.ts' />
///<reference path='geom/Rectangle.ts' />
///<reference path='geom/Point.ts' />

module com.goldenratio
{
    export class InputControls
    {
        private _gameDimension:geom.Rectangle;

        // initial player position
        public playerPosition:geom.Point = new geom.Point(162, 380);
        public isActive:bool = false;
        public isPaused:bool = false;

        private _isLeft:bool = false;
        private _isRight:bool = false;
        private _isUp:bool = false;
        private _isDown:bool = false;

        private _velocity:geom.Point = new geom.Point(0, 0);
        private _speed:number = 0.3;
        private _friction:number = 0.93;
        private _maxSpeed:number = 4;

        // bind
        private onTouchMoveBind:any;
        private onTouchEndBind:any;
        private onTouchStartBind:any;
        private onStageClickBind:any;

        private onKeyDownBind:any;
        private onKeyUpBind:any;

        private onWindowBlurBind:any;

        constructor(public canvas:HTMLCanvasElement)
        {
            this.bindHandlers();

            canvas.addEventListener("touchmove", this.onTouchMoveBind, false);
            canvas.addEventListener("touchend", this.onTouchEndBind, false);
            canvas.addEventListener("touchstart", this.onTouchStartBind, false);
            //canvas.addEventListener("click", this.onStageClickBind, false);

            document.addEventListener("keydown", this.onKeyDownBind, false);
            document.addEventListener("keyup", this.onKeyUpBind, false);

            window.addEventListener("blur", this.onWindowBlurBind, false);

        }

        private bindHandlers():void
        {
            this.onTouchMoveBind = this.onTouchMove.bind(this);
            this.onTouchStartBind = this.onTouchStart.bind(this);
            this.onTouchEndBind = this.onTouchEnd.bind(this);

            this.onKeyDownBind = this.onKeyDown.bind(this);
            this.onKeyUpBind = this.onKeyUp.bind(this);

            this.onWindowBlurBind = this.onWindowBlur.bind(this);
            this.onStageClickBind = this.onStageClick.bind(this);
        }

        public removeBlurListener():void
        {
            window.removeEventListener("blur", this.onWindowBlurBind, false);
        }

        private onWindowBlur(event:Event):void
        {
            this.isPaused = true;
            this.canvas.addEventListener("click", this.onStageClickBind, false);
        }

        private onStageClick(event:MouseEvent):void
        {
            Trace.log("click");
            this.isPaused = false;
            this.canvas.removeEventListener("click", this.onStageClickBind, false);
        }

        private onKeyDown(event:KeyboardEvent):void
        {
            var validKey:bool = false;
            if(event.keyCode == 39) // right arrow
            {
                this._isLeft = false;
                this._isRight = true;
                validKey = true;
            }
            else if(event.keyCode == 37) // left arrow
            {
                this._isRight = false;
                this._isLeft = true;
                validKey = true;
            }

            if(event.keyCode == 38) // up arrow
            {
                this._isUp = true;
                this._isDown = false;
                validKey = true;
            }
            else if(event.keyCode == 40) // down arrow
            {
                this._isDown = true;
                this._isUp = false;
                validKey = true;
            }

            if(validKey)
            {
                event.preventDefault();
            }
        }

        private onKeyUp(event:KeyboardEvent):void
        {
            var validKey:bool = false;
            if(event.keyCode == 39) // right arrow
            {
                this._isRight = false;
                validKey = true;
            }
            else if(event.keyCode == 37) // left arrow
            {
                this._isLeft = false;
                validKey = true;
            }

            if(event.keyCode == 38) // up arrow
            {
                this._isUp = false;
                validKey = true;
            }
            else if(event.keyCode == 40) // down arrow
            {
                this._isDown = false;
                validKey = true;
            }

            if(validKey)
            {
                event.preventDefault();
            }
        }

        private onTouchMove(event:TouchEvent):void
        {
            if(event.targetTouches.length == 1)
            {
                var touch:Touch = event.targetTouches[0];
                //Trace.log(" >> " + touch.pageX + ", " + touch.pageY);

                this.isActive = true;
                this.playerPosition.x = (((touch.pageX - this.canvas.offsetLeft) / this._gameDimension.width) * 320) >> 0;
                this.playerPosition.y = (((touch.pageY - this.canvas.offsetTop) / this._gameDimension.height) * 460) >> 0;

                this.playerPosition.y -= 60; // position our hero abit above finger

                //Trace.log(this.playerPosition.x + ", " + this.playerPosition.y);

            }

            event.preventDefault();

        }

        private onTouchEnd(event:TouchEvent):void
        {
            event.preventDefault();

            if(this.isPaused)
            {
                this.isPaused = false;
                return;
            }
        }

        private onTouchStart(event:TouchEvent):void
        {
            if( navigator.userAgent.match(/Android/i) )
            {
                event.preventDefault();
            }

            if(this.isPaused)
            {
                this.isPaused = false;
                return;
            }

            this.onTouchMoveBind(event);


        }

        public updateGameDimension(gameDimension:geom.Rectangle):void
        {
            this._gameDimension = gameDimension;
        }


        public update():void
        {

            if(this.playerPosition.x < 10)
            {
                this._velocity.x = 0;
                this.playerPosition.x = 10;
                return;
            }

            if(this.playerPosition.x > 310)
            {
                this._velocity.x = 0;
                this.playerPosition.x = 310;
                return;
            }

            if(this.playerPosition.y > 450)
            {
                this._velocity.y = 0;
                this.playerPosition.y = 450;
                return;
            }

            if(this.playerPosition.y < 10)
            {
                this._velocity.y = 0;
                this.playerPosition.y = 10;
                return;
            }

            if(this._isDown)
            {
                this._velocity.y += this._speed;
            }
            else if(this._isUp)
            {
                this._velocity.y -= this._speed;
            }
            else
            {
                this._velocity.y *= this._friction;
            }

            if(this._isLeft)
            {
                this._velocity.x -= this._speed;
            }
            else if(this._isRight)
            {
                this._velocity.x += this._speed;
            }
            else
            {
                this._velocity.x *= this._friction;
            }

            this.playerPosition.x += this._velocity.x;
            this.playerPosition.y += this._velocity.y;

            if(this._velocity.x > this._maxSpeed)
                this._velocity.x = this._maxSpeed;
            else if(this._velocity.x < -this._maxSpeed)
                this._velocity.x = -this._maxSpeed;

            if(this._velocity.y > this._maxSpeed)
                this._velocity.y = this._maxSpeed;
            else if(this._velocity.y < -this._maxSpeed)
                this._velocity.y = -this._maxSpeed;

        }

        public dispose():void
        {
            if(this.canvas)
            {
                this.canvas.removeEventListener("touchmove", this.onTouchMoveBind, false);
                this.canvas.removeEventListener("touchend", this.onTouchEndBind, false);
                this.canvas.removeEventListener("touchstart", this.onTouchStartBind, false);
                this.canvas.removeEventListener("click", this.onStageClickBind, false);
            }

            document.removeEventListener("keydown", this.onKeyDownBind, false);
            document.removeEventListener("keyup", this.onKeyUpBind, false);

            window.removeEventListener("blur", this.onWindowBlurBind, false);


            this.canvas = null;
            this.playerPosition = null;
            this._velocity = null;
            this._gameDimension = null;

            this.onTouchMoveBind = null;
            this.onTouchStartBind = null;
            this.onTouchEndBind = null;

            this.onKeyDownBind = null;
            this.onKeyUpBind = null;

            this.onWindowBlurBind = null;
            this.onStageClickBind = null;
        }
    }
}