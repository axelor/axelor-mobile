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

import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Alert,
  Card,
  HeaderContainer,
  Screen,
  Text,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {StockMoveHeader, TrackingNumberSearchBar} from '../../components';
import StockMove from '../../types/stock-move';

const trackingScanKey = 'tracking_customer-delivery-select';

const CustomerDeliverySelectTrackingScreen = ({route, navigation}) => {
  const {customerDelivery, customerDeliveryLine, product} = route.params;
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

  const handleTrackingNumberSelection = useCallback(
    item => {
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
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            lineRef={customerDeliveryLine?.name}
            date={
              customerDelivery
                ? StockMove.getStockMoveDate(
                    customerDelivery.statusSelect,
                    customerDelivery,
                  )
                : null
            }
            availability={customerDeliveryLine?.availableStatusSelect}
            stockMoveLineId={customerDeliveryLine?.id}
          />
        }
      />
      <View style={styles.container}>
        <Card style={styles.cardProductInfo}>
          <Text>{product.name}</Text>
        </Card>
        <TrackingNumberSearchBar
          scanKey={trackingScanKey}
          onChange={handleTrackingNumberSelection}
          isFocus={true}
          changeScreenAfter={true}
          product={product}
        />
        <Alert
          visible={isVisible}
          title={I18n.t('Auth_Warning')}
          confirmButtonConfig={{
            width: 50,
            title: null,
            onPress: () => setVisible(false),
          }}>
          <Text>{I18n.t('Stock_ErrorTrackingNumber')}</Text>
        </Alert>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
  },
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
});

export default CustomerDeliverySelectTrackingScreen;
