import React, {useCallback} from 'react';
import {View, TouchableOpacity, Animated, ViewStyle} from 'react-native';
import {useClickAnimation} from './useClickAnimations';
import {Text} from '../../Text/Text';
import {styles} from './styles';

interface props {
  text: string;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled: boolean;
  styling: ViewStyle;
}

export const Button = ({text, onPress, onLongPress, disabled, styling}: props) => {
  const {
    colorChangeStyling,
    pressInAnimation,
    pressOutAnimation,
    longPressAnimation,
  } = useClickAnimation();

  const _onPress = useCallback(() => onPress && onPress(), [onPress]);
  const _onLongPress = useCallback(() => onLongPress && longPressAnimation(onLongPress), [
    longPressAnimation,
    onLongPress,
  ]);

  return (
    <View style={[styles.buttonContainer, disabled && styles.disabled, styling]}>
      <Animated.View style={{backgroundColor: colorChangeStyling}}>
        <TouchableOpacity
          activeOpacity={1} // disable default clickAnimation
          disabled={disabled}
          delayLongPress={500}
          onPressIn={pressInAnimation}
          onPressOut={pressOutAnimation}
          onPress={_onPress}
          onLongPress={_onLongPress}
        >
          <Text style={[styles.text]}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
