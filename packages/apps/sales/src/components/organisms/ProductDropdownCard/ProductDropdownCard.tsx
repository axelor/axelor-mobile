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

  const {sale: saleConfig} = useSelector((state: any) => state.appConfig);

  const items = useMemo(() => {
    const result = [
      {
        title: I18n.t('Sales_ProductTypology'),
        key: 0,
        childrenComp: <DropdownProductTypology />,
      },
      {
        title: I18n.t('Sales_Sale'),
        key: 1,
        childrenComp: <DropdownProductSale />,
      },
    ];

    if (saleConfig?.manageMultipleSaleQuantity) {
      result.push({
        title: I18n.t('Sales_MultipleQuantities'),
        key: 2,
        childrenComp: <DropdownMultipleQuantities />,
      });
    }

    return result;
  }, [I18n, saleConfig?.manageMultipleSaleQuantity]);

  return <DropdownCardSwitch dropdownItems={items} />;
};

export default ProductDropdownCard;
