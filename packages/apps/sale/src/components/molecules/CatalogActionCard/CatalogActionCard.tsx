/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useState} from 'react';
import {
  showToastMessage,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {CartLineCard, VariantPopup} from '../../atoms';
import {addCartLine} from '../../../features/cartLineSlice';

interface CatalogActionCardProps {
  style?: any;
  product?: any;
}

const CatalogActionCard = ({style, product}: CatalogActionCardProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {activeCart} = useSelector((state: any) => state.sale_cart);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleAddProduct = useCallback(
    (productId: number) => {
      if (activeCart == null) {
        showToastMessage({
          type: 'error',
          position: 'bottom',
          text1: I18n.t('Base_Error'),
          text2: I18n.t('Sale_NoCart'),
        });
      } else {
        dispatch(
          (addCartLine as any)({
            cartId: activeCart?.id,
            cartVersion: activeCart?.version,
            productId,
            qty: 1,
          }),
        );
      }
    },
    [I18n, activeCart, dispatch],
  );

  return (
    <>
      <ActionCard
        style={style}
        actionList={[
          {
            iconName: 'plus-lg',
            helper: I18n.t('Sale_AddOne'),
            onPress:
              product?.productVariantConfig == null
                ? () => handleAddProduct(product.id)
                : () => setAlertVisible(true),
          },
        ]}
        translator={I18n.t}>
        <CartLineCard product={product} />
      </ActionCard>
      <VariantPopup
        visible={alertVisible}
        handleClose={() => setAlertVisible(false)}
        parentProduct={product}
        handleConfirm={handleAddProduct}
      />
    </>
  );
};

export default CatalogActionCard;
