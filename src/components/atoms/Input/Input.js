import React, {useMemo} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ColorHook} from '@/themeStore';

const Input = ({
  style,
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
  onSelection,
  multiline = false,
  numberOfLines = 1,
  keyboardType,
  onEndFocus = () => {},
  isFocus = false,
}) => {
  const Colors = ColorHook();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TextInput
      style={[styles.text, style]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      editable={!readOnly}
      onFocus={onSelection}
      placeholderTextColor={Colors.placeholderTextColor}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onBlur={onEndFocus}
      showSoftInputOnFocus={global.zebraConfig ? false : true}
      autoFocus={isFocus}
    />
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    text: {
      color: Colors.text,
    },
  });

export default Input;
