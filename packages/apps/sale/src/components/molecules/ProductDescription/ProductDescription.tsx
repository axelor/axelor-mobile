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

import React from 'react';
import {View} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {NotesCard} from '@axelor/aos-mobile-ui';

const ProductDescription = ({}) => {
  const I18n = useTranslator();

  const {product} = useSelector((state: any) => state.sale_product);

  return (
    <View>
      <NotesCard
        title={I18n.t('Base_Description')}
        data={product.description}
      />
      <NotesCard
        title={I18n.t('Sale_InternalDescription')}
        data={product.internalDescription}
      />
    </View>
  );
};

export default ProductDescription;
