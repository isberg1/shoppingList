import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import {styles} from './styles';

export const Input = ({
  value,
  onChangeText,
  onSubmit,
  inputRef,
  onClearText,
}) => {
  const [hasFocus, setHasFocus] = useState(false);

  const _onClearText = () => {
    onChangeText('');
    !!onClearText && onClearText();
  };

  return (
    <View style={[styles.inputContainer, hasFocus ? styles.onFocus : '']}>
      <TextInput
        placeholder={hasFocus ? '' : 'Enter Text'}
        style={styles.input}
        onChangeText={onChangeText}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onSubmitEditing={({nativeEvent: {text}}) => onSubmit(text)}
        value={value}
        clearButtonMode={'always'}
        ref={inputRef}
      />
      <TouchableOpacity onPress={_onClearText}>
        <View style={styles.resetText}>
          <Text style={styles.deleteText}>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
