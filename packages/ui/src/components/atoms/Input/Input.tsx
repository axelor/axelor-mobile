import React, {useMemo} from 'react';
import {KeyboardTypeOptions, TextInput, TextStyle} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {useWritingType} from '../../../theme/writingTheme';
import {useConfig} from '../../../config/ConfigContext';

interface InputProps {
  style: any;
  value: string;
  onChange: (any) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  readOnly?: boolean;
  onSelection?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  onEndFocus?: () => void;
  isFocus?: boolean;
  writingType?: 'title' | 'subtitle' | 'important' | 'details' | undefined;
}

const Input = ({
  style,
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
  onSelection,
  multiline = false,
  numberOfLines = 1,
  keyboardType,
  onEndFocus = () => {},
  isFocus = false,
  writingType = null,
}: InputProps) => {
  const Colors = useThemeColor();
  const {hideVirtualKeyboard} = useConfig();
  const writingStyle = useWritingType(writingType);

  const defaultStyle: TextStyle = useMemo(() => {
    return {
      ...writingStyle,
      color: Colors.text,
      fontSize: 15,
    };
  }, [Colors.text, writingStyle]);

  return (
    <TextInput
      style={[defaultStyle, style]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      editable={!readOnly}
      onFocus={onSelection}
      placeholderTextColor={Colors.placeholderTextColor}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onBlur={onEndFocus}
      showSoftInputOnFocus={hideVirtualKeyboard ? false : true}
      autoFocus={isFocus}
    />
  );
};

export default Input;
