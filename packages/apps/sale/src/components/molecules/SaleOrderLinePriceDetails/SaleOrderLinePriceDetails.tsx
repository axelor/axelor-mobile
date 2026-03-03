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
import {useCurrencyFormat, useTranslator} from '@axelor/aos-mobile-core';
import {useDigitFormat, usePriceFormat} from '@axelor/aos-mobile-ui';
import {PriceDetails} from '../../atoms';
import {SaleOrderLineAvailabilityBadges} from '../../molecules';

interface SaleOrderLinePriceDetailsProps {
  style?: any;
  saleOrder: any;
  saleOrderLine: any;
}

const SaleOrderLinePriceDetails = ({
  style,
  saleOrder,
  saleOrderLine,
}: SaleOrderLinePriceDetailsProps) => {
  const I18n = useTranslator();
  const formatPrice = usePriceFormat();
  const formatNumber = useDigitFormat();
  const formatCurrencyPrice = useCurrencyFormat();

  const priceList = useMemo(
    () => [
      {
        title: I18n.t('Sale_Quantity'),
        value: formatNumber(saleOrderLine.qty),
        unit: saleOrderLine.unit?.name,
      },
      {
        title: I18n.t('Sale_UnitPrice'),
        value: formatPrice(saleOrderLine.price),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sale_UnitDiscounted'),
        value: formatPrice(saleOrderLine.priceDiscounted),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sale_Tax'),
        value: formatPrice(
          saleOrderLine.inTaxPrice - saleOrderLine.priceDiscounted,
        ),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t(saleOrder.inAti ? 'Sale_TotalATI' : 'Sale_TotalWT'),
        value: formatCurrencyPrice(
          saleOrder.inAti ? saleOrderLine.inTaxTotal : saleOrderLine.exTaxTotal,
          saleOrder.currency?.id,
        ),
        unit: saleOrder.currency?.symbol,
        size: 20,
        showLine: true,
      },
    ],
    [
      I18n,
      formatCurrencyPrice,
      formatNumber,
      formatPrice,
      saleOrder,
      saleOrderLine,
    ],
  );

  return (
    <PriceDetails
      style={style}
      lineList={priceList}
      topChildren={
        <SaleOrderLineAvailabilityBadges saleOrderLine={saleOrderLine} />
      }
    />
  );
};

export default SaleOrderLinePriceDetails;
