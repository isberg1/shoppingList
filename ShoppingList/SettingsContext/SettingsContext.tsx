import React from 'react';
import {defaultFontSize, defaultSortOrder, SortOptions, themes, Theme} from '../config';

type DefaultContext = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>> | (() => void);
  sortOrder: SortOptions;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOptions>> | (() => void);
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>> | (() => void);
};

const settingsContext = React.createContext<DefaultContext>({
  fontSize: defaultFontSize,
  setFontSize: () => {},
  sortOrder: defaultSortOrder,
  setSortOrder: () => {},
  theme: themes.default,
  setTheme: () => {},
});

export default settingsContext;
