/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {View} from 'react-native';
import {
  ClearableCard,
  HeaderContainer,
  PopUpOneButton,
  Screen,
} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {StockMoveHeader} from '../../components';
import {searchProducts} from '../../features/productSlice';
import StockMove from '../../types/stock-move';

const productScanKey = 'product_internal-move-select';

const InternalMoveSelectProductScreen = ({navigation, route}) => {
  const {internalMove, internalMoveLine, fromStockLocation, toStockLocation} =
    route.params;

  const {productList} = useSelector(state => state.product);
  const [isVisible, setVisible] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveSelectFromLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveSelectToLocationScreen', {
      fromStockLocation: fromStockLocation,
    });
  };

  const handleNavigate = useCallback(
    product => {
      if (product != null) {
        if (internalMove == null) {
          if (product.trackingNumberConfiguration == null) {
            navigation.navigate('InternalMoveLineDetailsScreen', {
              fromStockLocation: fromStockLocation,
              toStockLocation: toStockLocation,
              productId: product?.id,
            });
          } else {
            navigation.navigate('InternalMoveSelectTrackingScreen', {
              fromStockLocation: fromStockLocation,
              toStockLocation: toStockLocation,
              product: product,
            });
          }
        } else {
          if (product.id !== internalMoveLine?.product.id) {
            setVisible(true);
          } else {
            if (product.trackingNumberConfiguration == null) {
              navigation.navigate('InternalMoveLineDetailsScreen', {
                internalMove: internalMove,
                internalMoveLineId: internalMoveLine?.id,
                productId: product?.id,
              });
            } else {
              navigation.navigate('InternalMoveSelectTrackingScreen', {
                internalMove: internalMove,
                internalMoveLine: internalMoveLine,
                product: product,
              });
            }
          }
        }
      }
    },
    [
      internalMove,
      internalMoveLine,
      navigation,
      fromStockLocation,
      toStockLocation,
    ],
  );

  return (
    <Screen removeSpaceOnTop={internalMove != null ? true : false}>
      {internalMove != null ? (
        <HeaderContainer
          expandableFilter={false}
          fixedItems={
            internalMove != null ? (
              <StockMoveHeader
                reference={internalMove.stockMoveSeq}
                status={internalMove.statusSelect}
                date={
                  internalMove
                    ? StockMove.getStockMoveDate(
                        internalMove.statusSelect,
                        internalMove,
                      )
                    : null
                }
                availability={internalMove.availableStatusSelect}
              />
            ) : null
          }
        />
      ) : (
        <View>
          <ClearableCard
            valueTxt={route.params.fromStockLocation.name}
            onClearPress={handleClearOriginalLocation}
          />
          <ClearableCard
            valueTxt={route.params.toStockLocation.name}
            onClearPress={handleClearDestinationLocation}
          />
        </View>
      )}
      <ScannerAutocompleteSearch
        objectList={productList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder={I18n.t('Stock_Product')}
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorProduct')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

export default InternalMoveSelectProductScreen;
