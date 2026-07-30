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

import React, {useState, useCallback} from 'react';
import {Alert, HeaderContainer, Screen, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {StockMove} from '../../types';
import {
  ProductCardInfo,
  StockMoveHeader,
  TrackingNumberSearchBar,
} from '../../components';

const trackingScanKey = 'tracking_customer-delivery-select';

const CustomerDeliverySelectTrackingScreen = ({navigation, route}: any) => {
  const {customerDelivery, customerDeliveryLine, product} = route?.params ?? {};
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

  const handleTrackingNumberSelection = useCallback(
    (item: any) => {
      if (item != null) {
        if (
          customerDeliveryLine != null &&
          item.id !== customerDeliveryLine.trackingNumber?.id
        ) {
          setVisible(true);
        } else {
          navigation.navigate('CustomerDeliveryLineDetailScreen', {
            customerDeliveryLineId: customerDeliveryLine?.id,
            customerDelivery: customerDelivery,
            productId: product?.id,
            trackingNumber: item,
          });
        }
      }
    },
    [customerDelivery, customerDeliveryLine, product, navigation],
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
      <TrackingNumberSearchBar
        scanKey={trackingScanKey}
        onChange={handleTrackingNumberSelection}
        isFocus
        changeScreenAfter
        product={product}
      />
      <Alert
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        confirmButtonConfig={{
          width: 50,
          title: undefined,
          onPress: () => setVisible(false),
        }}>
        <Text>{I18n.t('Stock_ErrorTrackingNumber')}</Text>
      </Alert>
    </Screen>
  );
};

export default CustomerDeliverySelectTrackingScreen;
