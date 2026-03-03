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
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {isToday} from '../../../utils';
import {getShortName} from './agenda.helpers';

const DayDisplay = ({date}: {date: Date}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const todayStyle = useMemo(
    () => (date && isToday(date) ? Colors.primaryColor.background : undefined),
    [Colors.primaryColor.background, date],
  );

  if (date) {
    return (
      <View style={[styles.day]}>
        <Text style={styles.dayNum} textColor={todayStyle}>
          {date.getDate()}
        </Text>
        <Text style={styles.dayText} textColor={todayStyle}>
          {I18n.t(getShortName(date))}
        </Text>
      </View>
    );
  } else {
    return <View style={styles.day} />;
  }
};

const styles = StyleSheet.create({
  dayNum: {
    fontSize: 28,
    fontWeight: '200',
  },
  dayText: {
    fontSize: 14,
    marginTop: -5,
  },
  day: {
    width: 63,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 16,
  },
});

export default DayDisplay;
