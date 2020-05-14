import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const Button = ({text, onPress, disabled, styling}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text style={[styling, disabled ? [styles.disabled] : {}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Buttons = ({
  onPressAdd,
  onPressDelete,
  onPressEdit,
  disabled,
  mode,
}) => {
  const onPressFunc = useMemo(() => {
    switch (mode) {
      case 'edit':
        return onPressEdit;
      case 'add':
        return onPressAdd;
      case 'delete':
        return onPressDelete;
      default:
        return onPressAdd;
    }
  }, [mode, onPressAdd, onPressDelete, onPressEdit]);

  const style = useMemo(() => {
    switch (mode) {
      case 'edit':
        return styles.buttonEdit;
      case 'add':
        return styles.buttonAdd;
      case 'delete':
        return styles.buttonDelete;
      default:
        return styles.buttonAdd;
    }
  }, [mode]);

  const text = useMemo(() => {
    switch (mode) {
      case 'edit':
        return 'Edit Item';
      case 'add':
        return 'Add Item';
      case 'delete':
        return 'Delete Item';
      default:
        return 'add';
    }
  }, [mode]);

  return (
    <>
      <Button
        text={text}
        onPress={onPressFunc}
        disabled={disabled}
        styling={style}
      />
    </>
  );
};
