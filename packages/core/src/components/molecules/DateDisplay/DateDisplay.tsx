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
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {getFullDateItems} from '../../../utils';

interface DateDisplayProps {
  date: string;
  size?: number;
  displayYear?: boolean;
}

const DateDisplay = ({
  date,
  size = 18,
  displayYear = false,
}: DateDisplayProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const _date = useMemo(() => getFullDateItems(date, I18n), [I18n, date]);

  if (_date == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Icon
        name="calendar-event"
        color={Colors.secondaryColor.foreground}
        size={size}
        style={styles.icon}
      />
      <Text fontSize={size}>{_date.day}</Text>
      <Text writingType="important" fontSize={size}>
        {` ${_date.date} ${_date.month}`}
      </Text>
      {displayYear && (
        <Text writingType="important" fontSize={size}>
          {` ${_date.year}`}
        </Text>
      )}
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

export default DateDisplay;
