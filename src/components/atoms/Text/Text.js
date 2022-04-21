import React from 'react';
import {Text as ReactNativeText} from 'react-native';

const Text = ({style, children}) => {
  return <ReactNativeText style={style}>{children}</ReactNativeText>;
};

export default Text;
