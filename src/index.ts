export type FuncNumberReturn = (arg0: number, arg1?: number) => Vector2;
export type CurveMethod =
  | "lamé"
  | "arc"
  | "pow"
  | "powY"
  | "powX"
  | "linear"
  | "easeInSine"
  | "easeOutSine"
  | "easeInOutSine"
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeInQuart"
  | "easeOutQuart"
  | "easeInOutQuart"
  | "easeInQuint"
  | "easeOutQuint"
  | "easeInOutQuint"
  | "easeInExpo"
  | "easeOutExpo"
  | "easeInOutExpo"
  | "easeInCirc"
  | "easeOutCirc"
  | "easeInOutCirc"
  | "random"
  | FuncNumberReturn;

export type ColorModel = "hsl" | "hsv" | "lch" | "oklch";
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

export type easingFunctionsType = {
  CurveMethod: (x: number, accentuation?: number) => number;
};

/*
 * Easing functions modified to work with an accentuation parameter that exaggerates the curve
 * the accentuation parameter is a number between 0 and 1 but was not tested very thoroughly
 * can probably be improved by chaning how the accentuation is applied in each type of easing function
 * https://gist.github.com/gre/1650294
 */
export const easingFunctions = {
  linear: (x: number): number => x,
  easeInSine: (x: number, accentuation = 0): number =>
    1 - Math.cos((x * Math.PI) / 2 + (accentuation * Math.PI) / 2),
  easeOutSine: (x: number, accentuation = 0): number =>
    Math.sin((x * Math.PI) / 2 + (accentuation * Math.PI) / 2),
  easeInOutSine: (x: number, accentuation = 0): number =>
    -(Math.cos((Math.PI * (x + accentuation)) / (1 + 2 * accentuation)) - 1) /
    2,
  easeInQuad: (x: number, accentuation = 0): number =>
    x * x + accentuation * x * (1 - x),
  easeOutQuad: (x: number, accentuation = 0): number =>
    1 - (1 - x) * (1 - x) - accentuation * x * (1 - x),
  easeInOutQuad: (x: number, accentuation = 0): number =>
    x < 0.5
      ? 2 * x * x + accentuation * x * (1 - 2 * x)
      : 1 -
        Math.pow(-2 * x + 2, 2) / 2 -
        accentuation * (2 * x - 1) * (1 - Math.pow(-2 * x + 2, 2) / 2),
  easeInCubic: (x: number, accentuation = 0): number =>
    x * x * x + accentuation * x * x * (1 - x),
  easeOutCubic: (x: number, accentuation = 0): number =>
    1 - Math.pow(1 - x, 3) - accentuation * Math.pow(1 - x, 2) * (1 - x),
  easeInOutCubic: (x: number, accentuation = 0): number =>
    x < 0.5
      ? 4 * x * x * x + accentuation * x * x * (1 - 2 * x)
      : 1 -
        Math.pow(-2 * x + 2, 3) / 2 -
        (accentuation * Math.pow(-2 * x + 2, 2) * (2 * x - 1)) / 2,
  easeInQuart: (x: number, accentuation = 0): number =>
    x * x * x * x + accentuation * x * x * x * (1 - x),
  easeOutQuart: (x: number, accentuation = 0): number =>
    1 - Math.pow(1 - x, 4) - accentuation * Math.pow(1 - x, 3) * (1 - x),
  easeInOutQuart: (x: number, accentuation = 0): number =>
    x < 0.5
      ? 8 * x * x * x * x + accentuation * x * x * x * (1 - 2 * x)
      : 1 -
        Math.pow(-2 * x + 2, 4) / 2 -
        (accentuation * Math.pow(-2 * x + 2, 3) * (2 * x - 1)) / 2,
  easeInQuint: (x: number, accentuation = 0): number =>
    x * x * x * x * x + accentuation * x * x * x * x * (1 - x),
  easeOutQuint: (x: number, accentuation = 0): number =>
    1 - Math.pow(1 - x, 5) - accentuation * Math.pow(1 - x, 4) * (1 - x),
  easeInOutQuint: (x: number, accentuation = 0): number =>
    x < 0.5
      ? 16 * x * x * x * x * x + accentuation * x * x * x * x * (1 - 2 * x)
      : 1 -
        Math.pow(-2 * x + 2, 5) / 2 -
        (accentuation * Math.pow(-2 * x + 2, 4) * (2 * x - 1)) / 2,
  easeInExpo: (x: number, accentuation = 0): number =>
    (x === 0 ? 0 : Math.pow(2, 10 * x - 10)) +
    accentuation * Math.pow(2, 10 * (x - 1)),
  easeOutExpo: (x: number, accentuation = 0): number =>
    (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)) -
    accentuation * (1 - Math.pow(2, -10 * x)),
  easeInOutExpo: (x: number, accentuation = 0): number => {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    if (x < 0.5) {
      return (
        Math.pow(2, 20 * x - 10) / 2 +
        (accentuation * Math.pow(2, 20 * x - 10)) / 2
      );
    }
    return (
      (2 - Math.pow(2, -20 * x + 10)) / 2 -
      (accentuation * (2 - Math.pow(2, -20 * x + 10))) / 2
    );
  },
  easeInCirc: (x: number, accentuation = 0): number =>
    1 -
    Math.sqrt(1 - Math.pow(x, 2)) +
    accentuation * Math.sqrt(1 - Math.pow(x, 2)),
  easeOutCirc: (x: number, accentuation = 0): number =>
    Math.sqrt(1 - Math.pow(x - 1, 2)) -
    accentuation * Math.sqrt(1 - Math.pow(x - 1, 2)),
  easeInOutCirc: (x: number, accentuation = 0): number => {
    if (x < 0.5) {
      return (
        (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 +
        (accentuation * (1 - Math.sqrt(1 - Math.pow(2 * x, 2)))) / 2
      );
    }
    return (
      (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2 -
      (accentuation * (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1)) / 2
    );
  },
  random: (): number => Math.random(),
};

const easingFunctionsKeys = Object.keys(easingFunctions);

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
    const modifiedPositions = curveMethod(percentile, curveAccent);
    x = modifiedPositions[0];
    y = modifiedPositions[1];
  } else if (easingFunctionsKeys.includes(curveMethod)) {
    x = percentile;
    y = 1 - easingFunctions[curveMethod](percentile, curveAccent * -1) || 0;
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
 * @param curveMethod: string 'lamé'|'arc'|'pow'|'powY'|'powX'|function > method used to generate the curve 
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

/**
 * functions to convert from the ramp's colors values to CSS color functions.
 */
const colorModsCSS = {
  oklch: (color) => [color[2], color[1] * 0.4, color[0]],
  lch: (color) => [color[2] * 100, color[1] * 150, color[0]],
  hsl: (color) => [color[0], color[1] * 100 + "%", color[2] * 100 + "%"],
};

export type colorToCSSxLCHMode = "oklch" | "lch" | "hsl";
/**
 * Converts Hxx (Hue, Chroma, Lightness) values to a CSS `oklch()` color function string.
 *
 * @param {Object} hxx - An object with hue, chroma, and lightness properties.
 * @param {number} hxx.hue - The hue value.
 * @param {number} hxx.chroma - The chroma value.
 * @param {number} hxx.lightness - The lightness value.
 * @returns {string} - The CSS color function string in the format `oklch(lightness% chroma hue)`.
 */

export const colorToCSS = (
  color: Vector3,
  mode: colorToCSSxLCHMode = "oklch"
): string => `${mode}(${colorModsCSS[mode](color).join(" ")})`;

export const generateRandomColorRampParams = {
  curveMethod: {
    default: "lamé",
    props: {
      options: ["lamé", "arc", "pow", "powY", "powX", ...easingFunctionsKeys],
    },
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
    props: { min: -0.25, max: 1, step: 0.001 },
  },
  minLight: {
    default: 0,
    props: { min: -0.25, max: 1, step: 0.001 },
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
