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

import {useEffect, useState, useMemo} from 'react';
import {fetchProductByIdApi} from '../api/';

export const useVariantSelection = (cartLine, productVariantConfig) => {
  const [selectedVariants, setSelectedVariants] = useState<{
    productVariantValue1?: any;
    productVariantValue2?: any;
    productVariantValue3?: any;
    productVariantValue4?: any;
    productVariantValue5?: any;
  }>({});

  const [alertVisible, setAlertVisible] = useState(false);

  const variantConfig = useMemo(() => {
    return productVariantConfig || null;
  }, [productVariantConfig]);

  const handleVariantSelection = () => {
    setAlertVisible(true);
  };

  useEffect(() => {
    if (cartLine?.variantProduct != null && productVariantConfig) {
      fetchProductByIdApi({productId: cartLine?.variantProduct?.id})
        .then(res => {
          const variantData = res.data.data[0]?.productVariant;
          if (variantData) {
            setSelectedVariants({
              productVariantValue1:
                variantData.productVariantValue1 ?? undefined,
              productVariantValue2:
                variantData.productVariantValue2 ?? undefined,
              productVariantValue3:
                variantData.productVariantValue3 ?? undefined,
              productVariantValue4:
                variantData.productVariantValue4 ?? undefined,
              productVariantValue5:
                variantData.productVariantValue5 ?? undefined,
            });
          }
        })
        .catch(() => setSelectedVariants({}));
    }
  }, [cartLine?.variantProduct, productVariantConfig]);

  const variantAttributes = useMemo(() => {
    if (!variantConfig || !productVariantConfig) {
      return [];
    }

    const filterAvailableValues = (attribute, valueSet) => {
      if (!attribute || !attribute.productVariantValueList || !valueSet) {
        return [];
      }
      return attribute.productVariantValueList.filter(value =>
        valueSet.some(av => av.id === value.id),
      );
    };

    return [
      {
        attribute: variantConfig.productVariantAttr1,
        values: filterAvailableValues(
          variantConfig.productVariantAttr1,
          productVariantConfig?.productVariantValue1Set,
        ),
        defaultValue: selectedVariants?.productVariantValue1,
      },
      {
        attribute: variantConfig.productVariantAttr2,
        values: filterAvailableValues(
          variantConfig.productVariantAttr2,
          productVariantConfig?.productVariantValue2Set,
        ),
        defaultValue: selectedVariants?.productVariantValue2,
      },
      {
        attribute: variantConfig.productVariantAttr3,
        values: filterAvailableValues(
          variantConfig.productVariantAttr3,
          productVariantConfig?.productVariantValue3Set,
        ),
        defaultValue: selectedVariants?.productVariantValue3,
      },
      {
        attribute: variantConfig.productVariantAttr4,
        values: filterAvailableValues(
          variantConfig.productVariantAttr4,
          productVariantConfig?.productVariantValue4Set,
        ),
        defaultValue: selectedVariants?.productVariantValue4,
      },
      {
        attribute: variantConfig.productVariantAttr5,
        values: filterAvailableValues(
          variantConfig.productVariantAttr5,
          productVariantConfig?.productVariantValue5Set,
        ),
        defaultValue: selectedVariants?.productVariantValue5,
      },
    ];
  }, [
    variantConfig,
    productVariantConfig,
    selectedVariants?.productVariantValue1,
    selectedVariants?.productVariantValue2,
    selectedVariants?.productVariantValue3,
    selectedVariants?.productVariantValue4,
    selectedVariants?.productVariantValue5,
  ]);

  return {
    selectedVariants,
    setSelectedVariants,
    alertVisible,
    setAlertVisible,
    handleVariantSelection,
    variantAttributes,
  };
};
