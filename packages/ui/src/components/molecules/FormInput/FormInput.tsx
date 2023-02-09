import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Text} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';
import {ThemeColors} from '../../../theme/themes';
import {getCommonStyles} from '../../../utils/commons-styles';

interface FormInputProps {
  title: string;
  defaultValue?: string;
  readOnly?: boolean;
  style?: any;
  required?: boolean;
  onChange?: (any: any) => void;
  onSelection?: () => void;
}

const FormInput = ({
  title,
  defaultValue = null,
  readOnly,
  style,
  required = false,
  onChange = () => {},
  onSelection,
}: FormInputProps) => {
  const Colors = useThemeColor();

  const [value, setValue] = useState(defaultValue);

  const _required = useMemo(
    () => required && (value == null || value === ''),
    [required, value],
  );

  const onValueChange = useCallback(
    _value => {
      setValue(_value);
      onChange(_value);
    },
    [onChange],
  );

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[commonStyles.filter, commonStyles.filterSize, styles.content]}>
        <Input
          style={styles.input}
          value={value}
          onChange={onValueChange}
          onSelection={onSelection}
          numberOfLines={null}
          readOnly={readOnly}
        />
      </View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    content: {
      width: '100%',
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
    },
    input: {
      width: '100%',
    },
    title: {
      marginLeft: 10,
    },
  });

export default FormInput;
