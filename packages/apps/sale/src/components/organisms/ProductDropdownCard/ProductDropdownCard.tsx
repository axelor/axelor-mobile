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

import React, {useMemo} from 'react';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DropdownMultipleQuantities,
  DropdownProductSale,
  DropdownProductTypology,
} from '../../molecules';

const ProductDropdownCard = ({}) => {
  const I18n = useTranslator();

  const {sale: saleConfig} = useSelector(state => state.appConfig);
  const {product} = useSelector(state => state.sale_product);

  const items = useMemo(() => {
    const result: {
      title: string;
      key: number;
      childrenComp: React.ReactNode;
      iconName?: string;
    }[] = [
      {
        key: 0,
        title: I18n.t('Sale_ProductTypology'),
        iconName: 'tags-fill',
        childrenComp: <DropdownProductTypology />,
      },
      {
        key: 1,
        title: I18n.t('Sale_Sale'),
        iconName: 'cart-fill',
        childrenComp: <DropdownProductSale />,
      },
    ];

    if (
      saleConfig?.manageMultipleSaleQuantity &&
      product.saleProductMultipleQtyList?.length > 0
    ) {
      result.push({
        key: 2,
        title: I18n.t('Sale_MultipleQuantities'),
        iconName: !product.allowToForceSaleQty ? 'lock-fill' : 'stack',
        childrenComp: <DropdownMultipleQuantities />,
      });
    }

    return result;
  }, [
    I18n,
    product.allowToForceSaleQty,
    product.saleProductMultipleQtyList?.length,
    saleConfig?.manageMultipleSaleQuantity,
  ]);

  return <DropdownCardSwitch dropdownItems={items} />;
};

export default ProductDropdownCard;
