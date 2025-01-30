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
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import Inventory from '../../../../types/inventory';

interface InventoryCardProps {
  style?: any;
  reference: string;
  status: number;
  date: string;
  stockLocation?: string;
  onPress: () => void;
}

const InventoryCard = ({
  style,
  reference,
  status,
  date,
  stockLocation,
  onPress,
}: InventoryCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(Inventory.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (status === Inventory.status.Planned) {
      return (
        <Text style={[styles.txtDetails, styles.creationDate]}>
          {`${I18n.t('Base_PlannedFor')} ${_date}`}
        </Text>
      );
    }

    if (status === Inventory.status.InProgress) {
      return (
        <Text style={[styles.txtDetails, styles.creationDate]}>
          {`${I18n.t('Base_StartedOn')} ${_date}`}
        </Text>
      );
    }

    if (status === Inventory.status.Completed) {
      return (
        <Text style={styles.txtDetails}>
          {`${I18n.t('Base_CompletedOn')} ${_date}`}
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
          <Text style={styles.txtImportant}>{reference}</Text>
          {stockLocation != null && (
            <Text style={styles.txtDetails}>{stockLocation}</Text>
          )}
          {_formatDate}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
        />
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  textContainer: {
    width: '90%',
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

export default InventoryCard;
