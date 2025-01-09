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
import {HeaderContainer, PopUpOneButton, Screen} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ProductSearchBar, StockMoveHeader} from '../../components';
import StockMove from '../../types/stock-move';

const productScanKey = 'product_internal-move-select';

const InternalMoveSelectProductScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const internalMoveLine = route.params.internalMoveLine;
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

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
      <ProductSearchBar
        scanKey={productScanKey}
        onChange={handleNavigate}
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
