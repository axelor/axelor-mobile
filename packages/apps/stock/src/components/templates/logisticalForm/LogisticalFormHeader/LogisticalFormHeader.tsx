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
import {
  Badge,
  HorizontalRule,
  LabelText,
  MovementIndicationCard,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
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
  children?: any;
}

const LogisticalFormHeader = ({
  statusSelect,
  deliveryNumberSeq,
  collectionDate,
  stockLocation,
  deliverToCustomerPartner,
  children,
}: LogisticalFormHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
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

  const movementIndicatorData = useMemo(() => {
    const _customer = isMultiClientsEnabled
      ? null
      : deliverToCustomerPartner?.fullName;

    if (!stockLocation?.name && !_customer) return undefined;

    return {
      titleTop: stockLocation?.name,
      labelTop: 'Stock_StockLocation',
      iconTop: 'house-down',
      titleDown: _customer,
      labelDown: 'Stock_DeliverToCustomerPartner',
      iconDown: 'person-fill',
    };
  }, [
    deliverToCustomerPartner?.fullName,
    isMultiClientsEnabled,
    stockLocation?.name,
  ]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.columnWrapper}>
          {deliveryNumberSeq && (
            <Text writingType="important">{deliveryNumberSeq}</Text>
          )}
          {formattedDate && (
            <LabelText
              iconName="calendar-event"
              title={`${I18n.t('Stock_CollectionDate')} :`}
              value={formattedDate}
            />
          )}
        </View>
        <View style={styles.badgesContainer}>
          {statusBadge != null && (
            <Badge color={statusBadge.color} title={statusBadge.title} />
          )}
        </View>
      </View>
      {children}
      {movementIndicatorData != null && (
        <>
          <HorizontalRule
            style={styles.line}
            color={Colors.secondaryColor.background_light}
          />
          <MovementIndicationCard
            {...movementIndicatorData}
            labelTop={I18n.t(movementIndicatorData.labelTop)}
            labelDown={I18n.t(movementIndicatorData.labelDown)}
            displayCard={false}
          />
        </>
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
    marginBottom: 5,
  },
  columnWrapper: {
    flex: 1,
    gap: 5,
  },
  badgesContainer: {
    alignItems: 'flex-end',
  },
  line: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default LogisticalFormHeader;
