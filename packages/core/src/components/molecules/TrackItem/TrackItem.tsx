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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Text} from '@axelor/aos-mobile-ui';
import {isDate, isDateTime} from '../../../utils/date';
import useTranslator from '../../../i18n/hooks/use-translator';
import {formatDate, formatDateTime} from '../../../utils/formatters';

export const formatDateItem = (date, I18n) => {
  return isDateTime(date)
    ? formatDateTime(date, I18n.t('Base_DateTimeFormat'))
    : formatDate(date, I18n.t('Base_DateFormat'));
};

const TrackItem = ({title, oldDisplayValue, oldValue, displayValue, value}) => {
  const I18n = useTranslator();

  const values = useMemo(() => {
    return {
      oldValue: oldDisplayValue || oldValue,
      value: displayValue || value,
    };
  }, [oldDisplayValue, oldValue, displayValue, value]);

  const parseDate = useCallback(
    (item: string): string => {
      return isDate(item) ? formatDateItem(item, I18n) : item;
    },
    [I18n],
  );

  return (
    <Text style={styles.listItem}>
      <Text style={styles.itemTitle}>{`${title}: `}</Text>
      <Text style={styles.itemValue}>
        {parseDate(values.oldValue)}
        {values.oldValue && (
          <Icon name="arrow-right" size={10} style={styles.arrowIcon} />
        )}
        {parseDate(values.value)}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    paddingHorizontal: 5,
  },
  listItem: {
    flexDirection: 'row',
    fontSize: 13,
  },
  itemTitle: {
    fontWeight: 'bold',
  },

  itemValue: {
    textAlign: 'justify',
  },
});

export default TrackItem;
