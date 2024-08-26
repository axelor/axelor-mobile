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

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ScrollView, usePriceFormat} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchCartLineById} from '../../features/cartLineSlice';
import {
  CartLineActionCard,
  CartLineValidationButton,
  PriceDetails,
  QuantityCard,
} from '../../components';

const CartLineDetailsScreen = ({route}) => {
  const {cartLineId} = route.params;

  const I18n = useTranslator();
  const dispatch = useDispatch();
  const formatPrice = usePriceFormat();

  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  useEffect(() => {
    dispatch((fetchCartLineById as any)({cartLineId}));
  }, [cartLineId, dispatch]);

  return (
    <Screen removeSpaceOnTop fixedItems={<CartLineValidationButton />}>
      <ScrollView style={styles.scrollView}>
        <CartLineActionCard
          cartLine={cartLine}
          cartId={activeCart?.id}
          hideIncrement={true}
          hideDelete={true}
        />
        <QuantityCard
          defaultValue={cartLine?.qty}
          labelQty={I18n.t('Sale_Quantity')}
          onValueChange={() => {}}
        />
        <PriceDetails
          lineList={[
            {
              title: I18n.t('Sale_Quantity'),
              value: formatPrice(cartLine?.qty),
              unit: cartLine?.unit?.name,
            },
            {
              title: I18n.t('Sale_Quantity'),
              value: formatPrice(cartLine?.qty),
              unit: cartLine?.unit?.name,
            },
            {
              showLine: true,
              title: I18n.t('Sale_Quantity'),
              value: formatPrice(cartLine?.qty),
              unit: cartLine?.unit?.name,
            },
          ]}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {height: null},
});

export default CartLineDetailsScreen;
