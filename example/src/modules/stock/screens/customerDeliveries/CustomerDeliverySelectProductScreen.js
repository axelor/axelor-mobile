import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PopUpOneButton, Screen} from '@aos-mobile/ui';
import {ScannerAutocompleteSearch, useTranslator} from '@aos-mobile/core';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {searchProducts} from '@/modules/stock/features/productSlice';
import StockMove from '@/modules/stock/types/stock-move';
import {StockMoveHeader} from '../../components/organisms';

const productScanKey = 'product_customer-delivery-select';

const CustomerDeliverySelectProductScreen = ({route, navigation}) => {
  const customerDelivery = route.params.customerDelivery;
  const customerDeliveryLine = route.params.customerDeliveryLine;
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

  const handleProductSelection = item => {
    if (item != null) {
      if (
        customerDeliveryLine != null &&
        item.id !== customerDeliveryLine?.product.id
      ) {
        setVisible(true);
      } else if (item.trackingNumberConfiguration != null) {
        navigation.navigate('CustomerDeliverySelectTrackingScreen', {
          customerDeliveryLine: customerDeliveryLine,
          customerDelivery: customerDelivery,
          product: item,
        });
      } else {
        navigation.navigate('CustomerDeliveryLineDetailScreen', {
          customerDeliveryLine: customerDeliveryLine,
          customerDelivery: customerDelivery,
          product: item,
        });
      }
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <StockMoveHeader
          reference={customerDelivery.stockMoveSeq}
          status={customerDelivery.statusSelect}
          date={
            customerDelivery.statusSelect === StockMove.status.Draft
              ? customerDelivery.createdOn
              : customerDelivery.statusSelect === StockMove.status.Planned
              ? customerDelivery.estimatedDate
              : customerDelivery.realDate
          }
          availability={customerDelivery.availableStatusSelect}
        />
        <LocationsMoveCard
          fromStockLocation={customerDelivery.fromStockLocation?.name}
          toStockLocation={customerDelivery?.toAddress.fullName}
        />
        <View style={styles.stockView}>
          <ScannerAutocompleteSearch
            objectList={productList}
            onChangeValue={item => handleProductSelection(item)}
            fetchData={fetchProductsAPI}
            displayValue={displayItemName}
            scanKeySearch={productScanKey}
            placeholder={I18n.t('Stock_Product')}
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
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
  },
  stockView: {
    marginTop: '5%',
    marginBottom: '50%',
  },
});

export default CustomerDeliverySelectProductScreen;
