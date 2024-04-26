/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Switch, Text} from '../../atoms';

interface SwitchCardProps {
  style?: any;
  title: string;
  defaultValue: boolean;
  required?: boolean;
  readonly?: boolean;
  onToggle: (any) => void;
}

const SwitchCard = ({
  style,
  title,
  defaultValue,
  required = false,
  readonly = false,
  onToggle = () => {},
}: SwitchCardProps) => {
  const Colors = useThemeColor();

  const _required = useMemo(
    () => required && defaultValue == null,
    [required, defaultValue],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );
  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        commonStyles.filterSize,
        styles.container,
        style,
      ]}>
      <Text numberOfLines={2} style={styles.text}>
        {title}
      </Text>
      <Switch
        style={styles.switch}
        isEnabled={defaultValue}
        readonly={readonly}
        handleToggle={onToggle}
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    container: {
      width: '90%',
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
      minHeight: 40,
    },
    text: {
      flex: 3,
    },
    switch: {
      flex: 1,
    },
  });

export default SwitchCard;
