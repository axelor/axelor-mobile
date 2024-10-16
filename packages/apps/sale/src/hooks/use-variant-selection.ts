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

export const useVariantSelection = (product, productVariantConfig) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);

  const variantConfig = useMemo(() => {
    return productVariantConfig || null;
  }, [productVariantConfig]);

  const handleVariantSelection = () => {
    setAlertVisible(true);
  };

  useEffect(() => {
    if (product?.variantProduct != null && productVariantConfig) {
      fetchProductByIdApi({productId: product?.variantProduct?.id})
        .then(res => {
          const variantData = res.data.data[0]?.productVariant;
          if (variantData) {
            const newSelectedVariants = {};
            for (let i = 1; i <= 5; i++) {
              newSelectedVariants[`productVariantValue${i}`] =
                variantData[`productVariantValue${i}`] ?? undefined;
            }
            setSelectedVariants(newSelectedVariants);
          }
        })
        .catch(() => setSelectedVariants({}));
    }
  }, [product?.variantProduct, productVariantConfig]);

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

    return Array.from({length: 5}, (_, index) => {
      const attrIndex = index + 1;
      const attribute = variantConfig[`productVariantAttr${attrIndex}`];
      const valueSet =
        productVariantConfig[`productVariantValue${attrIndex}Set`];
      return {
        attribute,
        values: filterAvailableValues(attribute, valueSet),
        defaultValue: selectedVariants[`productVariantValue${attrIndex}`],
      };
    });
  }, [variantConfig, productVariantConfig, selectedVariants]);

  return {
    selectedVariants,
    setSelectedVariants,
    alertVisible,
    setAlertVisible,
    handleVariantSelection,
    variantAttributes,
  };
};
