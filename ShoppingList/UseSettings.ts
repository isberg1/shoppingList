import {useState, useEffect} from 'react';
import {getFromAsyncStorage, setInAsyncStorage} from './Utils/AsyncStorage';
import {defaultFontSize} from './config';

enum Setting {
  FontSize = 'FONTSIZE',
}

export default function useSettings() {
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);

  // get data at startup
  useEffect(() => {
    getFromAsyncStorage(Setting.FontSize, (x: string) => {
      const val = parseInt(x, 10);
      if (typeof val === 'number') {
        setFontSize(val);
      }
    });
  }, []);

  useEffect(() => {
    setInAsyncStorage(Setting.FontSize, fontSize.toString());
  }, [fontSize]);

  return {
    fontSize,
    setFontSize,
  };
}
