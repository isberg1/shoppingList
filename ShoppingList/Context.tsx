import React from 'react';
import {defaultFontSize} from './config';

type DefaultContext = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>> | (() => void);
};

const context = React.createContext<DefaultContext>({
  fontSize: defaultFontSize,
  setFontSize: () => {},
});

export default context;
