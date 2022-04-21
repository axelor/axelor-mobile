import React from 'react';
import {TextInput} from 'react-native';

const Input = ({
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
}) => {
  return (
    <TextInput
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
