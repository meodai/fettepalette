export type curveMethod = 'lamé'|'arc'|'pow'|'powY'|'powX';
type vector2 = [number, number];
type hsx = [number, number, number];

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
  l: number = v - v * s / 2, m = Math.min(l, 1 - l),
):hsx => [h, m ? (v - l) / m : 0, l];

/**
 * function random
 * @param min {Number} minimum number
 * @param max {Number} maximum number
 * @returns   {Number} number in given range
 */
export const random = (
  min: number, 
  max: number,
):number => {
  if (!max) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

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
  curveMethod:curveMethod,
  i:number,
  total:number,
  curveAccent:number,
  min:vector2         = [0, 0],
  max:vector2         = [1, 1],
):number[] => {
  const limit = Math.PI / 2;
  const slice = limit / total;

  let x:number, 
      y:number;

  if (curveMethod === 'lamé') {
    let t = i / total * limit;
    const exp = 2 / (2 + (20 * curveAccent));
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    x = Math.sign(cosT) * (Math.abs(cosT) ** exp);
    y = Math.sign(sinT) * (Math.abs(sinT) ** exp);
  } else if (curveMethod === 'arc') { // pow
    y = Math.cos(-Math.PI / 2 + i * slice + curveAccent);
    x = Math.sin(Math.PI / 2 + i * slice - curveAccent);
  } else if (curveMethod === 'pow') {
    x = Math.pow(1 - i / total, 1 - curveAccent);
    y = Math.pow(i / total, 1 - curveAccent);
  } else if (curveMethod === 'powY') {
    x = Math.pow(1 - i / total, curveAccent);
    y = Math.pow(i / total, 1 - curveAccent);
  } else if (curveMethod === 'powX') {
    x = Math.pow(i / total, curveAccent);
    y = Math.pow(i / total, 1 - curveAccent);
  }

  x = min[0] + Math.min(Math.max(x, 0), 1) * (max[0] - min[0]);
  y = min[1] + Math.min(Math.max(y, 0), 1) * (max[1] - min[1]);

  return [x, y];
}

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

// arc || lamé: https://observablehq.com/@daformat/draw-squircle-shapes-with-svg-javascript
  
export default function generateRandomColorRamp (
  total:number,
  centerHue:number           = 0,
  hueCycle:number            = 0.3,
  offsetTint:number          = 0.1,
  offsetShade:number         = 0.1,
  curveAccent:number         = 0,
  tintShadeHueShift:number   = 0.1,
  curveMethod:curveMethod    = 'arc', 
  offsetCurveModTint:number  = 0.03,
  offsetCurveModShade:number = 0.03,
  minSaturationLight:vector2 = [0, 0],
  maxSaturationLight:vector2 = [1, 1]
):{
  light: hsx[],
  dark: hsx[],
  base: hsx[],
  all: hsx[]
} {
  const baseColors = [];

  const lightColors = [];
  const darkColors = [];

  for (let i = 1; i < (total + 1); i++) {
    const [x, y] = pointOnCurve(curveMethod, i, total + 1, curveAccent, minSaturationLight, maxSaturationLight);
    const h = (360 + ((-180 * hueCycle) + (centerHue + i * (360 / (total + 1)) * hueCycle))) % 360;

    const hsl = hsv2hsl(
      h, x, y
    );

    baseColors.push(
      [
        hsl[0],
        hsl[1],
        hsl[2]
      ]
    );

    const [xl, yl] = pointOnCurve(
      curveMethod, 
      i, 
      total + 1, 
      curveAccent + offsetCurveModTint, 
      minSaturationLight, 
      maxSaturationLight
    );

    const hslLight = hsv2hsl(
      h, xl, yl
    );

    lightColors.push(
      [
        (h + 360 * tintShadeHueShift) % 360,
        hslLight[1] - offsetTint,
        hslLight[2] + offsetTint
      ]
    );

    const [xd, yd] = pointOnCurve(curveMethod, i, total + 1, curveAccent - offsetCurveModShade, minSaturationLight, maxSaturationLight);

    const hslDark = hsv2hsl(
      h, xd, yd
    );

    darkColors.push(
      [
        (360 + (h - 360 * tintShadeHueShift)) % 360,
        hslDark[1] - offsetShade,
        hslDark[2] - offsetShade
      ]
    );
  }

  return {
    light: lightColors,
    dark: darkColors,
    base: baseColors,
    all: [
      ...lightColors, 
      ...baseColors, 
      ...darkColors,
    ],
  }
}

/*
const PARAMS = {
  colors: 9,
  centerHue: 0,
  hueCycle: 0.3,
  offsetTint: 0.01,
  offsetShade: 0.01,
  curveAccent: 0,
  tintShadeHueShift: 0.01,
  colorMode: 'hsl',
  curveMethod: 'lamé', //arc, pow
  offsetCurveModTint: 0.03,
  offsetCurveModShade: 0.03,
  minSaturation: 0,
  minLight: 0,
  maxSaturation: 1,
  maxLight: 1,
};

// `min` and `max`: slider
pane.addInput(
  PARAMS, 'colors', {
    min: 3,
    max: 35,
    step: 1
  }
);

pane.addInput(
  PARAMS, 'centerHue', {
    min: 0,
    max: 360,
    step: 0.1
  }
);

pane.addInput(
  PARAMS, 'hueCycle', {
    min: 0,
    max: 1.5,
    step: 0.001
  }
);

pane.addInput(PARAMS, 'curveMethod', {
  options: {
    lamé: 'lamé',
    arc: 'arc',
    pow: 'pow',
    powY: 'powY',
    powX: 'powX',
  },
});

pane.addInput(
  PARAMS, 'curveAccent', {
    min: -0.095,
    max: 1,
    step: 0.001
  }
);


pane.addInput(
  PARAMS, 'offsetTint', {
    min: 0,
    max: 0.4,
    step: 0.001
  }
);


pane.addInput(
  PARAMS, 'offsetShade', {
    min: 0,
    max: 0.4,
    step: 0.001
  }
);

pane.addInput(
  PARAMS, 'offsetCurveModTint', {
    min: 0,
    max: 0.4,
    step: 0.0001
  }
);


pane.addInput(
  PARAMS, 'offsetCurveModShade', {
    min: 0,
    max: 0.4,
    step: 0.0001
  }
);


pane.addInput(
  PARAMS, 'tintShadeHueShift', {
    min: 0,
    max: 1,
    step: 0.001
  }
);

pane.addInput(
  PARAMS, 'minSaturation', {
    min: 0,
    max: 1,
    step: 0.001
  }
);
pane.addInput(
  PARAMS, 'minLight', {
    min: 0,
    max: 1,
    step: 0.001
  }
);

pane.addInput(
  PARAMS, 'maxSaturation', {
    min: 0,
    max: 1,
    step: 0.001
  }
);
pane.addInput(
  PARAMS, 'maxLight', {
    min: 0,
    max: 1,
    step: 0.001
  }
);
*/