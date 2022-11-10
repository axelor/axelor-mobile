import React, {useMemo} from 'react';
import {Text as ReactNativeText, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';

interface TextProps {
  style?: any;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  onTextLayout?: (any) => void;
  children: any;
}

const Text = ({
  style,
  numberOfLines,
  adjustsFontSizeToFit = false,
  onTextLayout,
  children,
}: TextProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <ReactNativeText
      style={[styles.text, style]}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      onTextLayout={onTextLayout}>
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
