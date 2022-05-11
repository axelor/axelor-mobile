import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = ({
  style,
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
  onSelection,
  multiline=false,
  numberOfLines=1,
  keyboardType
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
      placeholderTextColor="#606060"
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#606060',
  },
});

export default Input;
