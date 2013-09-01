/**
 * Author: bear
 * Date: 8/25/13
 */


interface Touch
{
    identifier:number;
    target:EventTarget;
    screenX:number;
    screenY:number;
    clientX:number;
    clientY:number;
    pageX:number;
    pageY:number;

    // events
    touchstart: () => any;
    touchmove: () => any;
    touchend: () => any;
}


interface TouchList
{
    length:number;
    item (index:number):Touch;
    identifiedTouch(identifier:number):Touch;
}


interface TouchEvent extends UIEvent
{
    touches:TouchList;
    targetTouches:TouchList;
    changedTouches:TouchList;
    altKey:bool;
    metaKey:bool;
    ctrlKey:bool;
    shiftKey:bool;
    initTouchEvent (type:string, canBubble:bool, cancelable:bool, view:AbstractView, detail:number, ctrlKey:bool, altKey:bool, shiftKey:bool, metaKey:bool, touches:TouchList, targetTouches:TouchList, changedTouches:TouchList);
}