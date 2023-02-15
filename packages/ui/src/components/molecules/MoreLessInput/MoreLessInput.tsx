/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useMemo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Input, Text} from '../../atoms';
import {getCommonStyles} from '../../../utils/commons-styles';

interface MoreLessInputProps {
  style?: any;
  title: string;
  readOnly?: boolean;
  defaultValue?: string;
  onChange: (value: any) => void;
}

const MoreLessInput = ({
  style,
  title,
  readOnly,
  defaultValue = null,
  onChange,
}: MoreLessInputProps) => {
  const Colors = useThemeColor();
  const [value, setValue] = useState(defaultValue);

  const onValueChange = useCallback(
    _value => {
      setValue(_value);
      onChange(_value);
    },
    [onChange],
  );

  const onMinus = () => {
    let result = Number(value);
    result = result - 1;
    setValue(result.toString());
    onChange(result.toString());
  };
  const onPlus = () => {
    let result = Number(value);
    result = result + 1;
    setValue(result.toString());
    onChange(result.toString());
  };

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[commonStyles.filter, commonStyles.filterSize, styles.content]}>
        <Icon
          name="minus"
          size={24}
          color={Colors.primaryColor.background}
          touchable={true}
          onPress={() => onMinus()}
          style={styles.container_icon}
        />
        <Input
          value={value}
          onChange={onValueChange}
          numberOfLines={null}
          readOnly={readOnly}
        />
        <Icon
          name="plus"
          size={24}
          color={Colors.primaryColor.background}
          touchable={true}
          onPress={() => onPlus()}
          style={styles.container_icon}
        />
      </View>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    title: {
      marginHorizontal: 24,
    },
    content: {
      borderColor: Colors.secondaryColor.background,
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
    container_icon: {
      backgroundColor: Colors.backgroundColor,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      padding: 2,
      paddingHorizontal: 5,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 0.5,
      borderRadius: 10,
    },
  });

export default MoreLessInput;
