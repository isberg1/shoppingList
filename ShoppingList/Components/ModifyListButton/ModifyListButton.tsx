import React, {useMemo} from 'react';
import {styles} from './styles';
import {modes} from '../../config';
import UseSettings from '../../Hooks/UseSettings';
import {Button as EditItemButton} from './Button/Button';
import {Button as AddItemButton} from './Button/Button';
import {Button as DeleteItemButton} from './Button/Button';

interface props {
  onPressAdd: () => void;
  onPressDelete: () => void;
  onPressEdit: () => void;
  disabled: boolean;
  mode: string;
}

export const ModifyListButton = ({
  onPressAdd,
  onPressDelete,
  onPressEdit,
  disabled,
  mode,
}: props) => {
  const {theme} = UseSettings();
  const _styles = useMemo(() => styles(theme), [theme]);

  return (
    <>
      {mode === modes.add && (
        <AddItemButton
          text={'Add Item'}
          onPress={onPressAdd}
          disabled={disabled}
          styling={_styles.buttonAdd}
        />
      )}
      {mode === modes.edit && (
        <EditItemButton
          text={'Edit Item'}
          onPress={onPressEdit}
          disabled={disabled}
          styling={_styles.buttonEdit}
        />
      )}
      {mode === modes.delete && (
        <DeleteItemButton
          text={'Delete Item'}
          onLongPress={onPressDelete}
          disabled={disabled}
          styling={_styles.buttonDelete}
        />
      )}
    </>
  );
};
