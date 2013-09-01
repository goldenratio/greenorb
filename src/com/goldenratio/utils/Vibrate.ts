/**
 * Author: bear
 * Date: 8/29/13
 */


module com.goldenratio.utils
{
    export class Vibrate
    {

        public static playerDie():void
        {
            if("vibrate" in navigator)
            {
                navigator["vibrate"](60);
            }
        }
    }
}