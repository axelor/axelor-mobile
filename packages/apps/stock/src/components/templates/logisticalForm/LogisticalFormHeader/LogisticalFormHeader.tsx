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
import {Badge, LabelText, Text} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface LogisticalFormHeaderProps {
  statusSelect?: number;
  deliveryNumberSeq: string;
  collectionDate: string;
  stockLocation?: any;
  deliverToCustomerPartner?: any;
}

const LogisticalFormHeader = ({
  statusSelect,
  deliveryNumberSeq,
  collectionDate,
  stockLocation,
  deliverToCustomerPartner,
}: LogisticalFormHeaderProps) => {
  const I18n = useTranslator();
  const {LogisticalForm} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {user} = useSelector(state => state.user);

  const isMultiClientsEnabled = useMemo(
    () => user.activeCompany?.stockConfig?.isLogisticalFormMultiClientsEnabled,
    [user.activeCompany?.stockConfig?.isLogisticalFormMultiClientsEnabled],
  );

  const statusBadge = useMemo(() => {
    if (statusSelect == null) return null;

    return {
      color: getItemColor(LogisticalForm?.statusSelect, statusSelect),
      title: getItemTitle(LogisticalForm?.statusSelect, statusSelect),
    };
  }, [LogisticalForm?.statusSelect, getItemColor, getItemTitle, statusSelect]);

  const formattedDate = useMemo(() => {
    if (!collectionDate) return null;

    return formatDate(collectionDate, I18n.t('Base_DateFormat'));
  }, [I18n, collectionDate]);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {deliveryNumberSeq && (
          <Text fontSize={18} writingType="important">
            {deliveryNumberSeq}
          </Text>
        )}
        {stockLocation?.name && (
          <LabelText
            iconName="geo-alt-fill"
            title={`${I18n.t('Stock_StockLocation')}:`}
            value={stockLocation.name}
          />
        )}
        {formattedDate && (
          <LabelText
            iconName="calendar-event"
            title={`${I18n.t('Stock_CollectionDate')}:`}
            value={formattedDate}
          />
        )}
        {!isMultiClientsEnabled && deliverToCustomerPartner?.fullName && (
          <LabelText
            iconName="person-fill"
            title={`${I18n.t('Stock_DeliverToCustomerPartner')}:`}
            value={deliverToCustomerPartner?.fullName}
          />
        )}
      </View>
      {statusBadge != null && (
        <Badge
          color={statusBadge.color}
          title={statusBadge.title}
          style={styles.badge}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    gap: 5,
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    gap: 5,
  },
  badge: {
    width: undefined,
    paddingHorizontal: 10,
    marginHorizontal: 0,
  },
});

export default LogisticalFormHeader;
