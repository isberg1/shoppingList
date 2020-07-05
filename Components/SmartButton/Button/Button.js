import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {useClickAnimation} from './useClickAnimations';
import {styles} from './styles';

export const Button = ({
  text,
  onPress = () => {},
  onLongPress = () => {},
  disabled,
  styling,
}) => {
  const {
    colorChangeStyling,
    pressInAnimation,
    pressOutAnimation,
    longPressAnimation,
  } = useClickAnimation();

  const _onPress = useCallback(() => onPress(), [onPress]);
  const _onLongPress = useCallback(() => longPressAnimation(onLongPress), [
    longPressAnimation,
    onLongPress,
  ]);

  return (
    <View
      style={[styles.buttonContainer, disabled && styles.disabled, styling]}>
      <Animated.View style={{backgroundColor: colorChangeStyling}}>
        <TouchableOpacity
          activeOpacity={1} // disable default clickAnimation
          disabled={disabled}
          delayLongPress={500}
          onPressIn={pressInAnimation}
          onPressOut={pressOutAnimation}
          onPress={_onPress}
          onLongPress={_onLongPress}>
          <Text style={[styles.text]}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
