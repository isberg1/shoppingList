import {useRef, useCallback, useMemo} from 'react';
import {Animated, Easing} from 'react-native';

export const useClickAnimation = () => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  const longPressAnimation = useCallback(
    callback =>
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
      ]).start(() => callback()),
    [colorAnim],
  );

  const pressInAnimation = useCallback(
    () =>
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start(),
    [colorAnim],
  );

  const pressOutAnimation = useCallback(
    () =>
      Animated.timing(colorAnim, {
        delay: 200,
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start(),
    [colorAnim],
  );

  const {colorChangeStyling} = useMemo(
    () => ({
      colorChangeStyling: colorAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,.7)', 'rgba(255,0,0,.7)'],
      }),
    }),
    [colorAnim],
  );

  return {
    colorChangeStyling,
    pressInAnimation,
    pressOutAnimation,
    longPressAnimation,
  };
};
