export const defaultBorder = {
  borderWidth: 2,
  borderRadius: 5,
};

export const darkTheme = '#272727';
export const gray = '#5A5A5A';
export const lightGray = '#747474';
export const greenBlue = '#008577';
export const pink = '#bd315e';
export const orange = '#C25B01';
export const green = 'green';
export const blue = 'blue';
export const SteamBlue = '#1b2838';
export const white = 'white';

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
