import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {MyContext} from '../../App/App';

export const Item = ({value, index, del}) => {
  const [marked, setIsMarked] = useState(false);
  const {num} = useContext(MyContext);

  useEffect(() => {
    console.log('flag changed', num);
    setIsMarked(false);
  }, [num]);

  const onPress = () => {
    del(index, !marked);
    setIsMarked(!marked);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.textBorder}>
        <Text style={[styles.text, marked ? styles.markedView : '']}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ScrollList = ({list, del}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      {list.map((val, index) => (
        <Item key={index} value={val} index={index} del={del} />
      ))}
    </ScrollView>
  );
};
