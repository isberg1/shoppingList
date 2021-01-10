import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface props {
  value: string;
  onChangeText: (input: string) => void;
  onSubmit: (input: string) => void;
  inputRef: React.Ref<TextInput>;
  onClearText?: () => void;
}

export const Input = ({value, onChangeText, onSubmit, inputRef, onClearText}: props) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <View style={[styles.inputContainer, hasFocus && styles.onFocus]}>
      <TextInput
        placeholder={hasFocus ? '' : 'Enter Text'}
        style={styles.input}
        onChangeText={onChangeText}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onSubmitEditing={({nativeEvent: {text}}) => onSubmit(text)}
        blurOnSubmit={false}
        value={value}
        clearButtonMode={'never'} // IOS has integrated clear button
        ref={inputRef}
      />
      <TouchableOpacity onPress={onClearText}>
        <View style={styles.resetText}>
          <Text style={styles.deleteText}>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
