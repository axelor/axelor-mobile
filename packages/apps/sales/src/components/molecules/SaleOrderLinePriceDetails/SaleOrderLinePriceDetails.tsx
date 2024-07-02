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

import React, {useMemo} from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {useDigitFormat, usePriceFormat} from '@axelor/aos-mobile-ui';
import {PriceDetails} from '../../atoms';

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

  const priceList = useMemo(
    () => [
      {
        title: I18n.t('Sales_Quantity'),
        value: formatNumber(saleOrderLine.qty),
        unit: saleOrderLine.unit?.name,
      },
      {
        title: I18n.t('Sales_UnitPrice'),
        value: formatPrice(saleOrderLine.price),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sales_UnitDiscounted'),
        value: formatPrice(saleOrderLine.priceDiscounted),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sales_Tax'),
        value: formatPrice(
          saleOrderLine.inTaxPrice - saleOrderLine.priceDiscounted,
        ),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t(saleOrder.inAti ? 'Sales_TotalATI' : 'Sales_TotalWT'),
        value: formatPrice(
          saleOrder.inAti ? saleOrderLine.inTaxTotal : saleOrderLine.exTaxTotal,
        ),
        unit: saleOrder.currency?.symbol,
        size: 20,
        showLine: true,
      },
    ],
    [I18n, formatNumber, formatPrice, saleOrder, saleOrderLine],
  );

  return <PriceDetails style={style} lineList={priceList} />;
};

export default SaleOrderLinePriceDetails;
