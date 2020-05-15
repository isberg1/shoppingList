import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {MyContext} from '../../App/App';

export const Item = ({value, index, onPress, onLongPress}) => {
  const [marked, setIsMarked] = useState(false);
  const {num} = useContext(MyContext);

  useEffect(() => {
    console.log('flag changed', num);
    setIsMarked(false);
  }, [num]);

  const _onPress = () => {
    onPress(index, !marked);
    setIsMarked(!marked);
  };

  const _onLongPress = () => {
    onLongPress(index);
  };

  return (
    <TouchableOpacity onPress={_onPress} onLongPress={_onLongPress}>
      <View style={styles.textBorder}>
        <Text style={[styles.text, marked ? styles.markedView : '']}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
