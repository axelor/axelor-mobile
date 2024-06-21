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
import {useModules, useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

interface SaleOrderBottomButtonProps {
  saleOrderStatus: number;
}

const SaleOrderBottomButton = ({
  saleOrderStatus,
}: SaleOrderBottomButtonProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {SaleOrder} = useTypes();
  const {checkModule} = useModules();

  if (saleOrderStatus === SaleOrder?.statusSelect.Draft) {
    return (
      <Button title={I18n.t('Base_Confirm')} color={Colors.primaryColor} />
    );
  }

  if (
    saleOrderStatus === SaleOrder?.statusSelect.Confirmed &&
    checkModule('app-stock')
  ) {
    return (
      <Button
        title={I18n.t('Sales_CheckCustomerDelivery')}
        color={Colors.infoColor}
      />
    );
  }

  return null;
};

export default SaleOrderBottomButton;
