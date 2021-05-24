import React from 'react';
import {View} from 'react-native';
import {Text} from '../../../Text/Text';
import {styles} from './styles';

interface props {
  amount: string | number;
}

export const ItemAmount = ({amount}: props) => {
  return (
    <View style={[styles.outerCounterContainer]}>
      <View style={styles.innerCounterContainer}>
        <Text style={styles.counter}>{amount}</Text>
      </View>
    </View>
  );
};
