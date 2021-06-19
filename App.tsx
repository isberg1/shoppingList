import React from 'react';
import {ShoppingList} from './ShoppingList/ShoppingList';
import {SettingsProvider} from './ShoppingList/SettingsContext/SettingsProvider';

const App = () => {
  return (
    <SettingsProvider>
      <ShoppingList />
    </SettingsProvider>
  );
};

export default App;
