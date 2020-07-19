import React from 'react';

export const MyContext = React.createContext({
  num: 0,
});

export const modes = {
  add: 'add',
  edit: 'edit',
  delete: 'delete',
};
