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

import React, {useCallback, useState} from 'react';
import {
  useDispatch,
  useNavigation,
  usePermitted,
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
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.CartLine',
  });

  const {activeCart} = useSelector(state => state.sale_cart);
  const {mobileSettings} = useSelector(state => state.appConfig);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleAddProduct = useCallback(
    (productId: number) => {
      dispatch(
        (addCartLine as any)({
          cartId: activeCart?.id,
          cartVersion: activeCart?.version,
          productId,
          qty: 1,
        }),
      );
    },
    [activeCart, dispatch],
  );

  const handleShowProduct = useCallback(() => {
    navigation.navigate('ProductSaleDetailsScreen', {productId: product.id});
  }, [navigation, product.id]);

  const handlePress = useCallback(() => {
    if (
      mobileSettings?.isGenericProductShown &&
      product.productVariantConfig != null
    ) {
      setAlertVisible(true);
    } else {
      handleAddProduct(product.id);
    }
  }, [
    handleAddProduct,
    mobileSettings?.isGenericProductShown,
    product.id,
    product.productVariantConfig,
  ]);

  return (
    <>
      <ActionCard
        style={style}
        actionList={[
          {
            iconName: 'plus-lg',
            helper: I18n.t('Sale_AddOne'),
            onPress: handlePress,
            hidden: !canCreate,
          },
        ]}
        translator={I18n.t}>
        <CartLineCard product={product} onPress={handleShowProduct} />
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
