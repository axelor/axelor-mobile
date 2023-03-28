/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React from 'react';
import {Button} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

const ProductVariantButton = ({product, navigation}) => {
  const I18n = useTranslator();

  const showProductVariables = () => {
    navigation.navigate('ProductListVariantScreen', {product: product});
  };

  if (product.productVariant != null) {
    return (
      <Button
        onPress={() => showProductVariables()}
        title={I18n.t('Stock_Variants')}
      />
    );
  }

  return null;
};

export default ProductVariantButton;
