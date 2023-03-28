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
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';

interface SupplierArrivalCardProps {
  style?: any;
  reference: string;
  status: number;
  client: string;
  origin: string;
  date: string;
  onPress: () => void;
}

const SupplierArrivalCard = ({
  style,
  reference,
  status,
  client,
  origin,
  date,
  onPress,
}: SupplierArrivalCardProps) => {
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

    if (status === StockMove.status.Planned) {
      return (
        <Text style={[styles.txtDetails, styles.creationDate]}>
          {`${I18n.t('Base_PlannedFor')} ${_date}`}
        </Text>
      );
    }

    return (
      <Text style={styles.txtDetails}>
        {`${I18n.t('Base_RealizedOn')} ${_date}`}
      </Text>
    );
  }, [I18n, date, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{reference}</Text>
          <Text style={styles.txtDetails}>{client}</Text>
          {origin != null && (
            <View style={styles.origin}>
              <Icon name="tag" size={12} style={styles.icon} />
              <Text style={styles.txtDetails}>{origin}</Text>
            </View>
          )}
          {_formatDate}
        </View>
        <View style={styles.rightContainer}>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
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

export default SupplierArrivalCard;
