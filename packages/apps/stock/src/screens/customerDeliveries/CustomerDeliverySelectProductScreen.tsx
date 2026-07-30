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
import {Alert, HeaderContainer, Screen, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {StockMove} from '../../types';
import {
  ProductCardInfo,
  ProductSearchBar,
  StockMoveHeader,
} from '../../components';

const productScanKey = 'product_customer-delivery-select';

const CustomerDeliverySelectProductScreen = ({navigation, route}: any) => {
  const {customerDelivery, customerDeliveryLine, product} = route?.params ?? {};
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

  const handleProductSelection = useCallback(
    (item: any) => {
      if (item == null) return;

      if (item.id !== customerDeliveryLine?.product?.id) {
        setVisible(true);
      } else if (item.trackingNumberConfiguration != null) {
        navigation.navigate('CustomerDeliverySelectTrackingScreen', {
          customerDeliveryLine: customerDeliveryLine,
          customerDelivery: customerDelivery,
          product: item,
        });
      } else {
        navigation.navigate('CustomerDeliveryLineDetailScreen', {
          customerDeliveryLineId: customerDeliveryLine?.id,
          customerDelivery: customerDelivery,
          productId: item?.id,
        });
      }
    },
    [customerDelivery, customerDeliveryLine, navigation],
  );

  return (
    <Screen>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            lineRef={customerDeliveryLine?.name}
            date={StockMove.getStockMoveDate(
              customerDelivery.statusSelect,
              customerDelivery,
            )}
            availability={customerDeliveryLine?.availableStatusSelect}
            stockMoveLineId={customerDeliveryLine?.id}
          />
        }
      />
      <ProductCardInfo
        product={product}
        trackingNumber={customerDeliveryLine?.trackingNumber}
        locker={customerDeliveryLine?.locker}
      />
      <ProductSearchBar
        scanKey={productScanKey}
        onChange={handleProductSelection}
        isFocus
        changeScreenAfter
      />
      <Alert
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        confirmButtonConfig={{
          width: 50,
          title: undefined,
          onPress: () => setVisible(false),
        }}>
        <Text>{I18n.t('Stock_ErrorProduct')}</Text>
      </Alert>
    </Screen>
  );
};

export default CustomerDeliverySelectProductScreen;
