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

import React, {useCallback, useMemo} from 'react';
import {
  useCurrencyFormat,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {PriceDetails} from '../../atoms';

interface SaleOrderPriceDetailsProps {
  style?: any;
  saleOrder: any;
}

const SaleOrderPriceDetails = ({
  style,
  saleOrder,
}: SaleOrderPriceDetailsProps) => {
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();
  const formatCurrencyPrice = useCurrencyFormat();

  const formatPrice = useCallback(
    (amount: string | number) =>
      formatCurrencyPrice(amount, saleOrder.currency?.id),
    [formatCurrencyPrice, saleOrder.currency?.id],
  );

  const priceList = useMemo(
    () => [
      {
        title: I18n.t('Sale_TotalWT'),
        value: formatPrice(saleOrder.exTaxTotal),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sale_TotalTax'),
        value: formatPrice(saleOrder.taxTotal),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sale_TotalATI'),
        value: formatPrice(saleOrder.inTaxTotal),
        unit: saleOrder.currency?.symbol,
        size: 20,
        showLine: true,
      },
      {
        title: I18n.t('Sale_AmountInvoiced'),
        value: formatPrice(saleOrder.amountInvoiced),
        unit: saleOrder.currency?.symbol,
        hideIf: saleOrder.statusSelect <= SaleOrder?.statusSelect.Finalized,
      },
      {
        title: I18n.t('Sale_AdvanceTotal'),
        value: formatPrice(saleOrder.advanceTotal),
        unit: saleOrder.currency?.symbol,
        hideIf: saleOrder.statusSelect <= SaleOrder?.statusSelect.Finalized,
      },
    ],
    [formatPrice, I18n, SaleOrder?.statusSelect.Finalized, saleOrder],
  );

  return <PriceDetails style={style} lineList={priceList} />;
};

export default SaleOrderPriceDetails;
