import React from 'react';
import {Input} from '@/components/atoms';

const UsernameInput = ({value, onChange, readOnly}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder="Username"
      readOnly={readOnly}
    />
  );
};

export default UsernameInput;
