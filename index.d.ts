export declare type curveMethod = 'lamé' | 'arc' | 'pow' | 'powY' | 'powX';
declare type vector2 = [number, number];
declare type hsx = [number, number, number];
/**
 * function hsv2hsl
 * @param h {Number} hue value 0...360
 * @param s {Number} saturation 0...1
 * @param v {Number} value 0...1
 * @returns {Array} h:0...360 s:0...1 l:0...1
 */
export declare const hsv2hsl: (h: number, s: number, v: number, l?: number, m?: number) => hsx;
/**
 * function random
 * @param min {Number} minimum number
 * @param max {Number} maximum number
 * @returns   {Number} number in given range
 */
export declare const random: (min: number, max: number) => number;
/**
 * function pointOnCurve
 * @param curveMethod {String} Defines how the curve is drawn
 * @param i           {Number} Point in curve (used in iteration)
 * @param total       {Number} Total amount of points
 * @param curveAccent {Number} Modifier used for the the curveMethod
 * @param min         {Number} Start of the curve [0...1, 0...1]
 * @param max         {Number} Stop of the curve [0...1, 0...1]
 * @returns           {Array} Vector on curve x, y
 */
export declare const pointOnCurve: (curveMethod: curveMethod, i: number, total: number, curveAccent: number, min?: vector2, max?: vector2) => number[];
/**
 * generateRandomColorRamp()
 * @param total
 * @param centerHue
 * @param hueCycle
 * @param offsetTint
 * @param offsetShade
 * @param curveAccent
 * @param tintShadeHueShift
 * @param curveMethod
 * @param offsetCurveModTint
 * @param offsetCurveModShade
 * @param minSaturationLight
 * @param maxSaturationLight
 * @returns
 */
export default function generateRandomColorRamp(total: number, centerHue?: number, hueCycle?: number, offsetTint?: number, offsetShade?: number, curveAccent?: number, tintShadeHueShift?: number, curveMethod?: curveMethod, offsetCurveModTint?: number, offsetCurveModShade?: number, minSaturationLight?: vector2, maxSaturationLight?: vector2): {
    light: hsx[];
    dark: hsx[];
    base: hsx[];
    all: hsx[];
};
export {};
