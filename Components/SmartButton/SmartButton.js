import React, {useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
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
  const colorAnim = useRef(new Animated.Value(0)).current;

  const longPressAnimation = callback =>
    Animated.sequence([
      Animated.timing(colorAnim, {
        toValue: 2,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => callback());

  const pressInnAnimation = () =>
    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();

  const pressOutAnimation = () =>
    Animated.timing(colorAnim, {
      delay: 200,
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();

  const _onPress = () => {
    !!onPress && onPress();
  };

  const _onLongPress = () => {
    longPressAnimation(onLongPress ? onLongPress : () => {});
  };

  return (
    <View
      style={[styles.buttonContainer, disabled && styles.disabled, styling]}>
      <Animated.View
        style={[
          {
            backgroundColor: colorAnim.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                'rgba(0,0,0, 0)',
                'rgba(0,0,0,.7)',
                'rgba(255, 0, 0, 0.7)',
              ],
            }),
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={_onPress}
          disabled={disabled}
          delayLongPress={500}
          onPressIn={pressInnAnimation}
          onPressOut={pressOutAnimation}
          onLongPress={_onLongPress}>
          <Text style={[styles.text]}>{text}</Text>
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
        return () => {};
      default:
        return onPressAdd;
    }
  }, [mode, onPressAdd, onPressEdit]);

  const _onLongPress = useMemo(
    () => (mode === modes.delete ? onPressDelete : () => {}),
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
