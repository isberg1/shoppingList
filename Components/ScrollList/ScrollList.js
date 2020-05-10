import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const Item = ({value}) => {
  const [marked, setIsMarked] = useState(false);
  return (
    <TouchableOpacity onPress={() => setIsMarked(flag => !flag)}>
      <View style={styles.textBorder}>
        <Text style={[styles.text, marked ? styles.markedView : '']}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ScrollList = ({list}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      {list.map((val, index) => (
        <Item key={index} value={val} />
      ))}
    </ScrollView>
  );
};
