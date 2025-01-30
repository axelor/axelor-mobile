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

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {HeaderContainer, PopUpOneButton, Screen} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ProductSearchBar, StockMoveHeader} from '../../components';
import StockMove from '../../types/stock-move';

const productScanKey = 'product_customer-delivery-select';

const CustomerDeliverySelectProductScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const customerDeliveryLine = route.params.customerDeliveryLine;
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

  const handleProductSelection = item => {
    if (item != null) {
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
    }
  };

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
      <View style={styles.stockView}>
        <ProductSearchBar
          scanKey={productScanKey}
          onChange={handleProductSelection}
          isFocus={true}
          changeScreenAfter={true}
        />
      </View>
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

const styles = StyleSheet.create({
  stockView: {
    marginTop: '2%',
  },
});

export default CustomerDeliverySelectProductScreen;
