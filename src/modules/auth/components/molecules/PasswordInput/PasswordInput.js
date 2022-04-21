import React from 'react';
import {Input} from '@/components/atoms';

const PasswordInput = ({value, onChange, readOnly}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder="Password"
      secureTextEntry
      readOnly={readOnly}
    />
  );
};

export default PasswordInput;
