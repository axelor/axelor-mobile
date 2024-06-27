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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {HeaderContainer, Label, Screen} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  fetchProductById,
  fetchProductCompanyConfigById,
} from '../../features/productSlice';
import {
  CompanySearchBar,
  ProductDescription,
  ProductDropdownCard,
  ProductFloatingButton,
  ProductHeader,
} from '../../components';

const ProductSalesDetailsScreen = ({route}) => {
  const productId = route.params.productId;

  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [company, setCompany] = useState({} as any);

  const {user} = useSelector((state: any) => state.user);
  const {product} = useSelector((state: any) => state.sales_product);

  useEffect(() => {
    dispatch((fetchProductById as any)({productId: productId}));
  }, [dispatch, productId]);

  useEffect(() => {
    if (company?.id != null) {
      dispatch(
        (fetchProductCompanyConfigById as any)({
          companyId: company.id,
          productId: product?.id,
        }),
      );
    }
  }, [company?.id, dispatch, product?.id]);

  const isProductCompanyConfig = useMemo(() => {
    if (!product?.productCompanyList || !company?.id) {
      return false;
    }

    return product.productCompanyList.some(prodCompany => {
      return prodCompany?.company?.id === company?.id;
    });
  }, [product?.productCompanyList, company?.id]);

  useEffect(() => {
    setCompany(user?.activeCompany);
  }, [user?.activeCompany]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ProductHeader isProductCompanyConfig={isProductCompanyConfig} />
        }
      />
      {!isProductCompanyConfig && (
        <Label
          message={I18n.t('Sales_NoConfigPerCompany')}
          style={styles.label}
          type="info"
        />
      )}
      <CompanySearchBar
        company={company}
        setCompany={setCompany}
        style={isProductCompanyConfig && styles.searchBar}
      />
      <ProductDescription />
      <ProductDropdownCard isProductCompanyConfig={isProductCompanyConfig} />
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

export default ProductSalesDetailsScreen;
