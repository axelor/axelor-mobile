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

import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {QuantityCard, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchCartLineById} from '../../features/cartLineSlice';
import {
  CartLineActionCard,
  CartLinePriceDetails,
  CartLineValidationButton,
} from '../../components';

const CartLineDetailsScreen = ({route}) => {
  const {cartLineId} = route.params;

  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  const [newQty, setNewQty] = useState(cartLine?.qty);

  const refreshLine = useCallback(() => {
    dispatch((fetchCartLineById as any)({cartLineId}));
  }, [cartLineId, dispatch]);

  useEffect(() => {
    refreshLine();
  }, [refreshLine]);

  useEffect(() => {
    setNewQty(cartLine?.qty);
  }, [cartLine?.qty]);

  return (
    <Screen fixedItems={<CartLineValidationButton newQty={newQty} />}>
      <ScrollView
        style={styles.container}
        refresh={{fetcher: refreshLine, loading: false}}>
        <CartLineActionCard
          cartLine={cartLine}
          hideIncrement={true}
          hideDelete={true}
          hideBadgeInformation={true}
          style={styles.card}
        />
        <QuantityCard
          labelQty={I18n.t('Sale_Quantity')}
          defaultValue={cartLine?.qty}
          onValueChange={setNewQty}
          editable={true}
          isBigButton
          translator={I18n.t}
          style={styles.card}
        />
        <CartLinePriceDetails cartLine={cartLine} qty={newQty} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: null,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 5,
  },
});

export default CartLineDetailsScreen;
