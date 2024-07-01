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

import React, {useCallback} from 'react';
import {View} from 'react-native';
import {
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {LabelText, checkNullString} from '@axelor/aos-mobile-ui';

const DropdownProductTypology = ({}) => {
  const I18n = useTranslator();
  const {SaleProduct: Product} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const {product} = useSelector((state: any) => state.sales_product);

  const renderLabelText = useCallback(
    (titleKey: string, value: string | number) => {
      if (!checkNullString(value)) {
        return <LabelText title={I18n.t(titleKey)} value={value} />;
      }

      return null;
    },
    [I18n],
  );

  return (
    <View>
      {renderLabelText(
        'Sales_Type',
        getItemTitle(Product?.productTypeSelect, product.productTypeSelect),
      )}
      {renderLabelText(
        'Sales_SubType',
        getItemTitle(
          Product?.productSubTypeSelect,
          product.productSubTypeSelect,
        ),
      )}
      {renderLabelText('Sales_ProductFamily', product.productFamily?.name)}
      {renderLabelText('Sales_CategoryFamily', product.productCategory?.name)}
      {renderLabelText(
        'Sales_ProcurementMethod',
        getItemTitle(
          Product?.procurementMethodSelect,
          product.procurementMethodSelect,
        ),
      )}
    </View>
  );
};

export default DropdownProductTypology;
