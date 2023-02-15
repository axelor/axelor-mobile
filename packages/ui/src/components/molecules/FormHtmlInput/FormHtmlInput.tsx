import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {HtmlInput, Text} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';
import {ThemeColors} from '../../../theme/themes';
import {getCommonStyles} from '../../../utils/commons-styles';

interface FormHtmlInputProps {
  title: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
  style?: any;
  required?: boolean;
  onChange?: (any: any) => void;
}

const FormHtmlInput = ({
  title,
  placeholder = '',
  defaultValue = null,
  readonly = false,
  style,
  required = false,
  onChange = () => {},
}: FormHtmlInputProps) => {
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
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <View style={[commonStyles.filter, styles.content]}>
        <HtmlInput
          defaultInput={value}
          onChange={onValueChange}
          placeholder={placeholder}
          readonly={readonly}
          style={styles.input}
          styleToolbar={styles.htmlToolBar}
        />
      </View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    content: {
      width: '90%',
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
    },
    htmlToolBar: {
      backgroundColor: null,
      marginLeft: -5,
    },
    input: {
      width: '100%',
    },
    title: {
      marginLeft: 10,
    },
  });

export default FormHtmlInput;
