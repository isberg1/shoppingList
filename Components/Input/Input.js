import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import {styles} from './styles';

export const Input = ({value, onChangeText, onSubmit, inputRef}) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <View style={[styles.inputContainer, hasFocus ? styles.onFocus : '']}>
      <TextInput
        placeholder={hasFocus ? '' : 'Enter Text'}
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onSubmitEditing={({nativeEvent: {text}}) => onSubmit(text)}
        value={value}
        clearButtonMode={'always'}
        ref={inputRef}
      />
      <TouchableOpacity onPress={() => onChangeText('')}>
        <View style={styles.resetText}>
          <Text style={styles.deleteText}>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
