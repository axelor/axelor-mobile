import React, {useMemo} from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Input} from '../../atoms';

interface IconInputProps {
  style?: any;
  value: string;
  onChange: (value: any) => void;
  placeholder: string;
  readOnly?: boolean;
  secureTextEntry?: boolean;
  onSelection?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  onEndFocus: () => void;
  isFocus: boolean;
  leftIconsList?: any[];
  rightIconsList?: any[];
}

const IconInput = ({
  style,
  value,
  onChange,
  placeholder,
  readOnly,
  secureTextEntry,
  onSelection = () => {},
  multiline,
  numberOfLines,
  keyboardType,
  onEndFocus,
  isFocus,
  leftIconsList = [],
  rightIconsList = [],
}: IconInputProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.container, style]}>
      {leftIconsList.map((iconComponent, index) =>
        React.cloneElement(iconComponent, {key: index}),
      )}
      <Input
        style={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        secureTextEntry={secureTextEntry}
        onSelection={onSelection}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        onEndFocus={onEndFocus}
        isFocus={isFocus}
      />
      {rightIconsList.map((iconComponent, index) =>
        React.cloneElement(iconComponent, {key: index}),
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      borderColor: Colors.secondaryColor,
      borderWidth: 1,
      borderRadius: 13,
      backgroundColor: Colors.backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 8,
      marginHorizontal: 20,
      marginVertical: 6,
    },
    input: {
      flex: 1,
    },
  });

export default IconInput;
