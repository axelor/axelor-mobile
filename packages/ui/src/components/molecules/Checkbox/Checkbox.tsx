/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Text} from '../../atoms';
import {checkNullString} from '../../../utils/strings';

interface CheckboxProps {
  style?: any;
  styleTxt?: any;
  iconSize?: number;
  disabled?: boolean;
  title?: string;
  isDefaultChecked?: boolean;
  onChange: (any: any) => void;
}

const Checkbox = ({
  style,
  styleTxt,
  iconSize = 30,
  disabled = false,
  title,
  isDefaultChecked = false,
  onChange,
}: CheckboxProps) => {
  const Colors = useThemeColor();

  const [isChecked, setIsChecked] = useState(isDefaultChecked);

  const iconName = useMemo(
    () => (isChecked ? 'check-square' : 'square-o'),
    [isChecked],
  );

  const handleToggle = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  const styles = useMemo(() => getStyles(iconSize), [iconSize]);

  useEffect(() => {
    setIsChecked(isDefaultChecked);
  }, [isDefaultChecked]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon
          name={iconName}
          FontAwesome5={false}
          color={
            disabled
              ? Colors.secondaryColor.background
              : Colors.primaryColor.background
          }
          size={iconSize}
          touchable={!disabled}
          onPress={handleToggle}
        />
      </View>
      {!checkNullString(title) && (
        <Text
          style={[styles.title, styleTxt]}
          textColor={Colors.text}
          fontSize={14}>
          {title}
        </Text>
      )}
    </View>
  );
};

const getStyles = iconSize =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    iconContainer: {
      width: iconSize,
      height: iconSize,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      marginLeft: 5,
      fontWeight: '600',
    },
  });

export default Checkbox;
