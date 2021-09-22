<img width="100" src="https://github.com/meodai/fettepalette/blob/main/fp.png" alt="fette palette logo"/>

# FettePalette

Color palette generation function using curves within the HSV color model

Based on: https://medium.com/@greggunn/how-to-make-your-own-color-palettes-712959fbf021

Demo: https://meodai.github.io/fettepalette/

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

function generateRandomColorRamp  (
  10,  // total of base colors in the ramp
  180, // at what hue should the generation start at
  0.3, // hsl spins how much should the hue change over the curve, 0: not at all, 1: one full rainbow
  0.1,  // offset for the tints
  0.1, // offset of the shades
  0, // how accentuated is the curve (depends heavely on curveMethod)
  0.1, // defines how shifted the hue is in for the shades and the tints
  'arc', // what method is used to draw the curve in the HSV color model 
  0.03, // modifies the tint curve
  0.03, //modifies the shade curve
  [0, 0], // defines the min saturation and light of all the colors
  [1, 1], // defines the max saturation and light of all the colors
)
```
