/**
 * Author: bear
 * Date: 8/26/13
 */

module com.goldenratio.utils
{
    export class Device
    {
        public static isTouchDevice():bool
        {
            if("ontouchstart" in window)
                return true;

            return false;
        }

        public static isMobileOS():bool
        {
            if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
                || navigator.userAgent.match(/Mobile/i)
                || navigator.userAgent.match(/Tablet/i)
                )
            {
                return true;
            }


            return  false;
        }

        public static isFirefoxAndroid():bool
        {
            if(navigator.userAgent.match(/Android/i)
                && navigator.userAgent.match(/Firefox/i))
            {
                return true;
            }

            return false;
        }

    }

}