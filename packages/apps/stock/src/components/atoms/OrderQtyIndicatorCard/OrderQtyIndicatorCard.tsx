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

import React, {useCallback} from 'react';
import {
  DateDisplay,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
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
  const {
    Stock_PurchaseOrderLine: PurchaseOrderLine,
    Stock_SaleOrderLine: SaleOrderLine,
  } = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();

  const formatQty = useCallback(
    (_qty, titleKey) => {
      return {
        displayText: `${formatNumber(_qty)} ${unit?.name}`,
        indicatorText: `${I18n.t(titleKey)} :`,
        hideIf: _qty == null,
      };
    },
    [I18n, formatNumber, unit?.name],
  );

  return (
    <ObjectCard
      style={style}
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
          {...formatQty(qty, 'Stock_Quantity')},
          {...formatQty(deliveredQty, 'Stock_DeliveredQty')},
          {...formatQty(reservedQty, 'Stock_AllocatedQty')},
          {...formatQty(receivedQty, 'Stock_ReceivedQty')},
          {
            customComponent: (
              <DateDisplay
                date={estimatedShippingDate ?? estimatedReceiptDate}
                size={14}
                displayYear
              />
            ),
          },
        ],
      }}
      sideBadges={{
        items: [
          {
            displayText: getItemTitle(
              SaleOrderLine?.deliveryState,
              deliveryState,
            ),
            color: getItemColor(SaleOrderLine?.deliveryState, deliveryState),
            showIf: deliveryState == null,
          },
          {
            displayText: getItemTitle(
              PurchaseOrderLine?.receiptState,
              receiptState,
            ),
            color: getItemColor(PurchaseOrderLine?.receiptState, receiptState),
            showIf: receiptState == null,
          },
        ],
      }}
    />
  );
};

export default SaleOrderQtyIndicatorCard;
