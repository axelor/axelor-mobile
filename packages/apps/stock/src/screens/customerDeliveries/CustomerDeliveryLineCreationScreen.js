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
import {
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Screen,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  AvailableProductsSearchBar,
  CustomerDeliveryLineCreationButton,
  CustomerDeliveryLineQuantityCard,
  ProductCardInfo,
  StockMoveHeader,
} from '../../components';
import StockMove from '../../types/stock-move';
import {fetchProductWithId} from '../../features/productSlice';

const itemScanKey = 'product-tracking-number_customer-delivery-line-creation';

const CREATION_STEP = {
  product_trackingNumber: 1,
  validation: 3,
};

const CustomerDeliveryLineCreationScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const dispatch = useDispatch();

  const {productFromId: product} = useSelector(state => state.product);

  const [locationLine, setLocationLine] = useState(null);
  const [realQty, setRealQty] = useState(0);
  const [currentStep, setCurrentStep] = useState(
    CREATION_STEP.product_trackingNumber,
  );

  const handleStockLocationLineSelection = item => {
    if (item != null) {
      const _product = item?.product;

      dispatch(fetchProductWithId(_product?.id));
      setLocationLine(item);
      setCurrentStep(CREATION_STEP.validation);
    } else {
      setLocationLine(null);
      setRealQty(0);
      setCurrentStep(CREATION_STEP.product_trackingNumber);
    }
  };

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryLineCreationButton
          customerDelivery={customerDelivery}
          product={product}
          trackingNumber={locationLine?.trackingNumber}
          realQty={realQty}
          visible={currentStep >= CREATION_STEP.validation}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            date={StockMove.getStockMoveDate(
              customerDelivery.statusSelect,
              customerDelivery,
            )}
            availability={customerDelivery.availableStatusSelect}
          />
        }
      />
      <KeyboardAvoidingScrollView style={styles.scroll}>
        <View style={styles.stockView}>
          <AvailableProductsSearchBar
            defaultValue={locationLine}
            stockLocationId={customerDelivery.fromStockLocation?.id}
            scanKey={itemScanKey}
            onChange={handleStockLocationLineSelection}
            isFocus={true}
            changeScreenAfter={true}
          />
          {currentStep >= CREATION_STEP.validation ? (
            <>
              <ProductCardInfo
                onPress={handleShowProduct}
                picture={product?.picture}
                code={product?.code}
                name={product?.name}
                trackingNumber={locationLine?.trackingNumber?.trackingNumberSeq}
              />
              <CustomerDeliveryLineQuantityCard
                customerDelivery={customerDelivery}
                customerDeliveryLine={null}
                realQty={realQty}
                setRealQty={setRealQty}
              />
            </>
          ) : null}
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  stockView: {
    marginTop: '2%',
  },
  scroll: {
    height: null,
    flex: 1,
  },
});

export default CustomerDeliveryLineCreationScreen;
