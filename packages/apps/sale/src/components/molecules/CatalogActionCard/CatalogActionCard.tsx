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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {CartLineCard, VariantPopup} from '../../atoms';
import {fetchProductById} from '../../../features/productSlice';
import {fetchMatchingProduct} from '../../../api/product-api';
import {useVariantSelection} from '../../../hooks/use-variant-selection';

interface CatalogActionCardProps {
  style?: any;
  product?: any;
}

const CatalogActionCard = ({style, product}: CatalogActionCardProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {product: parentProduct} = useSelector(
    (state: any) => state.sale_product,
  );

  const {
    alertVisible,
    setAlertVisible,
    handleVariantSelection,
    variantAttributes,
    setSelectedVariants,
    selectedVariants,
  } = useVariantSelection(product, parentProduct);

  const handleConfirm = useCallback(() => {
    fetchMatchingProduct({
      selectedVariants,
    }).then(res => {
      if (res?.data?.data[0] != null) {
        console.log('res?.data?.data[0] ', res?.data?.data[0]);
      }
    });
    setAlertVisible(false);
  }, [selectedVariants, setAlertVisible]);

  return (
    <>
      <ActionCard
        style={style}
        actionList={[
          {
            iconName: 'plus-lg',
            helper: I18n.t('Sale_AddOne'),
            onPress: () => {},
          },
          {
            iconName: 'palette2',
            helper: I18n.t('Sale_SeeVariants'),
            onPress: () => {
              dispatch(
                (fetchProductById as any)({
                  productId: product.id,
                }),
              );
              handleVariantSelection();
            },
            hidden: product?.productVariantConfig == null,
          },
        ]}
        translator={I18n.t}>
        <CartLineCard product={product} />
      </ActionCard>

      <VariantPopup
        alertVisible={alertVisible}
        handleConfirm={handleConfirm}
        setAlertVisible={setAlertVisible}
        setSelectedVariants={setSelectedVariants}
        variantAttributes={variantAttributes}
      />
    </>
  );
};

export default CatalogActionCard;
