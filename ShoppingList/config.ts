import {colors, Colors} from './Components/commonStyles';
export const modes = {
  add: 'add',
  edit: 'edit',
  delete: 'delete',
};

export enum SortOptions {
  FIFO = 'FIFO',
  LIFO = 'LIFO',
}

export const defaultSortOrder = SortOptions.FIFO;
export const minimumFontSize = 15;
export const maximumFontSize = 40;
export const defaultFontSize = 25;

export interface Theme {
  id: string;
  backgroundMain: Colors;
  input: Colors;
  inputPlaceholderTextColor: Colors;
  inputOnFocus: Colors;
  listItem: Colors;
  listItemDelete: Colors;
  text: Colors;
  settingText: Colors;
  addButton: Colors;
  editButton: Colors;
  deleteButton: Colors;
  swipeMinus: Colors;
  swipePlus: Colors;
  currentSelected: Colors;
}

export const themes = {
  default: {
    id: 'default',
    backgroundMain: colors.SteamBlue,
    input: colors.gray,
    inputPlaceholderColor: colors.black,
    inputOnFocus: colors.lightGray,
    listItem: colors.gray,
    listItemDelete: colors.pink,
    text: colors.white,
    settingText: colors.black,
    addButton: colors.green,
    editButton: colors.blue,
    deleteButton: colors.pink,
    swipeMinus: colors.orange,
    swipePlus: colors.green,
    currentSelected: colors.lightGray,
  },
  odysee: {
    id: 'odysee',
    backgroundMain: colors.darkPurple,
    input: colors.mediumPurple,
    inputPlaceHolderColor: colors.white,
    inputOnFocus: colors.lightPurple,
    listItem: colors.darkMediumPurple,
    listItemDelete: colors.neonPink,
    text: colors.white,
    settingText: colors.black,
    addButton: colors.green,
    editButton: colors.blue,
    deleteButton: colors.neonPink,
    swipeMinus: colors.fireOrange,
    swipePlus: colors.blue,
    currentSelected: colors.lightGray,
  },
};
