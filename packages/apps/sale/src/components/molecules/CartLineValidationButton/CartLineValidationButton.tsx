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

import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  addCartLine,
  deleteCartLine,
  updateCartLine,
} from '../../../features/cartLineSlice';

interface CartLineValidationButton {
  isCreation: boolean;
  newQty: number;
  productId?: number;
}

const CartLineValidationButton = ({
  isCreation,
  newQty,
  productId,
}: CartLineValidationButton) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {canCreate, canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.CartLine',
  });

  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  const _deleteCartLine = useCallback(() => {
    dispatch(
      (deleteCartLine as any)({
        cartLineId: cartLine?.id,
        cartId: activeCart?.id,
      }),
    );
    navigation.pop();
  }, [activeCart?.id, cartLine?.id, dispatch, navigation]);

  const _updateCartLine = useCallback(() => {
    dispatch(
      (updateCartLine as any)({
        cartLine,
        qty: newQty,
        cartId: activeCart?.id,
      }),
    );
    navigation.pop();
  }, [activeCart?.id, cartLine, dispatch, navigation, newQty]);

  const _addCartLine = useCallback(() => {
    dispatch(
      (addCartLine as any)({
        cartId: activeCart?.id,
        cartVersion: activeCart?.version,
        productId,
        qty: newQty,
      }),
    );
    navigation.pop();
  }, [
    activeCart?.id,
    activeCart?.version,
    dispatch,
    navigation,
    newQty,
    productId,
  ]);

  const displayDeleteBtn = useMemo(
    () => !isCreation && canDelete,
    [canDelete, isCreation],
  );

  const displaySaveBtn = useMemo(
    () => (isCreation && canCreate) || !readonly,
    [canCreate, isCreation, readonly],
  );

  return (
    <View style={styles.buttonContainer}>
      {displayDeleteBtn && (
        <Button
          title={I18n.t('Sale_Delete')}
          onPress={_deleteCartLine}
          width={displaySaveBtn ? '45%' : '90%'}
          color={Colors.errorColor}
          iconName="trash3-fill"
        />
      )}
      {displaySaveBtn && (
        <Button
          title={I18n.t('Base_Validate')}
          onPress={isCreation ? _addCartLine : _updateCartLine}
          width={displayDeleteBtn ? '45%' : '90%'}
          iconName="check-lg"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default CartLineValidationButton;
