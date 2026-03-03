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
import {Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {areObjectsEquals, getFullDateItems} from '../../../utils';

const BoldText = props => <Text style={styles.boldText}>{props.children}</Text>;

interface PeriodDisplayProps {
  startDate: string;
  endDate: string;
  style?: any;
}

const PeriodDisplay = ({startDate, endDate, style}: PeriodDisplayProps) => {
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
    if (
      areObjectsEquals(_startDate, _endDate) ||
      _startDate == null ||
      _endDate == null
    ) {
      const _date = _startDate ?? _endDate;

      // prettier-ignore
      return (
        <Text>
          {_date.date} <BoldText>{_date.month}</BoldText> {_date.year}
        </Text>
      );
    } else if (
      _startDate.month === _endDate.month &&
      _startDate.year === _endDate.year
    ) {
      // prettier-ignore
      return (
        <Text>
          <BoldText>{_startDate.date} - {_endDate.date}</BoldText>{` ${_startDate.month} ${_startDate.year}`}
        </Text>
      );
    } else if (_startDate.year === _endDate.year) {
      // prettier-ignore
      return (
        <Text>
          {_startDate.date} <BoldText>{_startDate.month}</BoldText>{` - ${_endDate.date} `}<BoldText>{_endDate.month}</BoldText> {_startDate.year}
        </Text>
      );
    } else {
      // prettier-ignore
      return (
        <Text>
          <BoldText>{_startDate.month}</BoldText>{` ${_startDate.year} - `}<BoldText>{_endDate.month}</BoldText> {_endDate.year}
        </Text>
      );
    }
  };

  if (_startDate == null && _endDate == null) {
    return null;
  }

  return <View style={style}>{renderDates()}</View>;
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: '900',
  },
});

export default PeriodDisplay;
