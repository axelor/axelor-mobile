import {useThemeColor} from '@/features/themeSlice';
import React, {useMemo} from 'react';
import {Text as ReactNativeText, StyleSheet} from 'react-native';

const Text = ({
  style,
  numberOfLines,
  adjustsFontSizeToFit = false,
  children,
}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <ReactNativeText
      style={[styles.text, style]}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}>
      {children}
    </ReactNativeText>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    text: {
      color: Colors.text,
    },
  });

export default Text;
