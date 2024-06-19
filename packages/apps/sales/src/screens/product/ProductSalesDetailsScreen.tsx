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
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {useDispatch} from '@axelor/aos-mobile-core';
import {fetchProductById} from '../../features/productSlice';
import {ProductDescription, ProductHeader} from '../../components';

const ProductSalesDetailsScreen = ({route}) => {
  const productId = route.params.productId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((fetchProductById as any)({productId: productId}));
  }, [dispatch, productId]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProductHeader />}
      />
      <ProductDescription />
    </Screen>
  );
};

export default ProductSalesDetailsScreen;
