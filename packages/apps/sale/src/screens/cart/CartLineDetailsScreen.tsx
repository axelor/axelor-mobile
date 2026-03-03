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

import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {QuantityCard, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchCartLineById} from '../../features/cartLineSlice';
import {
  CartLineActionCard,
  CartLinePriceDetails,
  CartLineValidationButton,
  ProductSearchBar,
} from '../../components';

const productScanKey = 'product_sale_cart-line-details';

const CartLineDetailsScreen = ({route}) => {
  const cartLineId = route.params?.cartLineId;

  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.CartLine',
  });

  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  const [product, setProduct] = useState(null);
  const [newQty, setNewQty] = useState(cartLineId ? cartLine?.qty : 0);

  const _cartLine = useMemo(() => {
    if (cartLineId) {
      return cartLine;
    } else {
      const unit = product?.salesUnit ?? product?.unit;
      return {
        product: product,
        unit,
      };
    }
  }, [cartLine, cartLineId, product]);

  const refreshLine = useCallback(() => {
    dispatch((fetchCartLineById as any)({cartLineId}));
  }, [cartLineId, dispatch]);

  useEffect(() => {
    cartLineId && refreshLine();
  }, [cartLineId, refreshLine]);

  useEffect(() => {
    cartLineId && setNewQty(cartLine?.qty);
  }, [cartLine?.qty, cartLineId]);

  return (
    <Screen
      fixedItems={
        <CartLineValidationButton
          isCreation={cartLineId == null}
          newQty={newQty}
          productId={product?.id}
        />
      }>
      <ScrollView
        style={styles.container}
        refresh={{fetcher: refreshLine, loading: false}}>
        {cartLineId ? (
          <CartLineActionCard
            cartLine={cartLine}
            hideIncrement={true}
            hideDelete={true}
            hideBadgeInformation={true}
            style={styles.card}
          />
        ) : (
          <ProductSearchBar
            scanKey={productScanKey}
            defaultValue={product}
            onChange={setProduct}
            isScrollViewContainer
          />
        )}
        {(cartLineId || product) && (
          <>
            <QuantityCard
              labelQty={I18n.t('Sale_Quantity')}
              defaultValue={newQty}
              onValueChange={setNewQty}
              editable={!readonly}
              isBigButton
              translator={I18n.t}
              style={styles.card}
            />
            <CartLinePriceDetails cartLine={_cartLine} qty={newQty} />
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 5,
  },
});

export default CartLineDetailsScreen;
