import React, {useMemo} from 'react';
import {styles} from './styles';
import {Text as NativeText, TextProps} from 'react-native';
import useSettings from '../../Hooks/UseSettings';

interface Props extends TextProps {
  children?: string | number;
}

export function Text({children, style, ...restProps}: Props) {
  const {fontSize, theme} = useSettings();
  const _styles = useMemo(() => styles(fontSize, theme), [fontSize, theme]);

  return (
    <NativeText style={[_styles.text, style]} {...restProps}>
      {children}
    </NativeText>
  );
}
