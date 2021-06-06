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
  backgroundMain: Colors;
  input: Colors;
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
  currentSort: Colors;
}

export const themes: Record<string, Theme> = {
  default: {
    backgroundMain: colors.SteamBlue,
    input: colors.gray,
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
    currentSort: colors.lightGray,
  },
};
