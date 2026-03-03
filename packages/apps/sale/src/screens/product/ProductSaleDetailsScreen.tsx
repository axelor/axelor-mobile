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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  HeaderContainer,
  Label,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {
  isEmpty,
  useContextRegister,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  fetchProductById,
  fetchProductCompanyConfig,
} from '../../features/productSlice';
import {
  CompanyPicker,
  ProductDescription,
  ProductDropdownCard,
  ProductFloatingButton,
  ProductHeader,
} from '../../components';

const ProductSaleDetailsScreen = ({route}) => {
  const productId = route.params.productId;
  useContextRegister({
    models: [{model: 'com.axelor.apps.base.db.Product', id: productId}],
  });
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector((state: any) => state.user);
  const {loadingProduct, product, productCompany} = useSelector(
    (state: any) => state.sale_product,
  );

  const [company, setCompany] = useState<any>(user?.activeCompany);

  const fetchProduct = useCallback(() => {
    dispatch((fetchProductById as any)({productId: productId}));
  }, [dispatch, productId]);

  const fetchProductCompany = useCallback(() => {
    dispatch(
      (fetchProductCompanyConfig as any)({
        companyId: company?.id,
        productId: productId,
      }),
    );
  }, [company?.id, dispatch, productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    fetchProductCompany();
  }, [fetchProductCompany]);

  const noCompanyConfig = useMemo(
    () => company != null && isEmpty(productCompany),
    [company, productCompany],
  );

  if (product?.id !== productId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProductHeader />}
      />
      <ScrollView
        refresh={{
          loading: loadingProduct,
          fetcher: () => {
            fetchProduct();
            fetchProductCompany();
          },
        }}>
        <Label
          style={styles.label}
          message={I18n.t('Sale_NoConfigPerCompany')}
          type="info"
          visible={noCompanyConfig}
        />
        <CompanyPicker
          style={!noCompanyConfig && styles.searchBar}
          company={company}
          setCompany={setCompany}
        />
        <ProductDescription />
        <ProductDropdownCard />
      </ScrollView>
      <ProductFloatingButton />
    </Screen>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '90%',
    alignSelf: 'center',
  },
  searchBar: {
    marginTop: 10,
  },
});

export default ProductSaleDetailsScreen;
