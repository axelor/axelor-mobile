import React from 'react';
import {Input} from '@/components/atoms';

const UrlInput = ({value, onChange, readOnly}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder="URL"
    />
  );
};

export default UrlInput;
