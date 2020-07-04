import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {styles} from './styles';

export const Button = ({text, onPress, onLongPress, disabled, styling}) => {
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
