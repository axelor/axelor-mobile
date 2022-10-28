import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {HeaderContainer, PopUpOneButton, Screen} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {StockMoveHeader} from '../../components';
import {searchProducts} from '../../features/productSlice';
import {displayItemName} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

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
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            lineRef={customerDeliveryLine?.name}
            date={
              customerDelivery.statusSelect === StockMove.status.Draft
                ? customerDelivery.createdOn
                : customerDelivery.statusSelect === StockMove.status.Planned
                ? customerDelivery.estimatedDate
                : customerDelivery.realDate
            }
            availability={customerDelivery.availableStatusSelect}
          />
        }
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  stockView: {
    marginTop: '2%',
  },
});

export default CustomerDeliverySelectProductScreen;
