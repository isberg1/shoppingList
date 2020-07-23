import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {styles} from './styles';

interface props {
  text: string;
  style: ViewStyle;
}

export const SwipeToSide = ({text, style}: props) => {
  return (
    <View style={[styles.swipeView, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
