import React, {useMemo} from 'react';
import {Text as ReactNativeText, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';

interface TextProps {
  style?: any;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  onTextLayout?: (any) => void;
  children: any;
  textColor?: string;
  fontSize?: number;
}

const Text = ({
  style,
  numberOfLines,
  adjustsFontSizeToFit = false,
  onTextLayout,
  children,
  textColor,
  fontSize = 12,
}: TextProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(
    () => getStyles(textColor ? textColor : Colors.text, fontSize),
    [Colors.text, fontSize, textColor],
  );

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
const getStyles = (textColor, fontSize) =>
  StyleSheet.create({
    text: {
      color: textColor,
      fontSize: fontSize,
    },
  });

export default Text;
