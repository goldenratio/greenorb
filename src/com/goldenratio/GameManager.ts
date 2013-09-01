/**
 * Author: bear
 * Date: 8/28/13
 */

///<reference path='particle/BaseParticle.ts' />
///<reference path='particle/EnemyParticle.ts' />
///<reference path='geom/Rectangle.ts' />
///<reference path='Trace.ts' />
///<reference path='enums/EnemyType.ts' />
///<reference path='utils/Device.ts' />

module com.goldenratio
{
    export class GameManager
    {
        public static SPEED_SLOW:number = 3;
        public static SPEED_MEDIUM:number = 5;
        public static SPEED_HIGH:number = 7;

        public killHero:bool = false;
        public heroHealth:number = 100;
        public score:number = 0;
        public waveComplete:bool = false;

        private _spawnTimer:number = 0;
        private _waveCount:number = 0;
        private _enemySpeed:number = 2;
        private _enemyList:particle.EnemyParticle[] = [];

        constructor(public context:CanvasRenderingContext2D, public stageSize:geom.Rectangle)
        {

        }

        private startNewWave():void
        {

            this._spawnTimer = 0;

            if(this._waveCount == 8)
            {
                Trace.log("Game Complete!");
                this.waveComplete = true;
                return;
            }

            this._waveCount ++;

            Trace.log("starting new wave! " + this._waveCount);

            if(this._waveCount == 1 || this._waveCount == 2)
                this._enemySpeed = GameManager.SPEED_SLOW;
            else if(this._waveCount == 3 || this._waveCount == 4)
                this._enemySpeed = GameManager.SPEED_MEDIUM;
            else if(this._waveCount == 5 || this._waveCount == 6 || this._waveCount == 7 || this._waveCount == 8)
                this._enemySpeed = GameManager.SPEED_HIGH;



            this.waveComplete = false;
            this.spawnEnemies();
        }

        private spawnEnemies():void
        {
            Trace.log("init enemies!");
            var spawnCount:number = utils.Device.isMobileOS() ? 50 : 100;
            var distance:number = utils.Device.isMobileOS() ? 200 : 50;

            for(var i:number = 0; i < spawnCount; i++)
            {
                var enemy:particle.EnemyParticle = new particle.EnemyParticle(this.context);
                enemy.setPosition(((Math.random() * (this.stageSize.width - 40)) >> 0) + 20, -20);
                var color:string = this.getEnemyColor();
                enemy.setColor(color);
                enemy.canCollect = color == enums.EnemyType.GREEN;
                enemy.timeId = (i * 30) + ((Math.random() * distance) >> 0);
                this._enemyList.push(enemy);
            }
        }

        private getEnemyColor():string
        {
            var rnd:number = (Math.random() * 3) >> 0;
            if(rnd == 0)
                return enums.EnemyType.GREEN;
            else if(rnd == 1)
                return enums.EnemyType.BLUE;

            return enums.EnemyType.RED;
        }

        public update(heroBound:geom.Rectangle):void
        {
            //Trace.log(this._spawnTimer + ", " + this._enemyList.length);
            if(this.waveComplete)
                return;

            if(!this.killHero)
                this._spawnTimer++;


            for(var i:number = this._enemyList.length - 1; i >= 0; i--)
            {

                if(this._spawnTimer == this._enemyList[i].timeId && !this.killHero)
                {
                    this._enemyList[i].isSpawned = true;
                }

                if(!this._enemyList[i].isSpawned && this.killHero)
                {
                    this._enemyList[i].dispose();
                    this._enemyList[i] = null;
                    this._enemyList.splice(i, 1);

                    continue;
                }

                if(this._enemyList[i].isSpawned)
                {
                    if(!this._enemyList[i].canRemove)
                    {
                        var tx:number = this._enemyList[i].position.x;
                        var ty:number = this._enemyList[i].position.y;

                        if(ty < (this.stageSize.height + 20))
                        {
                            if(this._enemyList[i].isAlive)
                            {
                                this._enemyList[i].setPosition(tx, ty + this._enemySpeed);

                                if(heroBound && heroBound.isIntersecting(this._enemyList[i].getBounds()) && !this.killHero)
                                {
                                    this._enemyList[i].die();

                                    if(!this._enemyList[i].canCollect)
                                    {
                                        this.heroHealth -= 10;
                                        if(this.heroHealth <= 0)
                                        {
                                            this.killHero = true;
                                        }

                                    }
                                    else
                                    {
                                        // add that particle to hero.. score up
                                        this._enemyList[i].canRemove = true;
                                        this.score += 50;
                                    }
                                }

                            }

                            this._enemyList[i].update();

                        }
                        else
                        {
                            this._enemyList[i].canRemove = true;
                        }
                    }
                    else
                    {
                        this._enemyList[i].dispose();
                        this._enemyList[i] = null;
                        this._enemyList.splice(i, 1);
                    }
                }

            }

            if(this._enemyList.length == 0 && !this.killHero)
            {
                Trace.log("wave complete!");
                this.startNewWave();
            }
        }



        public dispose():void
        {
            for(var i:number = 0; i < this._enemyList.length; i++)
            {
                this._enemyList[i].dispose();
                this._enemyList[i] = null;
            }

            this._enemyList.length = 0;
            this._enemyList = null;

            this.context = null;
            this.stageSize = null;
        }
    }
}