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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  DoubleIcon,
  Label,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  headerActionsProvider,
  SearchListView,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  CartHeader,
  CartLineActionCard,
  ValidateCartPopup,
} from '../../components';
import {
  emptyCart,
  fetchActiveCart,
  validateCart,
} from '../../features/cartSlice';
import {searchCartLine} from '../../features/cartLineSlice';

const ActiveCartScreen = ({}) => {
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {userId} = useSelector((state: any) => state.auth);
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {loading, moreLoading, isListEnd, carLineList} = useSelector(
    (state: any) => state.sale_cartLine,
  );

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch((fetchActiveCart as any)({userId}));
  }, [dispatch, userId]);

  const handleCartValidation = useCallback(
    (cart: any) => {
      if (cart?.partner != null) {
        dispatch(
          (validateCart as any)({id: cart.id, version: cart.version, userId}),
        );
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
    },
    [dispatch, userId],
  );

  const handleEmptyCart = useCallback(() => {
    dispatch(
      (emptyCart as any)({
        id: activeCart?.id,
        version: activeCart?.version,
        userId,
      }),
    );
  }, [activeCart?.id, activeCart?.version, dispatch, userId]);

  useEffect(() => {
    if (activeCart) {
      headerActionsProvider.registerModel('sale_active_cart', {
        model: 'com.axelor.apps.sale.db.Cart',
        modelId: activeCart?.id,
        disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
        actions: [
          {
            customComponent: (
              <DoubleIcon
                topIconConfig={{
                  name: 'trash3-fill',
                  color: Colors.errorColor.background,
                  size: 13,
                }}
                bottomIconConfig={{name: 'basket2-fill'}}
                topIconPosition={{bottom: -7, right: -7}}
              />
            ),
            iconName: null,
            key: 'activeCart_emptyCart',
            order: 20,
            title: I18n.t('Sale_EmptyCart'),
            onPress: handleEmptyCart,
          },
        ],
      });
    }
  }, [Colors, I18n, activeCart, handleEmptyCart, mobileSettings]);

  const sliceFunctionData = useMemo(
    () => ({cartId: activeCart?.id}),
    [activeCart],
  );

  if (activeCart == null) {
    return (
      <Label
        style={styles.label}
        type="info"
        message={I18n.t('Sale_NoCartAvailable')}
      />
    );
  }

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <Button
          iconName="check-lg"
          title={I18n.t('Sale_CreateSaleOrder')}
          onPress={() => handleCartValidation(activeCart)}
        />
      }>
      <SearchListView
        actionList={[
          {
            iconName: 'plus-lg',
            title: I18n.t('Sale_AddProduct'),
            onPress: () => navigation.navigate('CartLineDetailsScreen'),
          },
        ]}
        list={carLineList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchCartLine}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        topFixedItems={<CartHeader />}
        expandableFilter={false}
        renderListItem={({item}) => (
          <CartLineActionCard cartLine={item} cartId={activeCart?.id} />
        )}
      />
      <ValidateCartPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        handleValidate={handleCartValidation}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default ActiveCartScreen;
