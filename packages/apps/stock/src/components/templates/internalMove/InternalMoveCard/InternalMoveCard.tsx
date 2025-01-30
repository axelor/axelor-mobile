/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Badge, Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';

interface InternalMoveCardProps {
  style?: any;
  name: string;
  status: number;
  availability: number;
  fromStockLocation: string;
  toStockLocation: string;
  origin: string;
  date: string;
  onPress: () => void;
}

const InternalMoveCard = ({
  style,
  name,
  status,
  availability,
  fromStockLocation,
  toStockLocation,
  origin,
  date,
  onPress,
}: InternalMoveCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(StockMove.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (status === StockMove.status.Draft) {
      return (
        <Text style={[styles.txtDetails, styles.creationDate]}>
          {`${I18n.t('Base_CreatedOn')} ${_date}`}
        </Text>
      );
    }

    if (status === StockMove.status.Planned) {
      return (
        <Text style={[styles.txtDetails, styles.creationDate]}>
          {`${I18n.t('Base_PlannedFor')} ${_date}`}
        </Text>
      );
    }

    return (
      <Text style={styles.txtDetails}>
        {`${I18n.t('Base_ValidatedOn')} ${_date}`}
      </Text>
    );
  }, [I18n, date, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{name}</Text>
          <Text style={styles.txtDetails}>{fromStockLocation}</Text>
          <Text style={styles.txtDetails}>{toStockLocation}</Text>
          {origin != null && (
            <View style={styles.origin}>
              <Icon name="tag" size={12} style={styles.icon} />
              <Text style={styles.txtDetails}>{origin}</Text>
            </View>
          )}
          {_formatDate}
        </View>
        <View style={styles.rightContainer}>
          {availability != null && (
            <Badge
              color={StockMove.getAvailabilityColor(availability, Colors)}
              title={StockMove.getAvailability(availability, I18n)}
            />
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  rightContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
  creationDate: {
    fontStyle: 'italic',
  },
  origin: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default InternalMoveCard;
