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
import {
  useDispatch,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {createSaleOrder} from '../../../features/saleOrderSlice';

interface SaleQuotationCreationButtonsProps {
  isProduct: boolean;
  productQty: number;
  isEditionMode: boolean;
  addProduct: () => void;
  lines: any[];
  customerId: number;
  deliveredPartnerId?: number;
  requireDeliveredPartner?: boolean;
  paymentModeId: number;
  paymentConditionId: number;
}

const SaleQuotationCreationButtons = ({
  isProduct,
  productQty,
  isEditionMode,
  addProduct,
  lines,
  customerId,
  deliveredPartnerId,
  requireDeliveredPartner = false,
  paymentModeId,
  paymentConditionId,
}: SaleQuotationCreationButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRealizePress = () => {
    dispatch(
      (createSaleOrder as any)({
        saleOrderLineList: lines.map(line => ({
          productId: line.product?.id,
          quantity: line.qty,
        })),
        customerId,
        deliveredPartnerId,
        paymentModeId,
        paymentConditionId,
      }),
    );

    navigation.pop();
  };

  if (isProduct) {
    return (
      <Button
        title={I18n.t(isEditionMode ? 'Base_Save' : 'Base_Add')}
        iconName={isEditionMode ? 'floppy-fill' : 'plus-lg'}
        color={Colors.infoColor}
        width="90%"
        disabled={productQty === 0}
        onPress={addProduct}
      />
    );
  }

  if (Array.isArray(lines) && lines.length > 0) {
    return (
      <Button
        title={I18n.t('Base_Realize')}
        iconName="check-lg"
        width="90%"
        disabled={requireDeliveredPartner && deliveredPartnerId == null}
        onPress={handleRealizePress}
      />
    );
  }

  return null;
};

export default SaleQuotationCreationButtons;
