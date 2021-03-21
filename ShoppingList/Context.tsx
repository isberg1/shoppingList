import React from 'react';
import {defaultFontSize, defaultSortOrder, SortOptions} from './config';

type DefaultContext = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>> | (() => void);
  sortOrder: SortOptions;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOptions>> | (() => void);
};

const context = React.createContext<DefaultContext>({
  fontSize: defaultFontSize,
  setFontSize: () => {},
  sortOrder: defaultSortOrder,
  setSortOrder: () => {},
});

export default context;
