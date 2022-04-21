import React from 'react';
import {Button} from '@/components/atoms';

const LoginButton = ({onPress}) => {
  return <Button title="login" onPress={onPress} />;
};

export default LoginButton;
