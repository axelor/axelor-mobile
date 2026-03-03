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
import {useTranslator} from '@axelor/aos-mobile-core';
import {LabelText, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {StockMoveHeader} from '../../../organisms';
import StockMove from '../../../../types/stock-move';

const CustomerDeliveryHeader = ({customerDelivery}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View>
      <StockMoveHeader
        reference={customerDelivery.stockMoveSeq}
        status={customerDelivery.statusSelect}
        date={
          customerDelivery
            ? StockMove.getStockMoveDate(
                customerDelivery.statusSelect,
                customerDelivery,
              )
            : null
        }
        availability={customerDelivery.availableStatusSelect}
      />
      <View style={styles.generalInfoContainer}>
        <View style={styles.clientInfos}>
          {customerDelivery.partner?.fullName && (
            <LabelText
              iconName="person-fill"
              title={customerDelivery.partner?.fullName}
            />
          )}
          {customerDelivery?.origin && (
            <LabelText iconName="tag-fill" title={customerDelivery?.origin} />
          )}
        </View>
        <View style={styles.ispmInfos}>
          {customerDelivery?.isIspmRequired && (
            <Badge
              color={Colors.errorColor}
              title={I18n.t('Stock_StandardISPM')}
              style={styles.ispmBadge}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  generalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  clientInfos: {
    flex: 3,
  },
  ispmInfos: {
    flex: 2,
    flexDirection: 'row-reverse',
  },
  ispmBadge: {
    width: '90%',
  },
});

export default CustomerDeliveryHeader;
