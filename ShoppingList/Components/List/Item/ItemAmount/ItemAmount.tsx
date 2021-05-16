import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import useSettings from '../../../../Hooks/UseSettings';

import {styles} from './styles';

interface props {
  amount: string | number;
}

export const ItemAmount = ({amount}: props) => {
  const {fontSize} = useSettings();
  const style = useMemo(() => styles(fontSize), [fontSize]);
  return (
    <View style={[style.outerCounterContainer]}>
      <View style={style.innerCounterContainer}>
        <Text style={[style.counter]}>{amount}</Text>
      </View>
    </View>
  );
};
