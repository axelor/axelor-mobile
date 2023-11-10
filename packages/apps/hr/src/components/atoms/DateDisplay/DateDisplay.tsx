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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {getFullDateItems, useTranslator} from '@axelor/aos-mobile-core';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface IconDateProps {
  date: string;
  size?: number;
}

const IconDate = ({date, size = 18}: IconDateProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const _date = useMemo(() => getFullDateItems(date, I18n), [I18n, date]);

  return (
    <View style={styles.container}>
      <Icon
        name="calendar-alt"
        color={Colors.secondaryColor.foreground}
        size={size}
        style={styles.icon}
      />
      <Text fontSize={size}>{_date.day}</Text>
      <Text writingType="important" fontSize={size}>
        {` ${_date.date} ${_date.month}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default IconDate;
