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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../types/stock-move';

interface StockMoveHeaderProps {
  reference: string;
  lineRef?: string;
  status: number;
  date: string;
  availability: number;
}

const StockMoveHeader = ({
  reference,
  lineRef,
  status,
  date,
  availability,
}: StockMoveHeaderProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
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
      <View style={styles.badgeContainer}>
        <Badge
          color={StockMove.getStatusColor(status, Colors)}
          title={StockMove.getStatus(status, I18n)}
        />
        {availability == null ? (
          <View style={styles.refContainer} />
        ) : (
          <Badge
            color={StockMove.getAvailabilityColor(availability, Colors)}
            title={StockMove.getAvailability(availability, I18n)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 24,
  },
  badgeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 32,
    flexDirection: 'row-reverse',
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
