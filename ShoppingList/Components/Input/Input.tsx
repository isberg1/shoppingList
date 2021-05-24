import React, {useState, useMemo} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import useSettings from '../../Hooks/UseSettings';
import {styles} from './styles';
import {Text} from '../Text/Text';

interface props {
  value: string;
  onChangeText: (input: string) => void;
  onSubmit: (input: string) => void;
  inputRef: React.Ref<TextInput>;
  onClearText?: () => void;
}

export const Input = ({value, onChangeText, onSubmit, inputRef, onClearText}: props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const {fontSize} = useSettings();
  const style = useMemo(() => styles(fontSize), [fontSize]);

  return (
    <View style={[style.inputContainer, hasFocus && style.onFocus]}>
      <TextInput
        placeholder={hasFocus ? '' : 'Enter Text'}
        style={style.input}
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
        <View style={style.clearTextButton}>
          <Text>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
