export const defaultBorder = {
  borderWidth: 2,
  borderRadius: 5,
  borderColor: 'transparent',
  elevation: 5, // android box-shadow
};

export const darkTheme = '#272727' as const;
export const gray = '#5A5A5A' as const;
export const lightGray = '#747474' as const;
export const black = '#000000' as const;
export const greenBlue = '#008577' as const;
export const pink = '#bd315e' as const;
export const orange = '#C25B01' as const;
export const green = 'green' as const;
export const blue = 'blue' as const;
export const SteamBlue = '#1b2838' as const;
export const white = 'white' as const;
export const darkPurple = '#140E1B' as const;
export const darkMediumPurple = '#261a35' as const;
export const mediumPurple = '#38274C' as const;
export const lightPurple = '#3d2d4e' as const;
export const neonPink = '#e50054' as const;
export const fireOrange = '#ff6635' as const;

export const colors = {
  gray,
  lightGray,
  black,
  greenBlue,
  pink,
  orange,
  green,
  blue,
  SteamBlue,
  white,
  darkTheme,
  darkPurple,
  darkMediumPurple,
  mediumPurple,
  lightPurple,
  neonPink,
  fireOrange,
};

export type Colors = typeof colors[keyof typeof colors];

export const minimumTouchableSize = 55;
