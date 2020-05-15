import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import {styles} from './styles';

export const Input = ({value, onChangeText}) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder={'Enter Text'}
      style={styles.input}
      onChangeText={text => onChangeText(text)}
      value={value}
      clearButtonMode={'always'}
    />
    <TouchableOpacity onPress={() => onChangeText('')}>
      <View style={styles.resetText}>
        <Text style={styles.deleteText}>X</Text>
      </View>
    </TouchableOpacity>
  </View>
);
