export declare type CurveMethod = 'lamé' | 'arc' | 'pow' | 'powY' | 'powX';
declare type Vector2 = [number, number];
declare type Vector3 = [number, number, number];
declare type MainFunctionArguments = {
    total?: number;
    centerHue?: number;
    hueCycle?: number;
    offsetTint?: number;
    offsetShade?: number;
    curveAccent?: number;
    tintShadeHueShift?: number;
    curveMethod?: CurveMethod;
    offsetCurveModTint?: number;
    offsetCurveModShade?: number;
    minSaturationLight?: Vector2;
    maxSaturationLight?: Vector2;
};
/**
 * function hsv2hsl
 * @param h {Number} hue value 0...360
 * @param s {Number} saturation 0...1
 * @param v {Number} value 0...1
 * @returns {Array} h:0...360 s:0...1 l:0...1
 */
export declare const hsv2hsl: (h: number, s: number, v: number, l?: number, m?: number) => Vector3;
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
export declare const pointOnCurve: (curveMethod: CurveMethod, i: number, total: number, curveAccent: number, min?: Vector2, max?: Vector2) => Vector2;
/**
 * generateRandomColorRamp()
 * @param total: int 3... > Amount of base colors.
 * @param centerHu: float 0...1 > 0 Red, 180 Teal etc..
 * @param hueCycle: float 0...1 > How much the color changes over the curve 0: not at all, 1: full rainbow
 * @param offsetTint: float  0...1 > Tint curve difference
 * @param offsetShade: float  0...1 > Shade curve difference
 * @param curveAccent: float  0...1 > How pronounced should the curve be, depends a lot on the curve method
 * @param tintShadeHueShift: float 0...1 > Shifts the colors for the shades and tints
 * @param curveMethod: string 'lamé'|'arc'|'pow'|'powY'|'powX' > method used to generate the curve
 * @param offsetCurveModTint: float 0...1 > amplifies the curveAccent of for the tint colors
 * @param offsetCurveModShade: float 0...1 > amplifies the curveAccent of for the shade colors
 * @param minSaturationLight: array [0...1, 0...1] > minium saturation and light of the generated colors
 * @param maxSaturationLight: array [0...1, 0...1] > maximum saturation and light of the generated colors
 * @returns Object {
    light: [[h,s,l]...], // tints
    dark: [[h,s,l]...], // shades
    base: [[h,s,l]...], // smedium colors
    all: [[h,s,l]...], // all colors
  }
*/
export default function generateRandomColorRamp({ total, centerHue, hueCycle, offsetTint, offsetShade, curveAccent, tintShadeHueShift, curveMethod, offsetCurveModTint, offsetCurveModShade, minSaturationLight, maxSaturationLight }?: MainFunctionArguments): {
    light: Vector3[];
    dark: Vector3[];
    base: Vector3[];
    all: Vector3[];
};
export {};
