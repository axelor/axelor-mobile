import React from 'react';
import {TextInput} from 'react-native';

const Input = ({
  style,
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
}) => {
  return (
    <TextInput
      style={style}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      editable={!readOnly}
    />
  );
};

export default Input;
