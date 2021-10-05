export type FuncNumberReturn = (arg0: number) => Vector2;
export type CurveMethod =
  | "lamé"
  | "arc"
  | "pow"
  | "powY"
  | "powX"
  | FuncNumberReturn;
export type ColorModel = "hsl" | "hsv";
export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type GenerateRandomColorRampArgument = {
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
  colorModel?: ColorModel;
};

/**
 * function hsv2hsl
 * @param h {Number} hue value 0...360
 * @param s {Number} saturation 0...1
 * @param v {Number} value 0...1
 * @returns {Array} h:0...360 s:0...1 l:0...1
 */
export const hsv2hsl = (
  h: number,
  s: number,
  v: number,
  l: number = v - (v * s) / 2,
  m: number = Math.min(l, 1 - l)
): Vector3 => [h, m ? (v - l) / m : 0, l];

/**
 * function hsv2hsx
 * @param h {Number} hue value 0...360
 * @param s {Number} saturation 0...1
 * @param v {Number} value 0...1
 * @returns {Array} h:0...360 s:0...1 l:0...1
 */
export const hsv2hsx = (
  h: number,
  s: number,
  v: number,
  mode: ColorModel
): Vector3 => (mode === "hsl" ? hsv2hsl(h, s, v) : [h, s, v]);

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
export const pointOnCurve = (
  curveMethod: CurveMethod,
  i: number,
  total: number,
  curveAccent: number,
  min: Vector2 = [0, 0],
  max: Vector2 = [1, 1]
): Vector2 => {
  const limit = Math.PI / 2;
  const slice = limit / total;
  const percentile = i / total;

  let x = 0,
    y = 0;

  if (curveMethod === "lamé") {
    const t = percentile * limit;
    const exp = 2 / (2 + 20 * curveAccent);
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    x = Math.sign(cosT) * Math.abs(cosT) ** exp;
    y = Math.sign(sinT) * Math.abs(sinT) ** exp;
  } else if (curveMethod === "arc") {
    y = Math.cos(-Math.PI / 2 + i * slice + curveAccent);
    x = Math.sin(Math.PI / 2 + i * slice - curveAccent);
  } else if (curveMethod === "pow") {
    x = Math.pow(1 - percentile, 1 - curveAccent);
    y = Math.pow(percentile, 1 - curveAccent);
  } else if (curveMethod === "powY") {
    x = Math.pow(1 - percentile, curveAccent);
    y = Math.pow(percentile, 1 - curveAccent);
  } else if (curveMethod === "powX") {
    x = Math.pow(percentile, curveAccent);
    y = Math.pow(percentile, 1 - curveAccent);
  } else if (typeof curveMethod === "function") {
    x = curveMethod(percentile)[0];
    y = curveMethod(percentile)[1];
  } else {
    throw new Error(
      `pointOnCurve() curveAccent parameter is expected to be "lamé" | "arc" | "pow" | "powY" | "powX" or a function but \`${curveMethod}\` given.`
    );
  }

  x = min[0] + Math.min(Math.max(x, 0), 1) * (max[0] - min[0]);
  y = min[1] + Math.min(Math.max(y, 0), 1) * (max[1] - min[1]);

  return [x, y];
};

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

// arc || lamé: https://observablehq.com/@daformat/draw-squircle-shapes-with-svg-javascript

export function generateRandomColorRamp({
  total = 3,
  centerHue = 0,
  hueCycle = 0.3,
  offsetTint = 0.1,
  offsetShade = 0.1,
  curveAccent = 0,
  tintShadeHueShift = 0.1,
  curveMethod = "arc",
  offsetCurveModTint = 0.03,
  offsetCurveModShade = 0.03,
  minSaturationLight = [0, 0],
  maxSaturationLight = [1, 1],
  colorModel = "hsl",
}: GenerateRandomColorRampArgument = {}): {
  light: Vector3[];
  dark: Vector3[];
  base: Vector3[];
  all: Vector3[];
} {
  const baseColors: Vector3[] = [];
  const lightColors: Vector3[] = [];
  const darkColors: Vector3[] = [];

  for (let i = 1; i < total + 1; i++) {
    const [x, y] = pointOnCurve(
      curveMethod,
      i,
      total + 1,
      curveAccent,
      minSaturationLight,
      maxSaturationLight
    );
    const h =
      (360 +
        (-180 * hueCycle + (centerHue + i * (360 / (total + 1)) * hueCycle))) %
      360;

    const hsl = hsv2hsx(h, x, y, colorModel);

    baseColors.push(hsl);

    const [xl, yl] = pointOnCurve(
      curveMethod,
      i,
      total + 1,
      curveAccent + offsetCurveModTint,
      minSaturationLight,
      maxSaturationLight
    );

    const hslLight = hsv2hsx(h, xl, yl, colorModel);

    lightColors.push([
      (h + 360 * tintShadeHueShift) % 360,
      hslLight[1] - offsetTint,
      hslLight[2] + offsetTint,
    ]);

    const [xd, yd] = pointOnCurve(
      curveMethod,
      i,
      total + 1,
      curveAccent - offsetCurveModShade,
      minSaturationLight,
      maxSaturationLight
    );

    const hslDark = hsv2hsx(h, xd, yd, colorModel);

    darkColors.push([
      (360 + (h - 360 * tintShadeHueShift)) % 360,
      hslDark[1] - offsetShade,
      hslDark[2] - offsetShade,
    ]);
  }

  return {
    light: lightColors,
    dark: darkColors,
    base: baseColors,
    all: [...lightColors, ...baseColors, ...darkColors],
  };
}

export const generateRandomColorRampParams = {
  curveMethod: {
    default: "lamé",
    props: { options: ["lamé", "arc", "pow", "powY", "powX"] },
  },
  curveAccent: {
    default: 0,
    props: { min: -0.095, max: 1, step: 0.001 },
  },
  total: {
    default: 9,
    props: { min: 3, max: 35, step: 1 },
  },
  centerHue: {
    default: 0,
    props: { min: 0, max: 360, step: 0.1 },
  },
  hueCycle: {
    default: 0.3,
    props: { min: -1.25, max: 1.5, step: 0.001 },
  },
  offsetTint: {
    default: 0.01,
    props: { min: 0, max: 0.4, step: 0.001 },
  },
  offsetShade: {
    default: 0.01,
    props: { min: 0, max: 0.4, step: 0.001 },
  },
  tintShadeHueShift: {
    default: 0.01,
    props: { min: 0, max: 1, step: 0.001 },
  },
  offsetCurveModTint: {
    default: 0.03,
    props: { min: 0, max: 0.4, step: 0.0001 },
  },
  offsetCurveModShade: {
    default: 0.03,
    props: { min: 0, max: 0.4, step: 0.0001 },
  },
  minSaturation: {
    default: 0,
    props: { min: 0, max: 1, step: 0.001 },
  },
  minLight: {
    default: 0,
    props: { min: 0, max: 1, step: 0.001 },
  },
  maxSaturation: {
    default: 1,
    props: { min: 0, max: 1, step: 0.001 },
  },
  maxLight: {
    default: 1,
    props: { min: 0, max: 1, step: 0.001 },
  },
};
