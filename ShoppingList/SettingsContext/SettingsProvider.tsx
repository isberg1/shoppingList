import React, {useState, useEffect} from 'react';
import {defaultFontSize, defaultSortOrder, SortOptions, themes, Theme} from '../config';
import settingsContext from './SettingsContext';

import {getFromAsyncStorage, setInAsyncStorage} from '../Utils/AsyncStorage';

export function SettingsProvider({children}: Props) {
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [theme, setTheme] = useState<Theme>(themes.default);

  // get data at startup
  useEffect(() => {
    getFromAsyncStorage(Setting.FontSize, (x: string) => {
      const val = parseInt(x, 10);
      if (typeof val === 'number') {
        setFontSize(val);
      }
    });

    getFromAsyncStorage(Setting.SortOrder, (x: string) => {
      function isValidSortOrder(str: unknown): str is SortOptions {
        return !!Object.values(SortOptions).find((val) => val === str);
      }

      if (isValidSortOrder(x)) {
        setSortOrder(x);
      }
    });

    getFromAsyncStorage(Setting.Theme, (x: string) => {
      try {
        setTheme(JSON.parse(x));
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {
    setInAsyncStorage(Setting.FontSize, fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    setInAsyncStorage(Setting.SortOrder, sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    setInAsyncStorage(Setting.Theme, JSON.stringify(theme));
  }, [theme]);

  return (
    <settingsContext.Provider
      value={{
        fontSize,
        setFontSize,
        sortOrder,
        setSortOrder,
        theme,
        setTheme,
      }}
    >
      {children}
    </settingsContext.Provider>
  );
}

enum Setting {
  FontSize = 'FONTSIZE',
  SortOrder = 'SORTORDER',
  Theme = 'THEME',
}

interface Props {
  children: React.ReactNode;
}
