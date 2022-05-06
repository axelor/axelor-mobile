import React from 'react';
import {TextInput} from 'react-native';

const Input = ({
  style,
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
  onSelection,
  multiline=false,
  numberOfLines=1
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
      onFocus={onSelection}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

export default Input;
