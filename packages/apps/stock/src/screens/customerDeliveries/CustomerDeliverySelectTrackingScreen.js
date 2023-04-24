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

import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Card,
  HeaderContainer,
  PopUpOneButton,
  Screen,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {StockMoveHeader} from '../../components';
import {filterTrackingNumber} from '../../features/trackingNumberSlice';
import {displayItemTrackingNumber} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const trackingScanKey = 'tracking_customer-delivery-select';

const CustomerDeliverySelectTrackingScreen = ({route, navigation}) => {
  const {customerDelivery, customerDeliveryLine, product} = route.params;

  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const [isVisible, setVisible] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

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
            availability={customerDelivery.availableStatusSelect}
          />
        }
      />
      <View style={styles.container}>
        <Card style={styles.cardProductInfo}>
          <Text>{product.name}</Text>
        </Card>
        <ScannerAutocompleteSearch
          objectList={trackingNumberList}
          onChangeValue={item => handleTrackingNumberSelection(item)}
          fetchData={fetchTrackingAPI}
          displayValue={displayItemTrackingNumber}
          scanKeySearch={trackingScanKey}
          placeholder={I18n.t('Stock_TrackingNumber')}
          isFocus={true}
          changeScreenAfter={true}
        />
        <PopUpOneButton
          visible={isVisible}
          title={I18n.t('Auth_Warning')}
          data={I18n.t('Stock_ErrorTrackingNumber')}
          btnTitle={I18n.t('Auth_Close')}
          onPress={() => setVisible(false)}
        />
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
