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
  const resolveButton = () => {
    const addButton = (
      <Button
        text={'add to list'}
        onPress={onPressAdd}
        disabled={addingDisabled}
        styling={styles.buttonAdd}
      />
    );

    const deleteButton = (
      <Button
        text={'delete from to list'}
        onPress={onPressDelete}
        disabled={deletingDisabled}
        styling={styles.buttonDelete}
      />
    );

    switch (true) {
      case !addingDisabled: {
        return addButton;
      }
      case !deletingDisabled: {
        return deleteButton;
      }
      default:
        return addButton;
    }
  };

  return <>{resolveButton()}</>;
};
