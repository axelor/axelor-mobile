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
import {Text} from '@axelor/aos-mobile-ui';

interface DateIntervalProps {
  startDate: string;
  endDate: string;
  style?: any;
}

const DatesInterval = ({startDate, endDate, style}: DateIntervalProps) => {
  const I18n = useTranslator();

  const _startDate = useMemo(
    () => getFullDateItems(startDate, I18n),
    [startDate, I18n],
  );
  const _endDate = useMemo(
    () => getFullDateItems(endDate, I18n),
    [endDate, I18n],
  );

  const renderDates = () => {
    if (_startDate === _endDate || _endDate == null) {
      return (
        <>
          <Text style={styles.space}>{_startDate.date}</Text>
          <Text writingType="important" style={styles.space}>
            {_startDate.month}
          </Text>
          <Text>{_startDate.year}</Text>
          {_endDate == null && <Text> - ...</Text>}
        </>
      );
    } else if (
      _startDate.month === _endDate.month &&
      _startDate.year === _endDate.year
    ) {
      return (
        <>
          <Text style={styles.space}>
            {_startDate.date} - {_endDate.date}
          </Text>
          <Text writingType="important" style={styles.space}>
            {_startDate.month}
          </Text>
          <Text>{_startDate.year}</Text>
        </>
      );
    } else if (_startDate.year === _endDate.year) {
      return (
        <>
          <Text style={styles.space}>{_startDate.date}</Text>
          <Text writingType="important" style={styles.space}>
            {_startDate.month}
          </Text>
          <Text style={styles.space}>{`- ${_endDate.date}`}</Text>
          <Text writingType="important" style={styles.space}>
            {_endDate.month}
          </Text>
          <Text>{_startDate.year}</Text>
        </>
      );
    } else {
      return (
        <>
          <Text writingType="important" style={styles.space}>
            {_startDate.month}
          </Text>
          <Text style={styles.space}>{`${_startDate.year} -`}</Text>
          <Text writingType="important" style={styles.space}>
            {_endDate.month}
          </Text>
          <Text>{_endDate.year}</Text>
        </>
      );
    }
  };

  return <View style={[styles.container, style]}>{renderDates()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  space: {
    marginRight: 5,
  },
});

export default DatesInterval;
