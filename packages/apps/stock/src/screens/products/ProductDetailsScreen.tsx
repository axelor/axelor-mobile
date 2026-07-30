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

import React, {useCallback, useEffect} from 'react';
import {Screen, ScrollView, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ProductCharacteristics,
  ProductVariantButton,
  ProductPackingInformations,
  ProductUnitInformations,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {StyleSheet} from 'react-native';

const ProductDetailsScreen = ({route}: any) => {
  const productId = route.params.product?.id;
  useContextRegister({
    models: [{model: 'com.axelor.apps.base.db.Product', id: productId}],
  });
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingProductFromId, productFromId: product} = useSelector(
    state => state.product,
  );

  const fetchProductFromId = useCallback(() => {
    dispatch(fetchProductWithId(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    fetchProductFromId();
  }, [fetchProductFromId]);

  return (
    <Screen fixedItems={<ProductVariantButton product={product} />}>
      <ScrollView
        refresh={{loading: loadingProductFromId, fetcher: fetchProductFromId}}>
        <ProductCharacteristics {...product} />
        <ProductUnitInformations product={product} />
        <ProductPackingInformations product={product} />
        <NotesCard
          title={I18n.t('Base_Description')}
          data={product.description}
          styleText={styles.text}
        />
      </ScrollView>
    </Screen>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginLeft: 0,
  },
});

export default ProductDetailsScreen;
