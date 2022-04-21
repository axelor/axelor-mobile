import React from 'react';
import {Button as ReactNativeButton} from 'react-native';

const Button = ({title, onPress, disabled}) => {
  return (
    <ReactNativeButton title={title} onPress={onPress} disabled={disabled} />
  );
};

export default Button;
