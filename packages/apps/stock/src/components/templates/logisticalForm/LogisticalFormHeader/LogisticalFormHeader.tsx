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
import {StyleSheet, View} from 'react-native';
import {Badge, LabelText, Text} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface LogisticalFormHeaderProps {
  logisticalForm?: any;
}

const LogisticalFormHeader = ({logisticalForm}: LogisticalFormHeaderProps) => {
  const I18n = useTranslator();
  const {LogisticalForm} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const statusBadge = useMemo(() => {
    const status = logisticalForm?.statusSelect;
    if (status == null) {
      return null;
    }

    return {
      color: getItemColor(LogisticalForm?.statusSelect, status),
      title: getItemTitle(LogisticalForm?.statusSelect, status),
    };
  }, [
    LogisticalForm?.statusSelect,
    getItemColor,
    getItemTitle,
    logisticalForm,
  ]);

  const formattedDate = useMemo(() => {
    if (!logisticalForm?.collectionDate) {
      return null;
    }

    return formatDate(logisticalForm.collectionDate, I18n.t('Base_DateFormat'));
  }, [I18n, logisticalForm?.collectionDate]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {logisticalForm?.deliveryNumberSeq && (
          <Text fontSize={18} writingType="important">
            {logisticalForm.deliveryNumberSeq}
          </Text>
        )}
        {statusBadge != null && (
          <Badge color={statusBadge.color} title={statusBadge.title} />
        )}
      </View>
      <View style={styles.bottomRow}>
        {logisticalForm?.stockLocation?.name && (
          <LabelText
            iconName="geo-alt-fill"
            title={`${I18n.t('Stock_StockLocation')}:`}
            value={logisticalForm.stockLocation.name}
          />
        )}
        {formattedDate && (
          <LabelText
            iconName="calendar-event"
            title={`${I18n.t('Stock_CollectionDate')}:`}
            value={formattedDate}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomRow: {
    marginTop: 8,
    gap: 4,
  },
});

export default LogisticalFormHeader;
