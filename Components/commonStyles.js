'use strict';
exports.__esModule = true;
exports.hexToRgb = exports.white = exports.SteamBlue = exports.blue = exports.green = exports.orange = exports.pink = exports.greenBlue = exports.lightGray = exports.gray = exports.darkTheme = exports.defaultBorder = void 0;
exports.defaultBorder = {
  borderWidth: 2,
  borderRadius: 5,
};
exports.darkTheme = '#272727';
exports.gray = '#5A5A5A';
exports.lightGray = '#747474';
exports.greenBlue = '#008577';
exports.pink = '#bd315e';
exports.orange = '#C25B01';
exports.green = 'green';
exports.blue = 'blue';
exports.SteamBlue = '#1b2838';
exports.white = 'white';
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
exports.hexToRgb = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
