/**
 * Author: bear
 * Date: 8/25/13
 */


module com.goldenratio
{
    export class Trace
    {

        public static DEBUG:bool = true;

        public static log(...args: any[]):void
        {
            if(DEBUG == true)
            {
                console.log("[LOG] " + args.join());
            }
        }

    }

}