/**
 * Author: bear
 * Date: 8/31/13
 */

///<reference path='geom/Rectangle.ts' />

module com.goldenratio
{
    export class SpriteData
    {
        constructor(public sourceRect:geom.Rectangle)
        {

        }
    }

    export class Res
    {

        public static gfxSprite:HTMLImageElement;

        public static data_0():SpriteData
        {
            return new SpriteData(new geom.Rectangle(6, 13, 9, 9));
        }

        public static data_1():SpriteData
        {
            return new SpriteData(new geom.Rectangle(20, 13, 5, 9));
        }

        public static data_2():SpriteData
        {
            return new SpriteData(new geom.Rectangle(30, 13, 9, 9));
        }

        public static data_3():SpriteData
        {
            return new SpriteData(new geom.Rectangle(45, 13, 8, 9));
        }

        public static data_4():SpriteData
        {
            return new SpriteData(new geom.Rectangle(58, 13, 10, 9));
        }

        public static data_5():SpriteData
        {
            return new SpriteData(new geom.Rectangle(73, 13, 8, 9));
        }

        public static data_6():SpriteData
        {
            return new SpriteData(new geom.Rectangle(87, 13, 8, 9));
        }

        public static data_7():SpriteData
        {
            return new SpriteData(new geom.Rectangle(101, 13, 8, 9));
        }

        public static data_8():SpriteData
        {
            return new SpriteData(new geom.Rectangle(114, 13, 9, 9));
        }

        public static data_9():SpriteData
        {
            return new SpriteData(new geom.Rectangle(128, 13, 9, 9));
        }

        public static data_game():SpriteData
        {
            return new SpriteData(new geom.Rectangle(8, 28, 221, 53));
        }

        public static data_over():SpriteData
        {
            return new SpriteData(new geom.Rectangle(8, 93, 206, 53));
        }

        public static data_click_to_continue():SpriteData
        {
            return new SpriteData(new geom.Rectangle(8, 155, 140, 9));
        }

        public static data_tap_to_continue():SpriteData
        {
            return new SpriteData(new geom.Rectangle(8, 168, 128, 9));
        }

        public static data_tap_to_start():SpriteData
        {
            return new SpriteData(new geom.Rectangle(152, 168, 104, 9));
        }

        public static data_click_to_start():SpriteData
        {
            return new SpriteData(new geom.Rectangle(152, 155, 116, 9));
        }

        public static data_you():SpriteData
        {
            return new SpriteData(new geom.Rectangle(8, 184, 152, 53));
        }

        public static data_win():SpriteData
        {
            return new SpriteData(new geom.Rectangle(161, 184, 159, 53));
        }

        public static data_click_to_resume():SpriteData
        {
            return new SpriteData(new geom.Rectangle(8, 245, 128, 9));
        }

        public static data_tap_to_resume():SpriteData
        {
            return new SpriteData(new geom.Rectangle(148, 245, 116, 9));
        }

        public static data_title_green_orb():SpriteData
        {
            return new SpriteData(new geom.Rectangle(25, 267, 219, 149));
        }
    }
}