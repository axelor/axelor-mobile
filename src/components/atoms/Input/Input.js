import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '@/types/colors';

const Input = ({
  style,
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
  onSelection,
  multiline = false,
  keyboardType,
  onEndFocus = () => {},
}) => {
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
      placeholderTextColor="#C0C0C0"
      keyboardType={keyboardType}
      multiline={multiline}
      onBlur={onEndFocus}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.text.grey,
  },
});

export default Input;
