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

import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  QuantityCard,
  Screen,
  ScrollView,
  usePriceFormat,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchCartLineById} from '../../features/cartLineSlice';
import {
  CartLineActionCard,
  CartLineValidationButton,
  PriceDetails,
} from '../../components';

const CartLineDetailsScreen = ({route}) => {
  const {cartLineId} = route.params;

  const I18n = useTranslator();
  const dispatch = useDispatch();
  const formatPrice = usePriceFormat();

  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  const [newQty, setNewQty] = useState(cartLine?.qty);

  useEffect(() => {
    dispatch((fetchCartLineById as any)({cartLineId}));
  }, [cartLineId, dispatch]);

  useEffect(() => {
    setNewQty(cartLine?.qty);
  }, [cartLine?.qty]);

  const totalPrice = useMemo(() => {
    return newQty * parseInt(cartLine?.product?.salePrice, 10);
  }, [newQty, cartLine?.product?.salePrice]);

  return (
    <Screen fixedItems={<CartLineValidationButton newQty={newQty} />}>
      <ScrollView style={styles.container}>
        <CartLineActionCard
          cartLine={cartLine}
          cartId={activeCart?.id}
          hideIncrement={true}
          hideDelete={true}
          hideBadgeInformation={true}
          style={styles.card}
        />
        <QuantityCard
          editable={true}
          translator={I18n.t}
          defaultValue={cartLine?.qty}
          labelQty={I18n.t('Sale_Quantity')}
          onValueChange={setNewQty}
          isBigButton
          style={styles.card}
        />
        <PriceDetails
          lineList={[
            {
              title: I18n.t('Sale_Quantity'),
              value: formatPrice(newQty),
              unit: cartLine?.unit?.name,
            },
            {
              title: I18n.t('Sale_UnitPrice'),
              value: formatPrice(cartLine?.product?.salePrice),
              unit: cartLine?.product?.saleCurrency?.symbol,
            },
            {
              showLine: true,
              title: I18n.t(
                cartLine?.product?.inAti ? 'Sale_TotalATI' : 'Sale_TotalWT',
              ),
              value: totalPrice,
              unit: cartLine?.product?.saleCurrency?.symbol,
            },
          ]}
          style={styles.card}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: null,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  card: {
    width: '90%',
    marginVertical: 5,
  },
});

export default CartLineDetailsScreen;
