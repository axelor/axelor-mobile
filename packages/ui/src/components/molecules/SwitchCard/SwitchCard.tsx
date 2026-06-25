/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {getCommonStyles} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Switch, Text} from '../../atoms';

interface SwitchCardProps {
  style?: any;
  title: string;
  defaultValue: boolean;
  readonly?: boolean;
  onToggle: (_v?: boolean) => void;
}

const SwitchCard = ({
  style,
  title,
  defaultValue,
  readonly = false,
  onToggle,
}: SwitchCardProps) => {
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        styles.container,
        style,
      ]}
      testID="switchCardContainer">
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

const styles = StyleSheet.create({
  container: {
    width: '90%',
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
