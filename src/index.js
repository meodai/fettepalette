"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.pointOnCurve = exports.random = exports.hsv2hsl = void 0;
/**
 * function hsv2hsl
 * @param h {Number} hue value 0...360
 * @param s {Number} saturation 0...1
 * @param v {Number} value 0...1
 * @returns {Array} h:0...360 s:0...1 l:0...1
 */
var hsv2hsl = function (h, s, v, l, m) {
    if (l === void 0) { l = v - v * s / 2; }
    if (m === void 0) { m = Math.min(l, 1 - l); }
    return [h, m ? (v - l) / m : 0, l];
};
exports.hsv2hsl = hsv2hsl;
/**
 * function random
 * @param min {Number} minimum number
 * @param max {Number} maximum number
 * @returns   {Number} number in given range
 */
var random = function (min, max) {
    if (!max) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
};
exports.random = random;
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
var pointOnCurve = function (curveMethod, i, total, curveAccent, min, max) {
    if (min === void 0) { min = [0, 0]; }
    if (max === void 0) { max = [1, 1]; }
    var limit = Math.PI / 2;
    var slice = limit / total;
    var x, y;
    if (curveMethod === 'lamé') {
        var t = i / total * limit;
        var exp = 2 / (2 + (20 * curveAccent));
        var cosT = Math.cos(t);
        var sinT = Math.sin(t);
        x = Math.sign(cosT) * (Math.pow(Math.abs(cosT), exp));
        y = Math.sign(sinT) * (Math.pow(Math.abs(sinT), exp));
    }
    else if (curveMethod === 'arc') { // pow
        y = Math.cos(-Math.PI / 2 + i * slice + curveAccent);
        x = Math.sin(Math.PI / 2 + i * slice - curveAccent);
    }
    else if (curveMethod === 'pow') {
        x = Math.pow(1 - i / total, 1 - curveAccent);
        y = Math.pow(i / total, 1 - curveAccent);
    }
    else if (curveMethod === 'powY') {
        x = Math.pow(1 - i / total, curveAccent);
        y = Math.pow(i / total, 1 - curveAccent);
    }
    else if (curveMethod === 'powX') {
        x = Math.pow(i / total, curveAccent);
        y = Math.pow(i / total, 1 - curveAccent);
    }
    x = min[0] + Math.min(Math.max(x, 0), 1) * (max[0] - min[0]);
    y = min[1] + Math.min(Math.max(y, 0), 1) * (max[1] - min[1]);
    return [x, y];
};
exports.pointOnCurve = pointOnCurve;
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
function generateRandomColorRamp(total, centerHue, hueCycle, offsetTint, offsetShade, curveAccent, tintShadeHueShift, curveMethod, offsetCurveModTint, offsetCurveModShade, minSaturationLight, maxSaturationLight) {
    if (centerHue === void 0) { centerHue = 0; }
    if (hueCycle === void 0) { hueCycle = 0.3; }
    if (offsetTint === void 0) { offsetTint = 0.1; }
    if (offsetShade === void 0) { offsetShade = 0.1; }
    if (curveAccent === void 0) { curveAccent = 0; }
    if (tintShadeHueShift === void 0) { tintShadeHueShift = 0.1; }
    if (curveMethod === void 0) { curveMethod = 'arc'; }
    if (offsetCurveModTint === void 0) { offsetCurveModTint = 0.03; }
    if (offsetCurveModShade === void 0) { offsetCurveModShade = 0.03; }
    if (minSaturationLight === void 0) { minSaturationLight = [0, 0]; }
    if (maxSaturationLight === void 0) { maxSaturationLight = [1, 1]; }
    var baseColors = [];
    var lightColors = [];
    var darkColors = [];
    for (var i = 1; i < (total + 1); i++) {
        var _a = exports.pointOnCurve(curveMethod, i, total + 1, curveAccent, minSaturationLight, maxSaturationLight), x = _a[0], y = _a[1];
        var h = (360 + ((-180 * hueCycle) + (centerHue + i * (360 / (total + 1)) * hueCycle))) % 360;
        var hsl = exports.hsv2hsl(h, x, y);
        baseColors.push([
            hsl[0],
            hsl[1],
            hsl[2]
        ]);
        var _b = exports.pointOnCurve(curveMethod, i, total + 1, curveAccent + offsetCurveModTint, minSaturationLight, maxSaturationLight), xl = _b[0], yl = _b[1];
        var hslLight = exports.hsv2hsl(h, xl, yl);
        lightColors.push([
            (h + 360 * tintShadeHueShift) % 360,
            hslLight[1] - offsetTint,
            hslLight[2] + offsetTint
        ]);
        var _c = exports.pointOnCurve(curveMethod, i, total + 1, curveAccent - offsetCurveModShade, minSaturationLight, maxSaturationLight), xd = _c[0], yd = _c[1];
        var hslDark = exports.hsv2hsl(h, xd, yd);
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
        all: __spreadArray(__spreadArray(__spreadArray([], lightColors), baseColors), darkColors)
    };
}
exports["default"] = generateRandomColorRamp;
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
