import {useState, useEffect} from 'react';
import {getFromAsyncStorage, setInAsyncStorage} from './Utils/AsyncStorage';
import {defaultFontSize, defaultSortOrder, SortOptions} from './config';

enum Setting {
  FontSize = 'FONTSIZE',
  SortOrder = 'SORTORDER',
}

export default function useSettingsManager() {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

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
  }, []);

  useEffect(() => {
    setInAsyncStorage(Setting.FontSize, fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    setInAsyncStorage(Setting.SortOrder, sortOrder);
  }, [sortOrder]);

  return {
    fontSize,
    setFontSize,
    sortOrder,
    setSortOrder,
  };
}
