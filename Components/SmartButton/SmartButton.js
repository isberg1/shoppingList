import React, {useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {styles} from './styles';
import {modes} from '../config';

export const Button = ({
  text,
  onPress,
  onLongPress,
  disabled,
  styling,
  useAnimation,
}) => {
  const [a, b] = useState(1);
  const fadeAnim = useRef(new Animated.Value(a)).current;

  const _onPress = () => {
    !!onPress && onPress();
  };

  const _onLongPress = () => {
    !!onLongPress && onLongPress();
  };
  return (
    <View style={styles.buttonContainer}>
      <Animated.View
        style={{
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        <TouchableOpacity
          onPress={_onPress}
          disabled={disabled}
          delayLongPress={500}
          onLongPress={_onLongPress}>
          <Text style={[styling, disabled && styles.disabled]}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
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
  const _onPress = useMemo(() => {
    switch (mode) {
      case modes.edit:
        return onPressEdit;
      case modes.add:
        return onPressAdd;
      case modes.delete:
        return null;
      default:
        return onPressAdd;
    }
  }, [mode, onPressAdd, onPressEdit]);

  const _onLongPress = useMemo(
    () => (mode === modes.delete ? onPressDelete : null),
    [mode, onPressDelete],
  );

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
      onPress={_onPress}
      onLongPress={_onLongPress}
      disabled={disabled}
      styling={style}
      useAnimation={mode === modes.delete}
    />
  );
};
