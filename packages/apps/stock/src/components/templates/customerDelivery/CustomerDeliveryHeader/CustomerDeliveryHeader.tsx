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
import {StockMove} from '../../../../types';
import {StockMoveHeader} from '../../../organisms';

const CustomerDeliveryHeader = ({
  customerDelivery,
}: {
  customerDelivery: any;
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <StockMoveHeader
      reference={customerDelivery.stockMoveSeq}
      status={customerDelivery.statusSelect}
      date={StockMove.getStockMoveDate(
        customerDelivery.statusSelect,
        customerDelivery,
      )}
      availability={customerDelivery.availableStatusSelect}
      showMovementIndicator
      movementIndicatorData={{
        titleTop: customerDelivery.fromStockLocation?.name,
        labelTop: 'Stock_Origin',
        iconTop: 'house-down',
        titleDown:
          customerDelivery.toAddress?.fullName ?? customerDelivery.toAddressStr,
        labelDown: 'Stock_DestinationAddress',
        iconDown: 'geo-alt-fill',
      }}>
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
        <View style={styles.badgeContainer}>
          {customerDelivery?.isIspmRequired && (
            <Badge
              color={Colors.errorColor}
              title={I18n.t('Stock_StandardISPM')}
            />
          )}
        </View>
      </View>
    </StockMoveHeader>
  );
};

const styles = StyleSheet.create({
  generalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  clientInfos: {
    flex: 1,
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
});

export default CustomerDeliveryHeader;
