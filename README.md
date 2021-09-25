<img width="533" src="https://github.com/meodai/fettepalette/blob/main/fp.png" alt="fette palette logo"/>

# FettePalette

Demo: https://meodai.github.io/fettepalette/
Color palette generation function using curves within the HSV color model. 
It is based on the idea of "hue shifting". A technique used by [pixel-artists and illustrators](#reading-and-inspiratiion). 

## Installation

FettePalette is bundled as both UMD and ES on npm. Install it using npm:

```js
npm install fettepalette
```

You can then import FettePalette into your project:

```js
// CJS style
let generateRandomColorRamp = require('fettepalette');

// ES style: import individual methods
import generateRandomColorRamp from 'culori';
```

## Usage

```js
import generateRandomColorRamp from 'colordescription';

function generateRandomColorRamp  ({
  total:                10,   // total of base colors in the ramp

  centerHue:            180,  // at what hue should the generation start at

  hueCycle:             0.3,  // hsl spins how much should the hue change over 
                              // the curve, 0: not at all, 1: one full rainbow

  offsetTint:           0.1,  // offset for the tints

  offsetShade:          0.1,  // offset of the shades

  curveMethod:         'arc', // what method is used to draw the curve in the 
                              // HSV color model 

  curveAccent:          0,    // how accentuated is the curve 
                              // (depends heavely on curveMethod)

  tintShadeHueShift:    0.1,  // defines how shifted the hue is in 
                              //for the shades and the tints

  offsetCurveModTint:  0.03,  // modifies the tint curve

  offsetCurveModShade: 0.03,  //modifies the shade curve

  minSaturationLight:  [0, 0],// defines the min saturation and light of all 
                              // the colors

  maxSaturationLight:  [1, 1],// defines the max saturation and light of all 
                              //the colors
})
```

### generateRandomColorRamp(Options{})

Function returns an ob object containing 4 arrays:

```js
{
    light: [], // tints 
    dark: [], // shades
    base: [], // smedium colors
    all: [], // all colors
 }
```

Each array contains every color as an array of HSL coordinates `[h,s,l]` `[0...360,0...1,0...1]`


#### Options

- `total` int 3... > Amount of base colors.
- `centerHue` float 0...1 > 0 Red, 180 Teal etc..
- `hueCycle` float 0...1 > How much the color changes over the curve 0: not at all, 1: full rainbow
- `offsetTint` float  0...1 > Tint curve difference
- `offsetShade` float  0...1 > Shade curve difference
- `curveAccent` float  0...1 > How pronounced should the curve be, depends a lot on the curve method
- `tintShadeHueShift` float 0...1 > Shifts the colors for the shades and tints
- `curveMethod` string 'lamé'|'arc'|'pow'|'powY'|'powX' > method used to generate the curve
- `offsetCurveModTint` float 0...1 > amplifies the curveAccent of for the tint colors
- `offsetCurveModShade` float 0...1 > amplifies the curveAccent of for the shade colors
- `minSaturationLight` array [0...1, 0...1] > minium saturation and light of the generated colors
- `maxSaturationLight` array [0...1, 0...1] > maximum saturation and light of the generated colors

## Reading and Inspiratiion

- Video: [Hue Shifting in Pixel Art](https://www.youtube.com/watch?v=PNtMAxYaGyg) by [Brandon James Greer](https://twitter.com/BJGpixel)
- Article: [How to make your own color palettes](https://medium.com/@greggunn/how-to-make-your-own-color-palettes-712959fbf021) by [Greg Gunn](https://www.ggunn.com/)
- Tweet: [Hue Shifting](https://twitter.com/ENDESGA/status/971690827482202112) by [https://github.com/ENDESGA](ENDESGA)
