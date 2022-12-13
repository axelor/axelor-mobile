import React, {useMemo} from 'react';
import {Text as ReactNativeText, TextStyle} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {useWritingType} from '../../../theme/writingTheme';

interface TextProps {
  style?: any;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  onTextLayout?: (any) => void;
  children: any;
  textColor?: string;
  fontSize?: number;
  writingType?: 'title' | 'subtitle' | 'important' | 'details' | undefined;
}

const Text = ({
  style,
  numberOfLines,
  adjustsFontSizeToFit = false,
  onTextLayout,
  children,
  textColor,
  fontSize,
  writingType,
}: TextProps) => {
  const Colors = useThemeColor();
  const writingStyle = useWritingType(writingType);

  const defaultStyle: TextStyle = useMemo(() => {
    return {
      ...writingStyle,
      color: textColor ? textColor : Colors.text,
      fontSize: fontSize ? fontSize : writingStyle.fontSize,
    };
  }, [Colors.text, fontSize, textColor, writingStyle]);

  return (
    <ReactNativeText
      style={[defaultStyle, style]}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      onTextLayout={onTextLayout}>
      {children}
    </ReactNativeText>
  );
};

export default Text;
