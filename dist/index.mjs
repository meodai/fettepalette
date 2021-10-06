// src/index.ts
var hsv2hsl = (h, s, v, l = v - v * s / 2, m = Math.min(l, 1 - l)) => [h, m ? (v - l) / m : 0, l];
var hsv2hsx = (h, s, v, mode) => mode === "hsl" ? hsv2hsl(h, s, v) : [h, s, v];
var pointOnCurve = (curveMethod, i, total, curveAccent, min = [0, 0], max = [1, 1]) => {
  const limit = Math.PI / 2;
  const slice = limit / total;
  const percentile = i / total;
  let x = 0, y = 0;
  if (curveMethod === "lam\xE9") {
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
    throw new Error(`pointOnCurve() curveAccent parameter is expected to be "lam\xE9" | "arc" | "pow" | "powY" | "powX" or a function but \`${curveMethod}\` given.`);
  }
  x = min[0] + Math.min(Math.max(x, 0), 1) * (max[0] - min[0]);
  y = min[1] + Math.min(Math.max(y, 0), 1) * (max[1] - min[1]);
  return [x, y];
};
function generateRandomColorRamp({
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
  colorModel = "hsl"
} = {}) {
  const baseColors = [];
  const lightColors = [];
  const darkColors = [];
  for (let i = 1; i < total + 1; i++) {
    const [x, y] = pointOnCurve(curveMethod, i, total + 1, curveAccent, minSaturationLight, maxSaturationLight);
    const h = (360 + (-180 * hueCycle + (centerHue + i * (360 / (total + 1)) * hueCycle))) % 360;
    const hsl = hsv2hsx(h, x, y, colorModel);
    baseColors.push(hsl);
    const [xl, yl] = pointOnCurve(curveMethod, i, total + 1, curveAccent + offsetCurveModTint, minSaturationLight, maxSaturationLight);
    const hslLight = hsv2hsx(h, xl, yl, colorModel);
    lightColors.push([
      (h + 360 * tintShadeHueShift) % 360,
      hslLight[1] - offsetTint,
      hslLight[2] + offsetTint
    ]);
    const [xd, yd] = pointOnCurve(curveMethod, i, total + 1, curveAccent - offsetCurveModShade, minSaturationLight, maxSaturationLight);
    const hslDark = hsv2hsx(h, xd, yd, colorModel);
    darkColors.push([
      (360 + (h - 360 * tintShadeHueShift)) % 360,
      hslDark[1] - offsetShade,
      hslDark[2] - offsetShade
    ]);
  }
  return {
    light: lightColors,
    dark: darkColors,
    base: baseColors,
    all: [...lightColors, ...baseColors, ...darkColors]
  };
}
var generateRandomColorRampParams = {
  curveMethod: {
    default: "lam\xE9",
    props: { options: ["lam\xE9", "arc", "pow", "powY", "powX"] }
  },
  curveAccent: {
    default: 0,
    props: { min: -0.095, max: 1, step: 1e-3 }
  },
  total: {
    default: 9,
    props: { min: 3, max: 35, step: 1 }
  },
  centerHue: {
    default: 0,
    props: { min: 0, max: 360, step: 0.1 }
  },
  hueCycle: {
    default: 0.3,
    props: { min: -1.25, max: 1.5, step: 1e-3 }
  },
  offsetTint: {
    default: 0.01,
    props: { min: 0, max: 0.4, step: 1e-3 }
  },
  offsetShade: {
    default: 0.01,
    props: { min: 0, max: 0.4, step: 1e-3 }
  },
  tintShadeHueShift: {
    default: 0.01,
    props: { min: 0, max: 1, step: 1e-3 }
  },
  offsetCurveModTint: {
    default: 0.03,
    props: { min: 0, max: 0.4, step: 1e-4 }
  },
  offsetCurveModShade: {
    default: 0.03,
    props: { min: 0, max: 0.4, step: 1e-4 }
  },
  minSaturation: {
    default: 0,
    props: { min: 0, max: 1, step: 1e-3 }
  },
  minLight: {
    default: 0,
    props: { min: 0, max: 1, step: 1e-3 }
  },
  maxSaturation: {
    default: 1,
    props: { min: 0, max: 1, step: 1e-3 }
  },
  maxLight: {
    default: 1,
    props: { min: 0, max: 1, step: 1e-3 }
  }
};
export {
  generateRandomColorRamp,
  generateRandomColorRampParams,
  hsv2hsl,
  hsv2hsx,
  pointOnCurve
};
