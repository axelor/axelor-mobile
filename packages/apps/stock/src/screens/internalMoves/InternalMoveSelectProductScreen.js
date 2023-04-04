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
import {HeaderContainer, PopUpOneButton, Screen} from '@axelor/aos-mobile-ui';
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
  const internalMove = route.params.internalMove;
  const internalMoveLine = route.params.internalMoveLine;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {productList} = useSelector(state => state.product);

  const [isVisible, setVisible] = useState(false);

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleNavigate = useCallback(
    product => {
      if (product != null) {
        if (product.id !== internalMoveLine?.product.id) {
          setVisible(true);
        } else {
          if (product.trackingNumberConfiguration == null) {
            navigation.navigate('InternalMoveLineDetailsScreen', {
              internalMove: internalMove,
              internalMoveLineId: internalMoveLine?.id,
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
    },
    [internalMove, internalMoveLine, navigation],
  );

  return (
    <Screen removeSpaceOnTop={internalMove != null ? true : false}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={StockMove.getStockMoveDate(
              internalMove.statusSelect,
              internalMove,
            )}
            availability={internalMove.availableStatusSelect}
          />
        }
      />
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
