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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  Text,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {useStockLinesCheckQty} from '../../../hooks';

interface StockMoveHeaderProps {
  reference: string;
  lineRef?: string;
  status: number;
  date: string;
  availability: number;
  stockMoveLineId?: number;
}

const StockMoveHeader = ({
  reference,
  lineRef,
  status,
  date,
  availability,
  stockMoveLineId,
}: StockMoveHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {StockMove} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();

  const checkQtyObject = useStockLinesCheckQty(stockMoveLineId);

  return (
    <View style={styles.container}>
      <View>
        {lineRef != null && (
          <Text style={styles.text_important}>{lineRef}</Text>
        )}
        {reference != null && (
          <Text
            style={
              lineRef != null ? styles.text_secondary : styles.text_important
            }>
            {reference}
          </Text>
        )}
        {date != null && (
          <Text style={styles.text_secondary}>
            {formatDate(date, I18n.t('Base_DateFormat'))}
          </Text>
        )}
      </View>
      <View style={styles.badgesContainer}>
        <Badge
          color={getItemColor(StockMove?.statusSelect, status)}
          title={getItemTitle(StockMove?.statusSelect, status)}
        />
        <View style={styles.rowContainer}>
          {Number(checkQtyObject?.missingQty ?? 0) !== 0 && (
            <Badge
              color={Colors.errorColor}
              title={formatNumber(checkQtyObject?.missingQty)}
            />
          )}
          {availability != null && availability > 0 && (
            <Badge
              color={getItemColor(
                StockMove?.availableStatusSelect,
                availability,
              )}
              title={
                checkQtyObject?.availability ??
                getItemTitle(StockMove?.availableStatusSelect, availability)
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 5,
  },
  badgesContainer: {
    alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
});

export default StockMoveHeader;
