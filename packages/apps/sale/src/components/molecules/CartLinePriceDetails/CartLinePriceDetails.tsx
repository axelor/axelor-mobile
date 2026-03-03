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
import {useTranslator} from '@axelor/aos-mobile-core';
import {usePriceFormat} from '@axelor/aos-mobile-ui';
import {PriceDetails} from '../../atoms';

interface CartLinePriceDetailsProps {
  style?: any;
  qty: number;
  cartLine: any;
}

const CartLinePriceDetails = ({
  style,
  qty,
  cartLine,
}: CartLinePriceDetailsProps) => {
  const I18n = useTranslator();
  const formatPrice = usePriceFormat();

  const totalPrice = useMemo(() => {
    return qty * parseInt(cartLine?.product?.salePrice, 10);
  }, [qty, cartLine?.product?.salePrice]);

  const priceList = useMemo(
    () => [
      {
        title: I18n.t('Sale_Quantity'),
        value: formatPrice(qty),
        unit: cartLine?.unit?.name,
      },
      {
        title: I18n.t('Sale_UnitPrice'),
        value: formatPrice(cartLine?.product?.salePrice),
        unit: cartLine?.product?.saleCurrency?.symbol,
      },
      {
        title: I18n.t(
          cartLine?.product?.inAti ? 'Sale_TotalATI' : 'Sale_TotalWT',
        ),
        value: totalPrice,
        unit: cartLine?.product?.saleCurrency?.symbol,
        showLine: true,
      },
    ],
    [I18n, formatPrice, qty, cartLine, totalPrice],
  );

  return <PriceDetails style={style} lineList={priceList} />;
};

export default CartLinePriceDetails;
