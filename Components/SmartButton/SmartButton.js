import React, {useMemo} from 'react';
import {styles} from './styles';
import {modes} from '../config';
import {Button} from './Button/Button';

export const SmartButton = ({
  onPressAdd,
  onPressDelete,
  onPressEdit,
  disabled,
  mode,
}) => {
  const {_onPress, _onLongPress, style, text} = useMemo(() => {
    switch (mode) {
      case modes.edit:
        return {
          _onPress: onPressEdit,
          _onLongPress: () => {},
          style: styles.buttonEdit,
          text: 'Edit Item',
        };
      case modes.add:
        return {
          _onPress: onPressAdd,
          _onLongPress: () => {},
          style: styles.buttonAdd,
          text: 'Add Item',
        };
      case modes.delete:
        return {
          _onPress: () => {},
          _onLongPress: onPressDelete,
          style: styles.buttonDelete,
          text: 'Delete Item',
        };
      default:
        return {
          _onPress: onPressAdd,
          _onLongPress: () => {},
          style: styles.buttonAdd,
          text: 'Add Item',
        };
    }
  }, [mode, onPressAdd, onPressDelete, onPressEdit]);

  return (
    <Button
      text={text}
      onPress={_onPress}
      onLongPress={_onLongPress}
      disabled={disabled}
      styling={style}
    />
  );
};
