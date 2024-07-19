/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {ObjectCard, useDigitFormat} from '@axelor/aos-mobile-ui';

interface SaleOrderQtyIndicatorCardProps {
  style?: any;
  saleOrder?: any;
  purchaseOrder?: any;
  qty: number;
  deliveredQty?: number;
  reservedQty?: number;
  receivedQty?: number;
  unit: any;
  estimatedShippingDate?: string;
  estimatedReceiptDate?: string;
  deliveryState?: number;
  receiptState?: number;
}

const SaleOrderQtyIndicatorCard = ({
  style,
  saleOrder,
  purchaseOrder,
  qty,
  deliveredQty,
  reservedQty,
  receivedQty,
  unit,
  estimatedShippingDate,
  estimatedReceiptDate,
  deliveryState,
  receiptState,
}: SaleOrderQtyIndicatorCardProps) => {
  const I18n = useTranslator();
  const {PurchaseOrderLine, SaleOrderLine} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        showArrow={false}
        touchable={false}
        upperTexts={{
          items: [
            {
              displayText:
                saleOrder?.saleOrderSeq ?? purchaseOrder?.purchaseOrderSeq,
              isTitle: true,
            },
            {
              iconName: 'house',
              indicatorText:
                saleOrder?.stockLocation ?? purchaseOrder?.stockLocation,
              hideIfNull: true,
            },
            {
              displayText: `${formatNumber(qty)} ${unit?.name}`,
              indicatorText: `${I18n.t('Stock_Quantity')} :`,
            },
            {
              displayText: `${formatNumber(deliveredQty)} ${unit?.name}`,
              indicatorText: `${I18n.t('Stock_DeliveredQty')} :`,
              hideIf: deliveredQty == null,
            },
            {
              displayText: `${formatNumber(reservedQty)} ${unit?.name}`,
              indicatorText: `${I18n.t('Stock_AllocatedQty')} :`,
              hideIf: reservedQty == null,
            },
            {
              displayText: `${formatNumber(receivedQty)} ${unit?.name}`,
              indicatorText: `${I18n.t('Stock_ReceivedQty')} :`,
              hideIf: receivedQty == null,
            },
            {
              iconName: 'calendar-event',
              indicatorText: estimatedShippingDate ?? estimatedReceiptDate,
              hideIfNull: true,
            },
          ],
        }}
        sideBadges={{
          items: [
            deliveryState != null && {
              displayText: getItemTitle(
                SaleOrderLine?.deliveryState,
                deliveryState,
              ),
              color: getItemColor(SaleOrderLine?.deliveryState, deliveryState),
            },
            receiptState != null && {
              displayText: getItemTitle(
                PurchaseOrderLine?.receiptState,
                receiptState,
              ),
              color: getItemColor(
                PurchaseOrderLine?.receiptState,
                receiptState,
              ),
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
  },
});

export default SaleOrderQtyIndicatorCard;
