import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const Button = ({text, onPress, onPressDelete, disabled, styling}) => {
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
  addingDisabled,
  deletingDisabled,
}) => {
  return (
    <>
      <Button
        text={'add to list'}
        onPress={onPressAdd}
        disabled={addingDisabled}
        styling={styles.button}
      />
      <View style={styles.spacing} />
      <Button
        text={'delete from to list'}
        onPress={onPressDelete}
        disabled={deletingDisabled}
        styling={styles.buttonDelete}
      />
    </>
  );
};
