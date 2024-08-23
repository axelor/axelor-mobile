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
import {
  Button,
  DoubleIcon,
  Label,
  LabelText,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  headerActionsProvider,
  SearchListView,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchCart, searchCartLine, updateCart} from '../../features/cartSlice';
import {CartLineActionCard, CustomerSearchBar} from '../../components';
import {StyleSheet} from 'react-native';

const ActiveCartScreen = ({}) => {
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {loading, moreLoading, isListEnd, cartList, carLineList} = useSelector(
    (state: any) => state.sale_cart,
  );
  const {userId} = useSelector((state: any) => state.auth);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch((searchCart as any)({userId}));
  }, [dispatch, userId]);

  const activeCart = useMemo(() => {
    return cartList[0];
  }, [cartList]);

  useEffect(() => {
    setSelectedCustomer(activeCart?.partner);
  }, [activeCart?.partner]);

  useEffect(() => {
    if (activeCart) {
      headerActionsProvider.registerModel('sale_active_cart', {
        model: 'com.axelor.apps.sale.db.Cart',
        modelId: activeCart?.id,
        disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
        attachedFileScreenTitle: activeCart?.name,
        actions: [
          {
            customComponent: (
              <DoubleIcon
                topIconConfig={{
                  name: 'plus-lg',
                  color: Colors.primaryColor.background,
                  size: 13,
                }}
                bottomIconConfig={{
                  name: 'basket2-fill',
                  color: Colors.secondaryColor_dark.background,
                }}
                predefinedPosition={'bottom-right'}
                topIconPosition={{bottom: -7, right: -7}}
              />
            ),
            iconName: 'basket2-fill',
            key: 'setAside',
            order: 10,
            title: I18n.t('Sale_SetAside'),
            onPress: () => {},
          },
          {
            customComponent: (
              <DoubleIcon
                topIconConfig={{
                  name: 'trash3-fill',
                  color: Colors.errorColor.background,
                  size: 13,
                }}
                bottomIconConfig={{
                  name: 'basket2-fill',
                  color: Colors.secondaryColor_dark.background,
                }}
                predefinedPosition={'bottom-right'}
                topIconPosition={{bottom: -7, right: -7}}
              />
            ),
            iconName: 'basket2-fill',
            key: 'emptyCart',
            order: 20,
            title: I18n.t('Sale_EmptyCart'),
            onPress: () => {},
          },
        ],
      });
    }
  }, [
    Colors.errorColor.background,
    Colors.primaryColor.background,
    Colors.secondaryColor_dark.background,
    I18n,
    activeCart,
    mobileSettings,
  ]);

  const handleChangeCustomer = useCallback(
    newCustomer => {
      setSelectedCustomer(newCustomer);
      if (newCustomer != null) {
        dispatch(
          (updateCart as any)({partnerId: newCustomer?.id, cart: activeCart}),
        );
      }
    },
    [activeCart, dispatch],
  );

  const sliceFunctionData = useMemo(
    () => ({cartId: activeCart?.id}),
    [activeCart?.id],
  );

  if (activeCart == null) {
    return <Label type="info" message={I18n.t('Sale_NoCartAvailable')} />;
  }

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <Button
          iconName="check-lg"
          title={I18n.t('Sale_ValidateCart')}
          onPress={() => {}}
        />
      }>
      <SearchListView
        actionList={[
          {
            iconName: 'plus-lg',
            title: I18n.t('Sale_AddProduct'),
            onPress: () => {},
          },
        ]}
        isHideableSearch={true}
        list={carLineList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchCartLine}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        topFixedItems={
          <>
            <LabelText
              style={styles.container}
              iconName="building"
              size={16}
              title={activeCart?.company?.name}
            />
            <CustomerSearchBar
              onChange={handleChangeCustomer}
              defaultValue={selectedCustomer}
            />
          </>
        }
        expandableFilter={false}
        renderListItem={({item}) => (
          <CartLineActionCard cartLine={item} cartId={activeCart?.id} />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
  },
});

export default ActiveCartScreen;
