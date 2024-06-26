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

import React, {useEffect, useState} from 'react';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchProductById} from '../../features/productSlice';
import {
  CompanySearchBar,
  ProductDescription,
  ProductFloatingButton,
  ProductHeader,
} from '../../components';

const ProductSalesDetailsScreen = ({route}) => {
  const productId = route.params.productId;

  const dispatch = useDispatch();

  const [company, setCompany] = useState({});

  const {user} = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch((fetchProductById as any)({productId: productId}));
  }, [dispatch, productId]);

  useEffect(() => {
    setCompany(user?.activeCompany);
  }, [user?.activeCompany]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProductHeader />}
      />
      <CompanySearchBar company={company} setCompany={setCompany} />
      <ProductDescription />
      <ProductFloatingButton />
    </Screen>
  );
};

export default ProductSalesDetailsScreen;
