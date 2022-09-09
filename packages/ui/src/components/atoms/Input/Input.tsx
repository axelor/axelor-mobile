import React, { useMemo } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";
import { useThemeColor } from "../../../ThemeContext";

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
}: InputProps) => {
  const Colors = useThemeColor();
  //const { zebraConfig } = useSelector((state) => state.config);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TextInput
      style={[styles.text, style]}
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
      //showSoftInputOnFocus={zebraConfig ? false : true}
      autoFocus={isFocus}
    />
  );
};

const getStyles = (Colors) =>
  StyleSheet.create({
    text: {
      color: Colors.text,
    },
  });

export default Input;
