import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {modes} from '../config';

export const Button = ({text, onPress, disabled, styling}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text style={[styling, disabled ? [styles.disabled] : {}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SmartButton = ({
  onPressAdd,
  onPressDelete,
  onPressEdit,
  disabled,
  mode,
}) => {
  const onPressFunc = useMemo(() => {
    switch (mode) {
      case modes.edit:
        return onPressEdit;
      case modes.add:
        return onPressAdd;
      case modes.delete:
        return onPressDelete;
      default:
        return onPressAdd;
    }
  }, [mode, onPressAdd, onPressDelete, onPressEdit]);

  const style = useMemo(() => {
    switch (mode) {
      case modes.edit:
        return styles.buttonEdit;
      case modes.add:
        return styles.buttonAdd;
      case modes.delete:
        return styles.buttonDelete;
      default:
        return styles.buttonAdd;
    }
  }, [mode]);

  const text = useMemo(() => {
    switch (mode) {
      case modes.edit:
        return 'Edit Item';
      case modes.add:
        return 'Add Item';
      case modes.delete:
        return 'Delete Item';
      default:
        return modes.add;
    }
  }, [mode]);

  return (
    <Button
      text={text}
      onPress={onPressFunc}
      disabled={disabled}
      styling={style}
    />
  );
};
